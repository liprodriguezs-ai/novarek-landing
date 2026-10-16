import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Generated so new cases appear automatically. Paths match the canonical URLs (trailing slash).
export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response("Site URL is not configured.", { status: 500 });
	}

	const cases = await getCollection("cases");
	const pages = [
		{ path: "/", priority: "1.0" },
		{ path: "/casos/", priority: "0.8" },
		...cases.map((item) => ({
			path: `/casos/${item.id}/`,
			priority: "0.7",
			lastmod: item.data.publishedAt.toISOString().slice(0, 10),
		})),
		{ path: "/contacto/", priority: "0.6" },
	];

	const urls = pages
		.map(
			(page) => `  <url>
    <loc>${new URL(page.path, site).href}</loc>${"lastmod" in page ? `
    <lastmod>${page.lastmod}</lastmod>` : ""}
    <priority>${page.priority}</priority>
  </url>`,
		)
		.join("\n");

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
		{ headers: { "Content-Type": "application/xml; charset=utf-8" } },
	);
};
