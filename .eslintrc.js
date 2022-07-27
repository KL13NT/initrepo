module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ["airbnb-base"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-tabs": "off",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		"no-console": "off",
		"operator-linebreak": "off",
		"comma-dangle": "off",
	},
};
