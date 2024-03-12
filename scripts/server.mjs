/* eslint-disable no-undef */
import Hapi from "@hapi/hapi";
import { nanoid } from "nanoid";

const versions = [
  {
    id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    title: "Version 1",
    changelog: "# Changelog",
    created_at: 1697762742,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    doi: "10.1038/s41597-023-02463-x",
    published: true,
    published_on: 1697762742,
    updated_on: 1697762742,
  },
  {
    id: "42dec85c-22f2-4f4e-a5ad-f0121067f508",
    title: "Version 2",
    changelog: "# Changelog",
    created_at: 1697562742,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    doi: "",
    published: false,
    published_on: 0,
    updated_on: 1697362742,
  },
];

const version_readme = [
  {
    id: nanoid(),
    created_at: 1697762742,
    readme: "# Readme",
    version_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
  },
  {
    id: nanoid(),
    created_at: 1697762742,
    readme: "# Readme",
    version_id: "42dec85c-22f2-4f4e-a5ad-f0121067f508",
  },
];

const dataset_related_identifier = [
  {
    id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    created_at: 1697762742,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    identifier: "10.1038/s41597-023-02463-x",
    identifier_type: "DOI",
    related_metadata_scheme: "DataCite",
    relation_type: "IsCitedBy",
    resource_type: "Dataset",
    scheme_type: "DOI",
    scheme_uri: "https://doi.org",
  },
];

const generateMarkdown = async () => {
  const response = await fetch("https://jaspervdj.be/lorem-markdownum/markdown.txt");

  const text = await response.text();

  return text;
};

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
    path: "/api/study/{studyid}/dataset/{datasetid}/version",
    handler: (request, h) => {
      // const { datasetid } = request.params;

      const v = versions;

      return h.response(v).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/new",
    handler: (request, h) => {
      const { datasetid } = request.params;
      const { title } = request.payload;

      versions.push({
        id: nanoid(),
        title,
        changelog: "",
        created_at: Date.now() / 1000,
        dataset_id: datasetid,
        doi: "",
        published: false,
        published_on: 0,
        updated_on: Date.now() / 1000,
      });

      return h.response(newVersion).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/{versionid}/changelog",
    handler: async (request, h) => {
      const { versionid } = request.params;

      const version = versions.find((version) => version.id === versionid);

      if (!version) {
        return h.response({ message: "version not found" }).code(404);
      }

      const changelog = await generateMarkdown();

      return h.response({ changelog }).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/{versionid}/changelog",
    handler: (request, h) => {
      const { versionid } = request.params;

      const version = versions.find((version) => version.id === versionid);

      if (!version) {
        return h.response({ message: "version not found" }).code(404);
      }

      const payload = JSON.parse(request.payload);

      version.changelog = payload.changelog;

      return h.response({ message: "changelog updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/{versionid}/readme",
    handler: (request, h) => {
      const { versionid } = request.params;

      const version = versions.find((version) => version.id === versionid);

      if (!version) {
        return h.response({ message: "version not found" }).code(404);
      }

      const readme = version_readme.find((readme) => readme.version_id === versionid);

      if (!readme) {
        return h.response({ message: "readme not found" }).code(404);
      }

      return h.response({ readme: readme.readme }).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/{versionid}/readme",
    handler: (request, h) => {
      const { versionid } = request.params;

      const version = versions.find((version) => version.id === versionid);

      if (!version) {
        return h.response({ message: "version not found" }).code(404);
      }

      const readme = version_readme.find((readme) => readme.version_id === versionid);

      if (!readme) {
        return h.response({ message: "readme not found" }).code(404);
      }

      const payload = JSON.parse(request.payload);

      readme.readme = payload.readme;

      return h.response({ message: "readme updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/version/{versionid}/autogenerate-readme",
    handler: async (request, h) => {
      // some logic here to generate a readme

      const text = await generateMarkdown();

      return h.response({ readme: text }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/metadata/related-identifier",
    handler: (request, h) => {
      const datasetid = "b5536454-f81b-455a-8c8a-6d56e9733c19";

      const relatedIdentifiers = dataset_related_identifier.filter(
        (ri) => ri.dataset_id === datasetid
      );

      return h.response(relatedIdentifiers).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/metadata/related-identifier",
    handler: (request, h) => {
      const payload = JSON.parse(request.payload);

      console.log(payload);

      for (const ri of payload) {
        if (ri.id) {
          const relatedIdentifier = dataset_related_identifier.find((r) => r.id === ri.id);

          if (!relatedIdentifier) {
            return h.response({ message: "related identifier not found" }).code(404);
          }

          relatedIdentifier.identifier = ri.identifier;
          relatedIdentifier.identifier_type = ri.identifier_type;
          relatedIdentifier.related_metadata_scheme = ri.related_metadata_scheme;
          relatedIdentifier.relation_type = ri.relation_type;
          relatedIdentifier.resource_type = ri.resource_type;
          relatedIdentifier.scheme_type = ri.scheme_type;
          relatedIdentifier.scheme_uri = ri.scheme_uri;
        } else {
          dataset_related_identifier.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
            identifier: ri.identifier,
            identifier_type: ri.identifier_type,
            related_metadata_scheme: ri.related_metadata_scheme,
            relation_type: ri.relation_type,
            resource_type: ri.resource_type,
            scheme_type: ri.scheme_type,
            scheme_uri: ri.scheme_uri,
          });
        }
      }
      return h.response({ message: "related identifier updated" }).code(200);
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
