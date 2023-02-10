import { Router } from "express";
import { prisma } from "../db";
import { ReptileCreation, ReptileUpdate } from "../types";
import { body, params, Schemas } from "../validate";
import feedings from "./feedings";

const router = Router();
router.use(feedings);

router.get("", async (req, res) => {
  const reptiles = await prisma.reptile.findMany({
    where: { user: res.locals.user },
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
        user: res.locals.user,
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
      user: res.locals.user,
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
