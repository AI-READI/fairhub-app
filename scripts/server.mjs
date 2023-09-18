/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";
import Hapi from "@hapi/hapi";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const token_blacklist = {};
const users = {
  "test@fairhub.io": {
    id: "1",
    username: "test",
    emailAddress: "test@fairhub.io",
    first_name: "Test",
    last_name: "User",
    password: "asdkj45@ksdSA",
  },
};

const SECRET = "DONT_TELL_ANYONE";

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

      // TODO: hash password
      if (users[emailAddress].password !== password) {
        return h
          .response({
            error: "invalid password",
          })
          .code(400);
      }

      const jti = nanoid();

      const accessToken = jwt.sign({}, SECRET, {
        audience: "https://example.com",
        expiresIn: "1h",
        issuer: "https://example.com",
        subject: users[emailAddress].id,
      });

      const refreshToken = jwt.sign({}, SECRET, {
        audience: "https://example.com",
        expiresIn: "3d",
        issuer: "https://example.com",
        jwtid: jti,
        subject: users[emailAddress].id,
      });

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);

      return h
        .response({
          accessToken,
          refreshToken,
          user: {
            id: users[emailAddress].id,
            username: users[emailAddress].username,
            email_address: emailAddress,
            first_name: users[emailAddress].first_name,
            last_name: users[emailAddress].last_name,
          },
        })
        .code(200);
    },
    method: "POST",
  });

  server.route({
    path: "auth/validate",
    handler: async (request, h) => {
      const authorization = request.headers.authorization;

      if (!authorization) {
        return h
          .response({
            error: "no authorization header",
          })
          .code(400);
      }

      const token = authorization.split(" ")[1];

      // verify token
      try {
        // get the jti and expired claims from the token
        const decoded = await jwt.verify(token, SECRET);

        console.log(decoded);

        if (token_blacklist[decoded.jti]) {
          return h
            .response({
              error: "token has been blacklisted",
            })
            .code(400);
        }

        return h
          .response({
            message: "token is valid",
          })
          .code(200);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return h
            .response({
              error: "token expired",
            })
            .code(403);
        }

        if (err.name === "JsonWebTokenError") {
          return h
            .response({
              error: "invalid token",
            })
            .code(403);
        }

        return h
          .response({
            error: "invalid token",
          })
          .code(403);
      }
    },
    method: "POST",
  });

  server.route({
    path: "auth/refresh",
    handler: async (request, h) => {
      const authorization = request.headers.authorization;

      if (!authorization) {
        return h
          .response({
            error: "no authorization header",
          })
          .code(400);
      }

      const token = authorization.split(" ")[1];

      // verify token
      try {
        // get the jti and expired claims from the token
        const decoded = await jwt.verify(token, SECRET);

        console.log(decoded);

        if (token_blacklist[decoded.jti]) {
          return h
            .response({
              error: "token has been blacklisted",
            })
            .code(401);
        }

        const old_jti = decoded.jti;

        // blacklist token jti
        token_blacklist[old_jti] = {
          expires: decoded.exp,
          user_id: decoded.subject,
        };

        const jti = nanoid();

        const emailAddress = users.find((user) => user.id === decoded.subject).emailAddress;

        const accessToken = jwt.sign({}, SECRET, {
          audience: "https://example.com",
          expiresIn: "1h",
          issuer: "https://example.com",
          subject: users[emailAddress].id,
        });

        const refreshToken = jwt.sign({}, SECRET, {
          audience: "https://example.com",
          expiresIn: "3d",
          issuer: "https://example.com",
          jwtid: jti,
          subject: users[emailAddress].id,
        });

        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        return h
          .response({
            accessToken,
            refreshToken,
            user: {
              id: users[emailAddress].id,
              username: users[emailAddress].username,
              email_address: emailAddress,
              first_name: users[emailAddress].first_name,
              last_name: users[emailAddress].last_name,
            },
          })
          .code(200);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return h
            .response({
              error: "token expired",
            })
            .code(401);
        }

        console.log(err);

        return h
          .response({
            error: "invalid token",
          })
          .code(401);
      }
    },
    method: "POST",
  });

  server.route({
    path: "/auth/logout",
    handler: async (request, h) => {
      // get authorization header
      const authorization = request.headers.authorization;

      if (!authorization) {
        return h
          .response({
            error: "no authorization header",
          })
          .code(400);
      }

      const token = authorization.split(" ")[1];

      // verify token
      try {
        // get the jti and expired claims from the token
        const decoded = await jwt.verify(token, SECRET);

        console.log(decoded);

        token_blacklist[decoded.jti] = {
          expires: decoded.exp,
          user_id: decoded.sub,
        };

        console.log(token_blacklist);

        return h
          .response({
            message: "logout successful",
          })
          .code(200);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return h
            .response({
              error: "token expired",
            })
            .code(200);
        }

        if (err.name === "JsonWebTokenError") {
          return h
            .response({
              error: "invalid token",
            })
            .code(403);
        }

        return h
          .response({
            error: "invalid token",
          })
          .code(403);
      }
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
