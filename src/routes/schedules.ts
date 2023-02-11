import { Router } from "express";
import { prisma } from "../db";
import { body, params, Schemas } from "../validate";

const router = Router();

router.get("/:id/schedules", params(Schemas.idParam), async (req, res) => {
  const reptileId = parseInt(req.params.id);

  const schedules = await prisma.schedule.findMany({
    where: { reptileId: reptileId, userId: res.locals.user.id },
  });

  res.json({ schedules });
});

router.post(
  "/:id/schedules",
  params(Schemas.idParam),
  body(Schemas.createSchedule),
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const reptile = await prisma.reptile.findFirst({
      where: { id: reptileId, userId: res.locals.user.id },
    });

    if (!reptile) {
      res.send(404).json({ error: "not found" });
      return;
    }

    const schedule = await prisma.schedule.create({
      data: {
        reptileId: reptileId,
        userId: res.locals.user.id,
        ...req.body,
      },
    });

    res.json({ schedule });
  }
);

export default router;
