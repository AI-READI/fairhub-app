/* eslint-disable no-undef */
import Hapi from "@hapi/hapi";
import { nanoid } from "nanoid";

const datasets = [
  {
    id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    created_at: 1183135260000,
    updated_on: 1183135260000,
  },
];

const dataset_title = [
  {
    id: nanoid(),
    title: "Dataset 1",
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    type: "MainTitle",
  },
];

const dataset_description = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    description: "Dataset 1",
    type: "Abstract",
  },
];

const dataset_alternative_identifier = [
  {
    id: nanoid(),
    created_at: 1183135260000,
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
    created_at: 1183135260000,
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
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    name_identifier: "0000-0001-5109-3700",
    name_identifier_scheme: "ORCID",
    name_identifier_scheme_uri: "https://orcid.org/",
    name_type: "Personal",
  },
];

const dataset_date = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    date: 1696921200000,
    information: "The date the data was collected",
    type: "Collected",
  },
];

const dataset_record_keys = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    details: "Details of the record keys",
    type: "NotKnown",
  },
];

const dataset_de_ident_level = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    dates: true,
    details: "Details of the de-identification level",
    direct: true,
    hipaa: true,
    k_anon: true,
    nonarr: true,
    type: "NotKnown",
  },
];

const dataset_consent = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    details: "Details of the de-identification level",
    genetic_only: true,
    geog_restrict: true,
    no_methods: true,
    noncommercial: true,
    research_type: true,
    type: "NotKnown",
  },
];

const dataset_subject = [
  {
    id: nanoid(),
    classification_code: "D000001",
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    scheme: "MeSH",
    scheme_uri: "https://www.nlm.nih.gov/mesh/",
    subject: "Subject 1",
    value_uri: "https://www.nlm.nih.gov/mesh/d000001",
  },
];

const dataset_access = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    description: "Description of the access type",
    type: "PublicOnScreenAccess",
    url: "https://www.example.com",
    url_last_checked: 1183135260000,
  },
];

const dataset_rights = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    identifier: "cc-by-4.0",
    identifier_scheme: "SPDX",
    rights: "CMU License",
    uri: "https://creativecommons.org/licenses/by/4.0/",
  },
];

const dataset_funder = [
  {
    id: nanoid(),
    name: "Funder 1",
    award_number: "123456",
    award_title: "Award title",
    award_uri: "https://www.example.com",
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    identifier: "123456",
    identifier_scheme_uri: "https://www.example.com",
    identifier_type: "ROR",
  },
];

const dataset_other = [
  {
    id: nanoid(),
    acknowledgement: "Lorem ipsum",
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    language: "en",
    managing_organization_name: "Boston Dynamics",
    managing_organization_ror_id: "123456",
    publisher: "Boston Dynamics",
    resource_type: "Resource type",
    size: ["15 pages", "1.2 MB"],
    standards_followed: "Lorem ipsum",
  },
];

const dataset_related_item = [
  {
    id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    created_at: 1183135260000,
    dataset_id: "b5536454-f81b-455a-8c8a-6d56e9733c19",
    relation_type: "IsCitedBy",
    type: "JournalArticle",
  },
];

const dataset_related_item_identifier = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    identifier: "10.1038/s41597-023-02463-x",
    metadata_scheme: "dc",
    related_item_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    scheme_type: "dcterms",
    scheme_uri: "https://www.dublincore.org/specifications/dublin-core/dces/",
    type: "doi",
  },
];

const dataset_related_item_creator = [
  {
    id: nanoid(),
    name: "Ethan Hawke",
    created_at: 1183135260000,
    name_type: "Personal",
    related_item_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
  },
];

const dataset_related_item_contributor = [
  {
    id: nanoid(),
    name: "Samuel L. Jackson",
    contributor_type: "ContactPerson",
    created_at: 1183135260000,
    name_type: "Personal",
    related_item_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
  },
];

const dataset_related_item_title = [
  {
    id: nanoid(),
    title: "Title",
    created_at: 1183135260000,
    related_item_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    type: "MainTitle",
  },
];

