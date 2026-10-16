/// <reference types="node" />
// @ts-check
import { defineConfig, fontProviders } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://novarek.mx";

// https://astro.build/config
export default defineConfig({
	site,
	// Self-hosted at build time. Astro generates metric-matched fallbacks
	// (size-adjust, ascent-override…) so the swap to the real font doesn't shift text.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Space Grotesk",
			cssVariable: "--font-space-grotesk",
			weights: ["300 700"],
			subsets: ["latin"],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Manrope",
			cssVariable: "--font-manrope",
			weights: ["200 800"],
			subsets: ["latin"],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-jetbrains-mono",
			weights: ["100 800"],
			subsets: ["latin"],
			fallbacks: ["monospace"],
		},
	],
});
