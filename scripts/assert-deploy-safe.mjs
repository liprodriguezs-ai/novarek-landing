#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
	options: {
		"expected-name": { type: "string" },
		env: { type: "string" },
	},
});

const configPath = new URL("../wrangler.jsonc", import.meta.url);
const configText = readFileSync(configPath, "utf8");
let config;
try {
	config = JSON.parse(stripJsonComments(configText));
} catch (error) {
	fail(
		`wrangler.jsonc is not valid JSONC: ${error instanceof Error ? error.message : String(error)}`,
	);
}
const forbiddenKeys = findForbiddenKeys(config);

if (forbiddenKeys.length > 0) {
	fail(
		`wrangler.jsonc must not declare routes or custom_domain. Found: ${forbiddenKeys.join(", ")}`,
	);
}

const actualName = values.env ? config.env?.[values.env]?.name : config.name;
if (values["expected-name"] && actualName !== values["expected-name"]) {
	fail(
		`Worker name mismatch for ${values.env ? `env ${values.env}` : "production"}: expected ${values["expected-name"]}, got ${actualName ?? "<missing>"}`,
	);
}

if (!config.assets?.directory) {
	fail(
		"wrangler.jsonc must declare assets.directory for the Astro static build output.",
	);
}

console.log(
	`Deploy guard passed: ${actualName} uses ${config.assets.directory}; no routes/custom_domain declared.`,
);

function findForbiddenKeys(value, path = []) {
	if (!value || typeof value !== "object") return [];
	return Object.entries(value).flatMap(([key, child]) => {
		const childPath = [...path, key];
		const current =
			key === "routes" || key === "custom_domain" ? [childPath.join(".")] : [];
		return [...current, ...findForbiddenKeys(child, childPath)];
	});
}

function fail(message) {
	console.error(message);
	process.exit(1);
}

function stripJsonComments(input) {
	let output = "";
	let inString = false;
	let stringQuote = "";
	let escaped = false;

	for (let i = 0; i < input.length; i += 1) {
		const char = input[i];
		const next = input[i + 1];

		if (inString) {
			output += char;
			if (escaped) {
				escaped = false;
			} else if (char === "\\") {
				escaped = true;
			} else if (char === stringQuote) {
				inString = false;
			}
			continue;
		}

		if (char === '"' || char === "'") {
			inString = true;
			stringQuote = char;
			output += char;
			continue;
		}

		if (char === "/" && next === "/") {
			while (i < input.length && input[i] !== "\n") i += 1;
			output += "\n";
			continue;
		}

		if (char === "/" && next === "*") {
			i += 2;
			while (i < input.length && !(input[i] === "*" && input[i + 1] === "/"))
				i += 1;
			i += 1;
			continue;
		}

		output += char;
	}

	return output;
}
