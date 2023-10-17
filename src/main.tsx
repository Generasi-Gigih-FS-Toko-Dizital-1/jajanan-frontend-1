import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CustomTheme from "./utils/CustomTheme.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomTheme>
        <App />
      </CustomTheme>
    </BrowserRouter>
  </React.StrictMode>
);
