import * as file from "./theme.json";

/**
 * Will return the either all the generated json
 * or the json for the given property key
 * or if an array of properties, only them
 * @param key
 * @returns {{}|*}
 */
export const getTheme = (key = null) => {
  try {
    if (key) {
      if (typeof key === "string") {
        return file[key];
      } else if (typeof key === "object" && key?.length > 0) {
        const result = {};
        key.forEach((key) => {
          result[key] = file[key];
        });
        return result;
      }
    }
    return file;
  } catch (err) {
    throw new Error("Could not find config file.");
  }
};
