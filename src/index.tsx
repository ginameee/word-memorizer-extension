import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Layout from "./Layout";

const renderApp = (): void => {
  const root = document.getElementById(
    process.env.REACT_APP_EXTENSION_ROOT_ELEMENT_ID!
  );

  if (root) {
    const reactRoot = createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <Layout>
          <App />
        </Layout>
      </React.StrictMode>
    );
  }
};

// Wait for the extension-loaded event before rendering
const extensionRoot = document.getElementById(
  process.env.REACT_APP_EXTENSION_ROOT_ELEMENT_ID!
);
if (extensionRoot) {
  extensionRoot.addEventListener("extension-loaded", renderApp);
}
