import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import ErrorFallback from "./ui/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace('/')}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);


/* 
The react-error-boundary package is useful for catching errors that occur during rendering lifecycle methods, and the commit phase in React components. However, it does not catch errors that occur in: Event Listeners, Asynchronous Code, React Event Handlers

How to Handle These Errors?
Use try...catch inside event handlers.
Wrap async functions with .catch().
Implement window.onerror or global error handlers for unhandled errors.
*/