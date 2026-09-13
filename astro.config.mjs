/// <reference types="node" />
// @ts-check
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://novarek.mx";

// https://astro.build/config
export default defineConfig({
	site,
});
