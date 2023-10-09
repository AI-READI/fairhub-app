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

const dataset_alternative_identifier = [
  {
    id: nanoid(),
    created_at: "1696375695",
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    identifier: "10.1038/s41597-023-02463-x",
    type: "doi",
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
      const { title, description } = request.payload;

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

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/alternative-identifier",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const alternative_identifiers = dataset_alternative_identifier.filter(
        (identifier) => identifier.dataset_id === datasetid
      );

      if (!alternative_identifiers) {
        return h.response({ message: "Dataset not found" }).code(404);
      }

      return h.response(alternative_identifiers).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/alternative-identifier",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const alternative_identifier = dataset_alternative_identifier.find(
            (identifier) => item.id === identifier.id
          );

          if (!alternative_identifier) {
            return h.response({ message: "Alternative identifier not found" }).code(404);
          }

          alternative_identifier.identifier = item.identifier;
          alternative_identifier.type = item.type;
        } else {
          dataset_alternative_identifier.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            identifier: item.identifier,
            type: item.type,
          });
        }
      }

      return h.response({ message: "Alternative identifiers updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/alternative-identifier/{identifierid}",
    handler: (request, h) => {
      const { datasetid, identifierid } = request.params;

      const alternative_identifier = dataset_alternative_identifier.find(
        (identifier) => identifier.id === identifierid
      );

      if (!alternative_identifier) {
        return h.response({ message: "Alternative identifier not found" }).code(404);
      }

      // remove alternative identifier
      dataset_alternative_identifier.splice(
        dataset_alternative_identifier.indexOf(alternative_identifier),
        1
      );

      return h.response(alternative_identifier).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/title",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const titles = dataset_title.filter((title) => title.dataset_id === datasetid);

      if (!titles) {
        return h.response({ message: "Dataset not found" }).code(404);
      }

      return h.response(titles).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/title",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const title = dataset_title.find((title) => item.id === title.id);

          if (!title) {
            return h.response({ message: "title not found" }).code(404);
          }

          title.title = item.title;
          title.type = item.type;
        } else {
          dataset_title.push({
            id: nanoid(),
            title: item.title,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            type: item.type,
          });
        }
      }

      return h.response({ message: "titles updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/title/{titleid}",
    handler: (request, h) => {
      const { titleid } = request.params;

      const title = dataset_title.find((title) => title.id === titleid);

      if (!title) {
        return h.response({ message: "title not found" }).code(404);
      }

      // remove alternative identifier
      dataset_title.splice(dataset_title.indexOf(title), 1);

      return h.response(title).code(200);
    },
    method: "DELETE",
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
