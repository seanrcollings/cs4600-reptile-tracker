import { User } from "@prisma/client";
import express from "express";

declare global {
  namespace Express {
    export interface Locals {
      user: User;
    }
  }
}
