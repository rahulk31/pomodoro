import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

import { TaskProvider } from "./context/tasks-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <TaskProvider>
      <App />
    </TaskProvider>
  </Router>
);
