import React from "react";
import { ReptileApi } from "./lib/api";

export const ApiContext = React.createContext<ReptileApi>({} as ReptileApi);

type AuthCallback = (token: string | null) => void;
export const AuthContext = React.createContext<AuthCallback>(() => {});
