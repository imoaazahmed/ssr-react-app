// Call ignore styles
require("ignore-styles");

// Call babel register
require("@babel/register")({
	ignore: [/(node_module)/],
	presets: ["@babel/preset-env", "@babel/preset-react"],
});

// Call server configuration
require("./app");
