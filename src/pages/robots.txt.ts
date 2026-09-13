import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	if (!site) {
		return new Response("Site URL is not configured.", { status: 500 });
	}

	const isProduction =
		(import.meta.env.SITE_ENV ?? "production") === "production";
	const sitemapUrl = new URL("sitemap.xml", site);
	const body = isProduction
		? `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`
		: `User-agent: *
Disallow: /
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
