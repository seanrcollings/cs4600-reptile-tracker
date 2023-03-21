import { Endpoint, ReptileCreation, ReptileUpdate } from "../types";
import { body, params, Schemas } from "../lib/validate";
import { controller } from "../lib/controller";

const getReptiles: Endpoint =
  ({ client }) =>
  async (req, res) => {
    const reptiles = await client.reptile.findMany({
      where: { userId: res.locals.user.id },
    });
    res.json({ reptiles });
  };

const createReptile: Endpoint = ({ client }) => [
  body(Schemas.createReptile),
  async (req, res) => {
    const { species, name, sex } = req.body as ReptileCreation;
    const reptile = await client.reptile.create({
      data: {
        name,
        species,
        sex,
        userId: res.locals.user.id,
      },
    });

    res.json({ reptile });
  },
];

const updateReptile: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  body(Schemas.updateReptile),
  async (req, res) => {
    const id = parseInt(req.params.id);

    const { species, name, sex } = req.body as ReptileUpdate;
    const initialReptile = await client.reptile.findFirst({
      where: {
        id,
        userId: res.locals.user.id,
      },
    });

    if (!initialReptile) {
      res.status(404).json({ error: "not found" });
      return;
    }

    const reptile = await client.reptile.update({
      where: {
        id,
      },
      data: {
        species,
        name,
        sex,
      },
    });

    res.json({ reptile });
  },
];

const deleteReptile: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  async (req, res) => {
    const id = parseInt(req.params.id);

    const initialReptile = await client.reptile.findFirst({
      where: {
        id,
        userId: res.locals.user.id,
      },
    });

    if (!initialReptile) {
      res.status(404).json({ error: "not found" });
      return;
    }

    await client.reptile.delete({
      where: { id },
    });

    res.status(200).json({ success: true });
  },
];

export const reptilesController = controller("reptiles", [
  {
    path: "",
    method: "get",
    endpoint: getReptiles,
  },
  {
    path: "",
    method: "post",
    endpoint: createReptile,
  },
  {
    path: "/:id",
    method: "put",
    endpoint: updateReptile,
  },
  {
    path: "/:id",
    method: "delete",
    endpoint: deleteReptile,
  },
]);
