import { Request, RequestHandler } from "express";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

function requestValidator(key: keyof Request, schema: Object): RequestHandler {
  const validator = ajv.compile(schema);

  return (req, res, next) => {
    if (!validator(req[key])) {
      res.status(400).json({ errors: validator.errors });
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
      firstName: { type: "string", minLength: 1 },
      lastName: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1 },
      password: { type: "string", minLength: 1 },
    },
    required: ["firstName", "lastName", "email", "password"],
    additionalProperties: false,
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
    additionalProperties: false,
  },
  createReptile: {
    type: "object",
    properties: {
      species: {
        type: "string",
        enum: ["ball_python", "king_snake", "corn_snake", "redtail_boa"],
      },
      name: { type: "string", minLength: 1 },
      sex: {
        type: "string",
        enum: ["m", "f"],
      },
    },
    required: ["species", "name", "sex"],
    additionalProperties: false,
  },
  updateReptile: {
    type: "object",
    properties: {
      species: {
        type: "string",
        enum: ["ball_python", "king_snake", "corn_snake", "redtail_boa"],
      },
      name: { type: "string", minLength: 1 },
      sex: {
        type: "string",
        enum: ["m", "f"],
      },
    },
    additionalProperties: false,
  },
  feeding: {
    type: "object",
    properties: {
      foodItem: { type: "string" },
    },
    required: ["foodItem"],
    additionalProperties: false,
  },
  createHusbandryRecord: {
    type: "object",
    properties: {
      length: { type: "number" },
      weight: { type: "number" },
      temperature: { type: "number" },
      humidity: { type: "number" },
    },
    required: ["length", "weight", "temperature", "humidity"],
    additionalProperties: false,
  },
  createSchedule: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["feed", "record", "clean"] },
      description: { type: "string" },
      monday: { type: "boolean" },
      tuesday: { type: "boolean" },
      wednesday: { type: "boolean" },
      thursday: { type: "boolean" },
      friday: { type: "boolean" },
      saturday: { type: "boolean" },
      sunday: { type: "boolean" },
    },
    required: ["type", "description"],
    additionalProperties: false,
  },
};
