import { controller } from "../lib/controller";
import { error } from "../lib/utils";
import { body, params, Schemas } from "../lib/validate";
import { Endpoint } from "../types";

const getSchedules: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const schedules = await client.schedule.findMany({
      where: { reptileId: reptileId, userId: res.locals.user.id },
    });

    res.json({ schedules });
  },
];

const createSchedule: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  body(Schemas.createSchedule),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const reptile = await client.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.send(404).json(error("not found"));
      return;
    }

    const schedule = await client.schedule.create({
      data: {
        reptileId: reptileId,
        userId: res.locals.user.id,
        ...req.body,
      },
    });

    res.json({ schedule });
  },
];

export const schedulesController = controller("reptiles/:id/schedules", [
  {
    path: "",
    method: "get",
    endpoint: getSchedules,
  },
  {
    path: "",
    method: "post",
    endpoint: createSchedule,
  },
]);
