/* eslint-disable no-undef */
const { prettierConfig } = require("@fairdataihub/config");

const config = prettierConfig();

config.endOfLine = "auto";

module.exports = config;
