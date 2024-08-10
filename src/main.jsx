import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "../src/components/App";
import './index.css'
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>
);
