import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import "./index.css";
import App from "./App.jsx";
import JobDetails from "./pages/JobDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/job/:jobId"
          element={<JobDetails />}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);