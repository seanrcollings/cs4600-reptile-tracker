import { Request } from "express";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
