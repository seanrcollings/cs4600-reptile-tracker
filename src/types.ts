import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler } from "express";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserJwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ReptileCreation {
  name: string;
  species: string;
  sex: string;
}

export type ReptileUpdate = Partial<ReptileCreation>;

export interface FeedingCreation {
  foodItem: string;
}

export interface HusbandryRecordCreation {
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
}

export interface ScheduleCreation {
  type: string;
  description: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
}

export interface ControllerDependancies {
  client: PrismaClient;
}

export type Endpoint = (
  deps: ControllerDependancies
) => RequestHandler | RequestHandler[];
