import "@babel/polyfill";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// CSS
import "./styles/masterstyle.css";

// Test after running!
console.log("working!");

ReactDOM.hydrate(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")
);
