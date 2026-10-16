import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Success cases: one Markdown file per case in src/content/cases/.
// Only publish facts the client has approved; no invented metrics.
const cases = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			client: z.string(),
			sector: z.string(),
			/** One or two sentences for cards and the page lede. */
			summary: z.string(),
			url: z.url(),
			cover: image(),
			coverAlt: z.string(),
			/** Short list of what Novarek built, shown on cards and the home. */
			built: z.array(z.string()).min(1),
			publishedAt: z.coerce.date(),
			/** Featured cases appear on the home page. */
			featured: z.boolean().default(false),
		}),
});

export const collections = { cases };
