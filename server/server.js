const express = require("express");
const fs = require("fs");
const path = require("path");

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");

// Create express application
const app = express();

// Import App component
import App from "../src/App";

// Serve static assets
app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, "../dist")));

// For any other requests, send `index.html` as a response
app.use("*", (req, res) => {
	// read `index.html` file
	let indexHTML = fs.readFileSync(path.resolve(__dirname, "../dist/index.html"), {
		encoding: "utf-8",
	});

	// get HTML string from the `App` component
	let appHTML = ReactDOMServer.renderToString(
		<StaticRouter location={req.originalUrl}>
			<App />
		</StaticRouter>
	);

	// populate `#root` element with `appHTML`
	indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);

	// set header and status
	res.contentType("text/html");
	res.status(200);

	return res.send(indexHTML);
});

// Run express server
const port = 9000 || process.env.PORT;
app.listen(port, () => {
	console.log(`Express server running at http://localhost:${port}`);
});
