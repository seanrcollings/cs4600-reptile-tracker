import { Router } from "express";
import { prisma } from "../db";
import { FeedingCreation } from "../types";
import { body, idParams, params, Schemas } from "../validate";

const router = Router();

router.get("/:id/feedings", params(Schemas.idParam), async (req, res) => {
  const reptileId = parseInt(req.params.id);

  const feedings = await prisma.feeding.findMany({
    where: { reptileId: reptileId, reptile: { userId: res.locals.user.id } },
  });

  res.json({ feedings });
});

router.post(
  "/:id/feedings",
  params(Schemas.idParam),
  body(Schemas.feeding),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);

    const reptile = await prisma.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.send(404).json({ error: "not found" });
      return;
    }

    const feeding = await prisma.feeding.create({
      data: {
        reptileId: reptile?.id,
        ...req.body,
      },
    });

    res.json({ feeding });
  }
);

router.put(
  "/:id/feedings/:feedingId",
  idParams("id", "feedingId"),
  body(Schemas.feeding),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const feedingId = parseInt(req.params.feedingId);

    let feeding = await prisma.feeding.findFirst({
      where: {
        id: feedingId,
        reptileId,
        reptile: { userId: res.locals.user.id },
      },
    });

    if (!feeding) {
      res.send(404).json({ error: "not found" });
      return;
    }

    feeding = await prisma.feeding.update({
      where: { id: feedingId },
      data: req.body,
    });

    res.json({ feeding });
  }
);

router.delete(
  "/:id/feedings/:feedingId",
  idParams("id", "feedingId"),
  params(Schemas.idParam),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const feedingId = parseInt(req.params.feedingId);

    const feeding = await prisma.feeding.findFirst({
      where: {
        id: feedingId,
        reptileId,
        reptile: { userId: res.locals.user.id },
      },
    });

    if (!feeding) {
      res.status(404).json({ error: "not found" });
      return;
    }

    await prisma.feeding.delete({
      where: { id: feedingId },
    });

    res.send();
  }
);

export default router;
