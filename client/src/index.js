import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

import ContextWrapper from "./Context/ContextWrapper";

import App from "./App";

import "./index.css";
import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextWrapper>
  </React.StrictMode>
);
