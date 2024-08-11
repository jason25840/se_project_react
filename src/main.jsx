import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "../src/components/App";
import "./index.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
