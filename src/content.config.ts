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
			/** Used for cards, the page lede and the meta description: ≤ 125 chars so social previews don't truncate it. */
			summary: z.string().max(125),
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
