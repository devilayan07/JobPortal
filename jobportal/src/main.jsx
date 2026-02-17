import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import JobProvider from "./providers/JobProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import AppliedJobProvider from "./providers/AppliedJobProvider.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <JobProvider>
          <AppliedJobProvider>
            <ToastContainer />
            <Provider store={store}>
              <App />
            </Provider>
          </AppliedJobProvider>
        </JobProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
