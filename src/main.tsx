import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./contexts/authProvider.js";

registerSW();

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
