import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import JobProvider from "./providers/JobProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <JobProvider>
          <ToastContainer/>
          <App />
        </JobProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
