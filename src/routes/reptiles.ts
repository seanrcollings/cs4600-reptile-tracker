import { Router } from "express";
import { prisma } from "../db";
import { ReptileCreation, ReptileUpdate } from "../types";
import { body, params, Schemas } from "../validate";
import feedings from "./feedings";
import husbandryRecords from "./husbandryRecords";
import schedules from "./schedules";

const router = Router();
router.use(feedings);
router.use(husbandryRecords);
router.use(schedules);

router.get("", async (req, res) => {
  const reptiles = await prisma.reptile.findMany({
    where: { userId: res.locals.user.id },
  });
  res.json({ reptiles });
});

router.post("", body(Schemas.createReptile), async (req, res) => {
  const { species, name, sex } = req.body as ReptileCreation;
  const reptile = await prisma.reptile.create({
    data: {
      name,
      species,
      sex,
      userId: res.locals.user.id,
    },
  });

  res.json({ reptile });
});

router.put(
  "/:id",
  params(Schemas.idParam),
  body(Schemas.updateReptile),
  async (req, res) => {
    const id = parseInt(req.params.id);

    const { species, name, sex } = req.body as ReptileUpdate;
    const initialReptile = await prisma.reptile.findFirst({
      where: {
        id,
        userId: res.locals.user.id,
      },
    });

    if (!initialReptile) {
      res.status(404).json({ error: "not found" });
      return;
    }

    const reptile = await prisma.reptile.update({
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
  }
);

router.delete("/:id", params(Schemas.idParam), async (req, res) => {
  const id = parseInt(req.params.id);

  const initialReptile = await prisma.reptile.findFirst({
    where: {
      id,
      userId: res.locals.user.id,
    },
  });

  if (!initialReptile) {
    res.status(404).json({ error: "not found" });
    return;
  }

  await prisma.reptile.delete({
    where: { id },
  });

  res.send();
});

export default router;
