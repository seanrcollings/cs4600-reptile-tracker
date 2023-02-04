import { Router } from "express";
import { resourceLimits } from "worker_threads";
import { prisma } from "../db";
import { ReptileCreation, ReptileUpdate } from "../types";

const router = Router();

router.get("", async (req, res) => {
  const reptiles = await prisma.reptile.findMany({
    where: { user: res.locals.user },
  });
  res.json({ reptiles });
});

// TODO: add validation for the species
router.post("", async (req, res) => {
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

// TODO: add validation for the species
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const { species, name, sex } = req.body as ReptileUpdate;
  const initialReptile = await prisma.reptile.findFirst({
    where: {
      id,
      user: res.locals.user,
    },
  });

  if (!initialReptile) {
    res.status(404).json({ message: "not found" });
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
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const initialReptile = await prisma.reptile.findFirst({
    where: {
      id,
      user: res.locals.user,
    },
  });

  if (!initialReptile) {
    res.status(404).json({ message: "not found" });
    return;
  }

  await prisma.reptile.delete({
    where: { id },
  });

  res.send();
});

export default router;
