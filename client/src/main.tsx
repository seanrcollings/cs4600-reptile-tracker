import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/globals.css";
import { Modal } from "atomic-elements";
import { ReptileApi } from "./lib/api";

const root = document.getElementById("root") as HTMLElement;
Modal.init(root);
ReptileApi.initAuth();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
