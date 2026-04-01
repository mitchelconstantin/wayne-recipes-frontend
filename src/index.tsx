import { createRoot } from "react-dom/client";
import { App } from "./App";
import { register } from "./serviceWorker";
import { SnackbarService } from "./Shared/SnackbarService";

createRoot(document.getElementById("root")!).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    SnackbarService.info("New version available — refreshing…");
    setTimeout(() => window.location.reload(), 1500);
  },
});
// serviceWorker.unregister();
