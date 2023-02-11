import { Router } from "express";
import { prisma } from "../db";
import { body, params, Schemas } from "../validate";

const router = Router();

router.get(
  "/:id/husbandryRecords",
  params(Schemas.idParam),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const husbandryRecords = await prisma.husbandryRecord.findMany({
      where: { reptileId: reptileId, reptile: { userId: res.locals.user.id } },
    });

    res.json({ husbandryRecords });
  }
);

router.post(
  "/:id/husbandryRecords",
  params(Schemas.idParam),
  body(Schemas.createHusbandryRecord),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const reptile = await prisma.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.send(404).json({ error: "not found" });
      return;
    }

    const husbandryRecord = await prisma.husbandryRecord.create({
      data: {
        reptileId: reptile?.id,
        ...req.body,
      },
    });

    res.json({ husbandryRecord });
  }
);

export default router;
