/* eslint-disable no-undef */
import Hapi from "@hapi/hapi";
import { nanoid } from "nanoid";

const datasets = [
  {
    id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    created_at: "1696375695",
    updated_on: "1696377695",
  },
];

const dataset_title = [
  {
    id: nanoid(),
    title: "Dataset 1",
    created_at: "1696375695",
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    type: "MainTitle",
  },
];

const dataset_description = [
  {
    id: nanoid(),
    created_at: "1696375695",
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    description: "Dataset 1",
    type: "Abstract",
  },
];

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
    path: "/api/study/{studyid}/dataset",
    handler: (request, h) => {
      //ignore studyid for now
      const response = datasets.map((dataset) => {
        return {
          id: dataset.id,
          created_at: dataset.created_at,
          updated_on: dataset.updated_on,
        };
      });

      for (const dataset of response) {
        dataset.title = dataset_title.find(
          (title) => title.dataset_id === dataset.id && title.type === "MainTitle"
        ).title;

        dataset.description = dataset_description.find(
          (description) => description.dataset_id === dataset.id && description.type === "Abstract"
        ).description;
      }

      return h.response(response).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset",
    handler: (request, h) => {
      console.log(request.payload);
      const { title, description } = request.payload;

      console.log(title, description, request.payload, request.payload.title);

      const dataset_id = nanoid();

      datasets.push({
        id: dataset_id,
        created_at: Date.now() / 1000,
        updated_on: Date.now() / 1000,
      });

      dataset_title.push({
        id: nanoid(),
        title,
        created_at: Date.now() / 1000,
        dataset_id,
        type: "MainTitle",
      });

      dataset_description.push({
        id: nanoid(),
        created_at: Date.now() / 1000,
        dataset_id,
        description,
        type: "Abstract",
      });

      return h.response({ id: dataset_id }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const dataset = datasets.find((dataset) => dataset.id === datasetid);

      if (!dataset) {
        return h.response({ message: "Dataset not found" }).code(404);
      }

      const title = dataset_title.find(
        (title) => title.dataset_id === datasetid && title.type === "MainTitle"
      ).title;

      const description = dataset_description.find(
        (description) => description.dataset_id === datasetid && description.type === "Abstract"
      ).description;

      return h.response({ ...dataset, title, description }).code(200);
    },
    method: "GET",
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
