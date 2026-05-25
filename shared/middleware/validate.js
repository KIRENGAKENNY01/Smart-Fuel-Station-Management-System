import { response } from "../utils/response.js";

const formatZodErrors = (error) =>
  error.errors.map((e) => {
    const path = e.path.length ? e.path.join(".") : "body";
    return `${path}: ${e.message}`;
  }).join("; ");

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return response(res, 400, formatZodErrors(result.error));
  }
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return response(res, 400, formatZodErrors(result.error));
  }
  req.query = result.data;
  next();
};

export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    return response(res, 400, formatZodErrors(result.error));
  }
  req.params = result.data;
  next();
};
