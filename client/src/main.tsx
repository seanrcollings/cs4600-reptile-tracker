import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/globals.css";
import { Modal } from "atomic-elements";
import App from "./App";

const root = document.getElementById("root") as HTMLElement;
Modal.init(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
