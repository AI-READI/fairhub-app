import sanitizeHtml from "sanitize-html";

export const sanitize = (html: string) => sanitizeHtml(html);
