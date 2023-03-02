import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import React from "react";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
