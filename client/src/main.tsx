import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/globals.css";
import { Modal } from "atomic-elements";

const root = document.getElementById("root") as HTMLElement;
Modal.init(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
