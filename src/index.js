import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Could not find root element");
}
