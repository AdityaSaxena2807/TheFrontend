import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
// This is the very first file React reads. Think of it as the 'on switch' for your whole app. You only ever touch this file once.

// What goes here
// Import React and ReactDOM
// These are the core React libraries. You just import them, don't write them.
// Import your App component
// App.jsx is the root of all your UI — import it here.
// Call ReactDOM.createRoot(...).render()
// This one line tells React: 'start the app and put it inside the
// in index.html'
