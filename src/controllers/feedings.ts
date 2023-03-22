import { controller } from "../lib/controller";
import { body, idParams, params, Schemas } from "../lib/validate";
import { Endpoint } from "../types";

const getFeedings: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const feedings = await client.feeding.findMany({
      where: { reptileId: reptileId, reptile: { userId: res.locals.user.id } },
    });

    res.json({ feedings });
  },
];

const createFeeding: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  body(Schemas.feeding),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const reptile = await client.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.status(404).json({ errors: "not found" });
      return;
    }

    const feeding = await client.feeding.create({
      data: {
        reptileId: reptile?.id,
        ...req.body,
      },
    });

    res.json({ feeding });
  },
];

const updateFeeding: Endpoint = ({ client }) => [
  idParams("id", "feedingId"),
  body(Schemas.feeding),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const feedingId = parseInt(req.params.feedingId);

    let feeding = await client.feeding.findFirst({
      where: {
        id: feedingId,
        reptileId,
        reptile: { userId: res.locals.user.id },
      },
    });

    if (!feeding) {
      res.status(404).json({ errors: "not found" });
      return;
    }

    feeding = await client.feeding.update({
      where: { id: feedingId },
      data: req.body,
    });

    res.json({ feeding });
  },
];

const deleteFeeding: Endpoint = ({ client }) => [
  idParams("id", "feedingId"),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const feedingId = parseInt(req.params.feedingId);

    const feeding = await client.feeding.findFirst({
      where: {
        id: feedingId,
        reptileId,
        reptile: { userId: res.locals.user.id },
      },
    });

    if (!feeding) {
      res.status(404).json({ errors: "not found" });
      return;
    }

    await client.feeding.delete({
      where: { id: feedingId },
    });

    res.send();
  },
];

export const feedingsController = controller("reptiles/:id/feedings", [
  {
    path: "",
    method: "get",
    endpoint: getFeedings,
  },
  {
    path: "",
    method: "post",
    endpoint: createFeeding,
  },
  {
    path: "/:feedingId",
    method: "put",
    endpoint: updateFeeding,
  },
  {
    path: "/:feedingId",
    method: "delete",
    endpoint: deleteFeeding,
  },
]);
