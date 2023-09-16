/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";
import Hapi from "@hapi/hapi";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const token_blacklist = {};
const users = {};

const secret = "secret";

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3001,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route({
    path: "/",
    handler: (_request, _h) => {
      return "Hello World!";
    },
    method: "GET",
  });

  server.route({
    path: "/hello/{name}",
    handler: (request, _h) => {
      return `Hello ${encodeURIComponent(request.params.name)}!`;
    },
    method: "GET",
  });

  server.route({
    path: "/auth/sign-up",
    handler: (request, h) => {
      const { emailAddress, password } = request.payload;

      if (users[emailAddress]) {
        return h
          .response({
            error: "user already exists",
          })
          .code(400);
      }

      // TODO: hash password
      users[emailAddress] = {
        id: nanoid(),
        username: faker.internet.userName(),
        emailAddress,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password,
      };

      console.log(users);

      return h
        .response({
          message: "User created",
        })
        .code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/auth/login",
    handler: (request, h) => {
      const { emailAddress, password } = request.payload;

      console.log(users);
      console.log(emailAddress, password);

      if (!users[emailAddress]) {
        return h
          .response({
            error: "user does not exist",
          })
          .code(400);
      }

      if (users[emailAddress].password !== password) {
        return h
          .response({
            error: "invalid password",
          })
          .code(400);
      }

      const jti = nanoid();

      const accessToken = jwt.sign(
        {
          context: {
            id: users[emailAddress].id,
            username: users[emailAddress].username,
            email_address: emailAddress,
            first_name: users[emailAddress].first_name,
            last_name: users[emailAddress].last_name,
          },
        },
        secret,
        {
          audience: "https://example.com",
          expiresIn: "1h",
          issuer: "https://example.com",
          jwtid: jti,
          subject: emailAddress,
        }
      );

      const refreshToken = jwt.sign(
        {
          id: users[emailAddress].id,
        },
        secret,
        {
          audience: "https://example.com",
          expiresIn: "3d",
          issuer: "https://example.com",
          jwtid: jti,
          subject: emailAddress,
        }
      );

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);

      return h
        .response({
          accessToken,
          refreshToken,
          user_id: users[emailAddress].id,
        })
        .code(200);
    },
    method: "POST",
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
