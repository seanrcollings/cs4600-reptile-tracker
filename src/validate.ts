import { Request, RequestHandler } from "express";
import Ajv from "ajv";

const ajv = new Ajv();

function requestValidator(key: keyof Request, schema: Object): RequestHandler {
  const validator = ajv.compile(schema);

  return (req, res, next) => {
    console.log(req[key]);
    if (!validator(req[key])) {
      res.status(400).json({ error: validator.errors });
    } else {
      next();
    }
  };
}

export function body(schema: Object): RequestHandler {
  return requestValidator("body", schema);
}

export function params(schema: Object): RequestHandler {
  return requestValidator("params", schema);
}

export function idParams(...idParams: string[]): RequestHandler {
  return params({
    type: "object",
    properties: Object.fromEntries(
      idParams.map((id) => [id, { type: "string", pattern: "^\\d+$" }])
    ),
    required: idParams,
  });
}

export const Schemas = {
  createUser: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["firstName", "lastName", "email", "password"],
  },
  loginUser: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "password"],
  },
  idParam: {
    type: "object",
    properties: {
      id: { type: "string", pattern: "^\\d+$" },
    },
    required: ["id"],
  },
  createReptile: {
    type: "object",
    properties: {
      species: {
        type: "string",
        enum: ["ball_python", "king_snake", "corn_snake", "redtail_boa"],
      },
      name: { type: "string" },
      sex: {
        type: "string",
        enum: ["m", "f"],
      },
    },
    required: ["species", "name", "sex"],
  },
  updateReptile: {
    type: "object",
    properties: {
      species: {
        type: "string",
        enum: ["ball_python", "king_snake", "corn_snake", "redtail_boa"],
      },
      name: { type: "string" },
      sex: {
        type: "string",
        enum: ["m", "f"],
      },
    },
  },
  feeding: {
    type: "object",
    properties: {
      foodItem: { type: "string" },
    },
    required: ["foodItem"],
  },
};
