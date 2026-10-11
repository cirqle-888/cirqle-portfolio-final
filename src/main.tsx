import { MotionConfig } from 'motion/react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <MotionConfig reducedMotion="user"><App /></MotionConfig>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
