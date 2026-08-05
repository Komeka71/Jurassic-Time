import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import { ProgressProvider } from "./context/ProgressContext";
import { GuideProvider } from "./context/GuideContext";
import { AudioProvider } from "./context/AudioContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <AudioProvider>
          <GuideProvider>
            <App />

            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2500,
                style: {
                  background: "#1b140f",
                  color: "#f5e4c4",
                  border: "1px solid #ddb878",
                  borderRadius: "14px",
                  fontWeight: 500,
                },
                success: {
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#1b140f",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#1b140f",
                  },
                },
              }}
            />
          </GuideProvider>
        </AudioProvider>
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>
);