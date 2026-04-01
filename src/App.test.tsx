import { createRoot } from "react-dom/client";
import { App } from "./App";

beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<App />);
});
