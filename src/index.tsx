import ReactDOM from "react-dom";
import { App } from "./App";
import { register } from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register({
  onUpdate: (registration) => {
    alert("New version available!  Ready to update?");
    window.location.reload();
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
// serviceWorker.unregister();
