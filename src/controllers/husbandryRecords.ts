import { controller } from "../lib/controller";
import { body, params, Schemas } from "../lib/validate";
import { Endpoint } from "../types";

const getHusbandryRecords: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const husbandryRecords = await client.husbandryRecord.findMany({
      where: { reptileId: reptileId, reptile: { userId: res.locals.user.id } },
      orderBy: { creatdAt: "desc" },
    });

    res.json({ husbandryRecords });
  },
];

const createHusbandryRecord: Endpoint = ({ client }) => [
  params(Schemas.idParam),
  body(Schemas.createHusbandryRecord),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const reptile = await client.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.send(404).json({ errors: "not found" });
      return;
    }

    const husbandryRecord = await client.husbandryRecord.create({
      data: {
        reptileId: reptile?.id,
        ...req.body,
      },
    });

    res.json({ husbandryRecord });
  },
];

export const husbandryRecordsController = controller(
  "reptiles/:id/husbandryRecords",
  [
    {
      path: "",
      method: "get",
      endpoint: getHusbandryRecords,
    },
    {
      path: "",
      method: "post",
      endpoint: createHusbandryRecord,
    },
  ]
);