const dataset_related_item_other = [
  {
    id: nanoid(),
    created_at: 1183135260000,
    edition: "Edition",
    first_page: "1",
    issue: "1",
    last_page: "15",
    number_type: "Article",
    number_value: "1",
    publication_year: 2021,
    publisher: "Publisher",
    related_item_id: "42dec85c-22f2-4f4e-a5ad-f0121067f507",
    volume: "1",
  },
];

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

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/date",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const dates = dataset_date.filter((date) => date.dataset_id === datasetid);

      return h.response(dates).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/date",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const date = dataset_date.find((date) => item.id === date.id);

          if (!date) {
            return h.response({ message: "date not found" }).code(404);
          }

          date.date = item.date;
          date.type = item.type;
          date.information = item.information;
        } else {
          dataset_date.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            date: item.date,
            information: item.information,
            type: item.type,
          });
        }
      }

      return h.response({ message: "dates updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/date/{dateid}",
    handler: (request, h) => {
      const { dateid } = request.params;

      const date = dataset_date.find((date) => date.id === dateid);

      if (!date) {
        return h.response({ message: "date not found" }).code(404);
      }

      // remove alternative identifier
      dataset_date.splice(dataset_date.indexOf(date), 1);

      return h.response(date).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/record-keys",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // return the record key for the dataset
      const record_key = dataset_record_keys.find(
        (record_key) => record_key.dataset_id === datasetid
      );

      return h.response(record_key).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/record-keys",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      const record_key = dataset_record_keys.find(
        (record_key) => record_key.dataset_id === datasetid
      );

      if (record_key) {
        record_key.details = payload.details;
        record_key.type = payload.type;
      } else {
        dataset_record_keys.push({
          id: nanoid(),
          created_at: Date.now() / 1000,
          dataset_id: datasetid,
          details: payload.details,
          type: payload.type,
        });
      }

      return h.response({ message: "record keys updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/de-identification-level",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // return the record key for the dataset
      const de_ident_level = dataset_de_ident_level.find(
        (de_ident_level) => de_ident_level.dataset_id === datasetid
      );

      return h.response(de_ident_level).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/de-identification-level",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      const de_ident_level = dataset_de_ident_level.find(
        (de_ident_level) => de_ident_level.dataset_id === datasetid
      );

      if (de_ident_level) {
        de_ident_level.details = payload.details;
        de_ident_level.type = payload.type;
        de_ident_level.dates = payload.dates;
        de_ident_level.direct = payload.direct;
        de_ident_level.hipaa = payload.hipaa;
        de_ident_level.k_anon = payload.k_anon;
        de_ident_level.nonarr = payload.nonarr;
      } else {
        dataset_de_ident_level.push({
          id: nanoid(),
          created_at: Date.now() / 1000,
          dataset_id: datasetid,
          dates: payload.dates,
          details: payload.details,
          direct: payload.direct,
          hipaa: payload.hipaa,
          k_anon: payload.k_anon,
          nonarr: payload.nonarr,
          type: payload.type,
        });
      }

      return h.response({ message: "de-identification level updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/consent",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // return the record key for the dataset
      const consent = dataset_consent.find((consent) => consent.dataset_id === datasetid);

      return h.response(consent).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/consent",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      const consent = dataset_consent.find((consent) => consent.dataset_id === datasetid);

      if (consent) {
        consent.details = payload.details;
        consent.type = payload.type;
        consent.genetic_only = payload.genetic_only;
        consent.geog_restrict = payload.geog_restrict;
        consent.no_methods = payload.no_methods;
        consent.noncommercial = payload.noncommercial;
        consent.research_type = payload.research_type;
      } else {
        dataset_consent.push({
          id: nanoid(),
          created_at: Date.now() / 1000,
          dataset_id: datasetid,
          details: payload.details,
          genetic_only: payload.genetic_only,
          geog_restrict: payload.geog_restrict,
          no_methods: payload.no_methods,
          noncommercial: payload.noncommercial,
          research_type: payload.research_type,
          type: payload.type,
        });
      }

      return h.response({ message: "consent updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/subject",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const subjects = dataset_subject.filter((subject) => subject.dataset_id === datasetid);

      return h.response(subjects).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/subject",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const subject = dataset_subject.find((subject) => item.id === subject.id);

          if (!subject) {
            return h.response({ message: "subject not found" }).code(404);
          }

          subject.subject = item.subject;
          subject.classification_code = item.classification_code;
          subject.scheme = item.scheme;
          subject.scheme_uri = item.scheme_uri;
          subject.value_uri = item.value_uri;
        } else {
          dataset_subject.push({
            id: nanoid(),
            classification_code: item.classification_code,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            scheme: item.scheme,
            scheme_uri: item.scheme_uri,
            subject: item.subject,
            value_uri: item.value_uri,
          });
        }
      }

      return h.response({ message: "subjects updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/subject/{subjectid}",
    handler: (request, h) => {
      const { subjectid } = request.params;

      const subject = dataset_subject.find((subject) => subject.id === subjectid);

      if (!subject) {
        return h.response({ message: "subject not found" }).code(404);
      }

      // remove alternative identifier
      dataset_subject.splice(dataset_subject.indexOf(subject), 1);

      return h.response(subject).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/access",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const access = dataset_access.find((access) => access.dataset_id === datasetid);

      return h.response(access).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/access",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      const access = dataset_access.find((access) => access.dataset_id === datasetid);

      if (access) {
        access.description = payload.description;
        access.type = payload.type;
        access.url = payload.url;
        access.url_last_checked = payload.url_last_checked;
      } else {
        dataset_access.push({
          id: nanoid(),
          created_at: Date.now() / 1000,
          dataset_id: datasetid,
          description: payload.description,
          type: payload.type,
          url: payload.url,
          url_last_checked: payload.url_last_checked,
        });
      }

      return h.response({ message: "access updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/rights",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const rights = dataset_rights.filter((right) => right.dataset_id === datasetid);

      return h.response(rights).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/rights",
    handler: (request, h) => {
      const { datasetid } = request.params;

      // const requestPayload = request.payload;
      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const right = dataset_rights.find((right) => item.id === right.id);

          if (!right) {
            return h.response({ message: "right not found" }).code(404);
          }

          right.identifier = item.identifier;
          right.identifier_scheme = item.identifier_scheme;
          right.rights = item.rights;
          right.uri = item.uri;
        } else {
          dataset_rights.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            identifier: item.identifier,
            identifier_scheme: item.identifier_scheme,
            rights: item.rights,
            uri: item.uri,
          });
        }
      }

      return h.response({ message: "rights updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/rights/{rightid}",
    handler: (request, h) => {
      const { rightid } = request.params;

      const right = dataset_rights.find((right) => right.id === rightid);

      if (!right) {
        return h.response({ message: "right not found" }).code(404);
      }

      // remove alternative identifier
      dataset_rights.splice(dataset_rights.indexOf(right), 1);

      return h.response(right).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/funder",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const funders = dataset_funder.filter((funder) => funder.dataset_id === datasetid);

      return h.response(funders).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/funder",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const funder = dataset_funder.find((funder) => item.id === funder.id);

          if (!funder) {
            return h.response({ message: "funder not found" }).code(404);
          }

          funder.name = item.name;
          funder.award_number = item.award_number;
          funder.award_title = item.award_title;
          funder.award_uri = item.award_uri;
          funder.identifier = item.identifier;
          funder.identifier_scheme = item.identifier_scheme;
          funder.identifier_scheme_uri = item.identifier_scheme_uri;
          funder.identifier_type = item.identifier_type;
        } else {
          dataset_funder.push({
            id: nanoid(),
            name: item.name,
            award_number: item.award_number,
            award_title: item.award_title,
            award_uri: item.award_uri,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            identifier: item.identifier,
            identifier_scheme: item.identifier_scheme,
            identifier_scheme_uri: item.identifier_scheme_uri,
            identifier_type: item.identifier_type,
          });
        }
      }

      return h.response({ message: "funders updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/funder/{funderid}",
    handler: (request, h) => {
      const { funderid } = request.params;

      const funder = dataset_funder.find((funder) => funder.id === funderid);

      if (!funder) {
        return h.response({ message: "funder not found" }).code(404);
      }

      // remove alternative identifier
      dataset_funder.splice(dataset_funder.indexOf(funder), 1);

      return h.response(funder).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/publisher",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const otherMetadata = dataset_other.find((other) => other.dataset_id === datasetid);

      if (!otherMetadata) {
        return h.response({ message: "other metadata not found" }).code(404);
      }

      const publisher = otherMetadata.publisher;
      const managing_organization_name = otherMetadata.managing_organization_name;
      const managing_organization_ror_id = otherMetadata.managing_organization_ror_id;

      return h
        .response({
          managing_organization_name,
          managing_organization_ror_id,
          publisher,
        })
        .code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/publisher",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const otherMetadata = dataset_other.find((other) => other.dataset_id === datasetid);

      if (!otherMetadata) {
        return h.response({ message: "other metadata not found" }).code(404);
      }

      const payload = JSON.parse(request.payload);

      otherMetadata.publisher = payload.publisher;

      return h.response({ message: "publisher updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/other",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const otherMetadata = dataset_other.find((other) => other.dataset_id === datasetid);

      if (!otherMetadata) {
        return h.response({ message: "other metadata not found" }).code(404);
      }

      const language = otherMetadata.language;
      const resource_type = otherMetadata.resource_type;
      const size = otherMetadata.size;

      return h
        .response({
          language,
          resource_type,
          size,
        })
        .code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/other",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const otherMetadata = dataset_other.find((other) => other.dataset_id === datasetid);

      if (!otherMetadata) {
        return h.response({ message: "other metadata not found" }).code(404);
      }

      const payload = JSON.parse(request.payload);

      otherMetadata.language = payload.language;
      otherMetadata.resource_type = payload.resource_type;
      otherMetadata.size = payload.size;

      return h.response({ message: "other metadata updated" }).code(200);
    },
    method: "PUT",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const relatedItems = dataset_related_item.filter(
        (relatedItem) => relatedItem.dataset_id === datasetid
      );

      for (const relatedItem of relatedItems) {
        const relatedItemIdentifiers = dataset_related_item_identifier.filter(
          (relatedItemIdentifier) => relatedItemIdentifier.related_item_id === relatedItem.id
        );

        relatedItem.identifiers = relatedItemIdentifiers;

        const relatedItemCreators = dataset_related_item_creator.filter(
          (relatedItemCreator) => relatedItemCreator.related_item_id === relatedItem.id
        );

        relatedItem.creators = relatedItemCreators;

        const relatedItemContributors = dataset_related_item_contributor.filter(
          (relatedItemContributor) => relatedItemContributor.related_item_id === relatedItem.id
        );

        relatedItem.contributors = relatedItemContributors;

        const relatedItemTitles = dataset_related_item_title.filter(
          (relatedItemTitle) => relatedItemTitle.related_item_id === relatedItem.id
        );

        relatedItem.titles = relatedItemTitles;

        const relatedItemOther = dataset_related_item_other.find(
          (relatedItemOther) => relatedItemOther.related_item_id === relatedItem.id
        );

        relatedItem.publication_year = relatedItemOther.publication_year;
        relatedItem.volume = relatedItemOther.volume;
        relatedItem.issue = relatedItemOther.issue;
        relatedItem.number_value = relatedItemOther.number_value;
        relatedItem.number_type = relatedItemOther.number_type;
        relatedItem.first_page = relatedItemOther.first_page;
        relatedItem.last_page = relatedItemOther.last_page;
        relatedItem.publisher = relatedItemOther.publisher;
        relatedItem.edition = relatedItemOther.edition;
      }

      return h.response(relatedItems).code(200);
    },
    method: "GET",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item",
    handler: (request, h) => {
      const { datasetid } = request.params;

      const payload = JSON.parse(request.payload);

      for (const item of payload) {
        if ("id" in item) {
          const relatedItem = dataset_related_item.find(
            (relatedItem) => item.id === relatedItem.id
          );

          if (!relatedItem) {
            return h.response({ message: "related item not found" }).code(404);
          }

          relatedItem.type = item.type;
          relatedItem.relation_type = item.relation_type;
        } else {
          const id = nanoid();

          item.id = id;

          dataset_related_item.push({
            id,
            created_at: Date.now() / 1000,
            dataset_id: datasetid,
            relation_type: item.relation_type,
            type: item.type,
          });
        }

        const relatedItemIdentifiers = item.identifiers;

        for (const identifier of relatedItemIdentifiers) {
          if ("id" in identifier) {
            const relatedItemIdentifier = dataset_related_item_identifier.find(
              (relatedItemIdentifier) => identifier.id === relatedItemIdentifier.id
            );

            if (!relatedItemIdentifier) {
              return h.response({ message: "related item identifier not found" }).code(404);
            }

            relatedItemIdentifier.identifier = identifier.identifier;
            relatedItemIdentifier.identifier_type = identifier.identifier_type;
            relatedItemIdentifier.identifier_value = identifier.identifier_value;
          } else {
            dataset_related_item_identifier.push({
              id: nanoid(),
              created_at: Date.now() / 1000,
              identifier: identifier.identifier,
              identifier_type: identifier.identifier_type,
              identifier_value: identifier.identifier_value,
              related_item_id: item.id,
            });
          }
        }

        const relatedItemCreators = item.creators;

        for (const creator of relatedItemCreators) {
          if ("id" in creator) {
            const relatedItemCreator = dataset_related_item_creator.find(
              (relatedItemCreator) => creator.id === relatedItemCreator.id
            );

            if (!relatedItemCreator) {
              return h.response({ message: "related item creator not found" }).code(404);
            }

            relatedItemCreator.name = creator.name;
            relatedItemCreator.name_type = creator.name_type;
            relatedItemCreator.name_identifier = creator.name_identifier;
            relatedItemCreator.name_identifier_scheme = creator.name_identifier_scheme;
            relatedItemCreator.name_identifier_scheme_uri = creator.name_identifier_scheme_uri;
            relatedItemCreator.affiliations = creator.affiliations;
          } else {
            dataset_related_item_creator.push({
              id: nanoid(),
              name: creator.name,
              affiliations: creator.affiliations,
              created_at: Date.now() / 1000,
              name_identifier: creator.name_identifier,
              name_identifier_scheme: creator.name_identifier_scheme,
              name_identifier_scheme_uri: creator.name_identifier_scheme_uri,
              name_type: creator.name_type,
              related_item_id: item.id,
            });
          }
        }

        const relatedItemContributors = item.contributors;

        for (const contributor of relatedItemContributors) {
          if ("id" in contributor) {
            const relatedItemContributor = dataset_related_item_contributor.find(
              (relatedItemContributor) => contributor.id === relatedItemContributor.id
            );

            if (!relatedItemContributor) {
              return h.response({ message: "related item contributor not found" }).code(404);
            }

            relatedItemContributor.name = contributor.name;
            relatedItemContributor.name_type = contributor.name_type;
            relatedItemContributor.contributor_type = contributor.contributor_type;
            relatedItemContributor.name_identifier = contributor.name_identifier;
            relatedItemContributor.name_identifier_scheme = contributor.name_identifier_scheme;
            relatedItemContributor.name_identifier_scheme_uri =
              contributor.name_identifier_scheme_uri;
            relatedItemContributor.affiliations = contributor.affiliations;
          } else {
            dataset_related_item_contributor.push({
              id: nanoid(),
              name: contributor.name,
              affiliations: contributor.affiliations,
              contributor_type: contributor.contributor_type,
              created_at: Date.now() / 1000,
              name_identifier: contributor.name_identifier,
              name_identifier_scheme: contributor.name_identifier_scheme,
              name_identifier_scheme_uri: contributor.name_identifier_scheme_uri,
              name_type: contributor.name_type,
              related_item_id: item.id,
            });
          }
        }

        const relatedItemTitles = item.titles;

        for (const title of relatedItemTitles) {
          if ("id" in title) {
            const relatedItemTitle = dataset_related_item_title.find(
              (relatedItemTitle) => title.id === relatedItemTitle.id
            );

            if (!relatedItemTitle) {
              return h.response({ message: "related item title not found" }).code(404);
            }

            relatedItemTitle.title = title.title;
            relatedItemTitle.title_type = title.title_type;
          } else {
            dataset_related_item_title.push({
              id: nanoid(),
              title: title.title,
              created_at: Date.now() / 1000,
              related_item_id: item.id,
              title_type: title.title_type,
            });
          }
        }

        const relatedItemOther = dataset_related_item_other.find(
          (relatedItemOther) => relatedItemOther.related_item_id === item.id
        );

        if (relatedItemOther) {
          relatedItemOther.publication_year = item.publication_year;
          relatedItemOther.volume = item.volume;
          relatedItemOther.issue = item.issue;
          relatedItemOther.number_value = item.number_value;
          relatedItemOther.number_type = item.number_type;
          relatedItemOther.first_page = item.first_page;
          relatedItemOther.last_page = item.last_page;
          relatedItemOther.publisher = item.publisher;
          relatedItemOther.edition = item.edition;
        } else {
          dataset_related_item_other.push({
            id: nanoid(),
            created_at: Date.now() / 1000,
            edition: item.edition,
            first_page: item.first_page,
            issue: item.issue,
            last_page: item.last_page,
            number_type: item.number_type,
            number_value: item.number_value,
            publication_year: item.publication_year,
            publisher: item.publisher,
            related_item_id: item.id,
            volume: item.volume,
          });
        }
      }

      return h.response({ message: "related items updated" }).code(200);
    },
    method: "POST",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item/{relateditemid}/identifier/{identifierid}",
    handler: (request, h) => {
      const { identifierid } = request.params;

      const identifier = dataset_related_item_identifier.find(
        (identifier) => identifier.id === identifierid
      );

      if (!identifier) {
        return h.response({ message: "identifier not found" }).code(404);
      }

      // remove alternative identifier
      dataset_related_item_identifier.splice(
        dataset_related_item_identifier.indexOf(identifier),
        1
      );

      return h.response(identifier).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item/{relateditemid}/creator/{creatorid}",
    handler: (request, h) => {
      const { creatorid } = request.params;

      const creator = dataset_related_item_creator.find((creator) => creator.id === creatorid);

      if (!creator) {
        return h.response({ message: "creator not found" }).code(404);
      }

      // remove alternative identifier
      dataset_related_item_creator.splice(dataset_related_item_creator.indexOf(creator), 1);

      return h.response(creator).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item/{relateditemid}/contributor/{contributorid}",
    handler: (request, h) => {
      const { contributorid } = request.params;

      const contributor = dataset_related_item_contributor.find(
        (contributor) => contributor.id === contributorid
      );

      if (!contributor) {
        return h.response({ message: "contributor not found" }).code(404);
      }

      // remove alternative identifier
      dataset_related_item_contributor.splice(
        dataset_related_item_contributor.indexOf(contributor),
        1
      );

      return h.response(contributor).code(200);
    },
    method: "DELETE",
  });

  server.route({
    path: "/api/study/{studyid}/dataset/{datasetid}/related-item/{relateditemid}/title/{titleid}",
    handler: (request, h) => {
      const { titleid } = request.params;

      const title = dataset_related_item_title.find((title) => title.id === titleid);

      if (!title) {
        return h.response({ message: "title not found" }).code(404);
      }

      // remove alternative identifier
      dataset_related_item_title.splice(dataset_related_item_title.indexOf(title), 1);

      return h.response(title).code(200);
    },
    method: "DELETE",
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

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
