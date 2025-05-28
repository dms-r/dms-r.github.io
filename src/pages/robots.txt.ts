import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /_astro/

User-Agent: Applebot-Extended
User-Agent: Bytespider
User-Agent: ClaudeBot
User-Agent: FacebookBot
User-Agent: GoogleOther
User-Agent: Google-Extended
User-Agent: GPTBot
Disallow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
