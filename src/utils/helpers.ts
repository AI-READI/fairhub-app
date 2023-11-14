import sanitizeHtml from "sanitize-html";

import type { Descriptor } from "@/types/Common";

export const sanitize = (html: string) => sanitizeHtml(html);

export const validateJsonAsType = function <T>(v: any, d: Descriptor<T>): T {
  const valid: any = {};
  for (const key in d) {
    try {
      const val = d[key](v[key]);
      if (typeof val !== "undefined") {
        valid[key] = val;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Could not set type for ${key}: ${msg}`);
    }
  }
  return valid;
};
