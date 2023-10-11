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

const dataset_creator = [
  {
    id: nanoid(),
    name: "Samuel L. Jackson",
    affiliations: [
      {
        name: "University of Manchester",
        identifier: "0156zyn36",
        scheme: "ROR",
        scheme_uri: "https://ror.org/",
      },
    ],
    created_at: "1696375695",
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    name_identifier: "0000-0001-5109-3700",
    name_identifier_scheme: "ORCID",
    name_identifier_scheme_uri: "https://orcid.org/",
    name_type: "Personal",
  },
];

const dataset_contributor = [
  {
    id: nanoid(),
    name: "Samuel L. Jackson",
    affiliations: [
      {
        name: "University of Manchester",
        identifier: "0156zyn36",
        scheme: "ROR",
        scheme_uri: "https://ror.org/",
      },
    ],
    contributor_type: "ContactPerson",
    created_at: "1696375695",
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    name_identifier: "0000-0001-5109-3700",
    name_identifier_scheme: "ORCID",
    name_identifier_scheme_uri: "https://orcid.org/",
    name_type: "Personal",
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

        const d = dataset_description.find((description) => description.dataset_id === dataset.id);

        if (d && d.type === "Abstract") {
          dataset.description = d.description;
        } else {
          dataset.description = "";
        }
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

      const d = dataset_description.find((description) => description.dataset_id === datasetid);

      let description = "";

      if (d && d.type === "Abstract") {
        description = d.description;
      }

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

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/description",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const descriptions = dataset_description.filter(
        (description) => description.dataset_id === datasetid
      );

      if (!descriptions) {
        return h.response({ message: "Dataset not found" }).code(404);
      }

      return h.response(descriptions).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/description",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const description = dataset_description.find((description) => item.id === description.id);

          if (!description) {
            return h.response({ message: "description not found" }).code(404);
          }

          description.description = item.description;
          description.type = item.type;
        } else {
          dataset_description.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            description: item.description,
            type: item.type,
          });
        }
      }

      return h.response({ message: "descriptions updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/description/{descriptionid}",
    handler: (request, h) => {
      const { descriptionid } = request.params;

      const description = dataset_description.find(
        (description) => description.id === descriptionid
      );

      if (!description) {
        return h.response({ message: "description not found" }).code(404);
      }

      // remove alternative identifier
      dataset_description.splice(dataset_description.indexOf(description), 1);

      return h.response(description).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/creator",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const creators = dataset_creator.filter((creator) => creator.dataset_id === datasetid);

      return h.response(creators).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/creator",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const creator = dataset_creator.find((creator) => item.id === creator.id);

          if (!creator) {
            return h.response({ message: "creator not found" }).code(404);
          }

          creator.name = item.name;
          creator.name_type = item.name_type;
          creator.name_identifier = item.name_identifier;
          creator.name_identifier_scheme = item.name_identifier_scheme;
          creator.name_identifier_scheme_uri = item.name_identifier_scheme_uri;
          creator.affiliations = item.affiliations;
        } else {
          dataset_creator.push({
            id: nanoid(),
            name: item.name,
            affiliations: item.affiliations,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            name_identifier: item.name_identifier,
            name_identifier_scheme: item.name_identifier_scheme,
            name_identifier_scheme_uri: item.name_identifier_scheme_uri,
            name_type: item.name_type,
          });
        }
      }

      return h.response({ message: "creators updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/creator/{creatorid}",
    handler: (request, h) => {
      const { creatorid } = request.params;

      const creator = dataset_creator.find((creator) => creator.id === creatorid);

      if (!creator) {
        return h.response({ message: "creator not found" }).code(404);
      }

      // remove alternative identifier
      dataset_creator.splice(dataset_creator.indexOf(creator), 1);

      return h.response(creator).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/contributor",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const contributors = dataset_contributor.filter(
        (contributor) => contributor.dataset_id === datasetid
      );

      return h.response(contributors).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/contributor",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const contributor = dataset_contributor.find((contributor) => item.id === contributor.id);

          if (!contributor) {
            return h.response({ message: "contributor not found" }).code(404);
          }

          contributor.name = item.name;
          contributor.name_type = item.name_type;
          contributor.contributor_type = item.contributor_type;
          contributor.name_identifier = item.name_identifier;
          contributor.name_identifier_scheme = item.name_identifier_scheme;
          contributor.name_identifier_scheme_uri = item.name_identifier_scheme_uri;
          contributor.affiliations = item.affiliations;
        } else {
          dataset_contributor.push({
            id: nanoid(),
            name: item.name,
            affiliations: item.affiliations,
            contributor_type: item.contributor_type,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            name_identifier: item.name_identifier,
            name_identifier_scheme: item.name_identifier_scheme,
            name_identifier_scheme_uri: item.name_identifier_scheme_uri,
            name_type: item.name_type,
          });
        }
      }

      return h.response({ message: "contributors updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/contributor/{contributorid}",
    handler: (request, h) => {
      const { contributorid } = request.params;

      const contributor = dataset_contributor.find(
        (contributor) => contributor.id === contributorid
      );

      if (!contributor) {
        return h.response({ message: "contributor not found" }).code(404);
      }

      // remove alternative identifier
      dataset_contributor.splice(dataset_contributor.indexOf(contributor), 1);

      return h.response(contributor).code(200);
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
