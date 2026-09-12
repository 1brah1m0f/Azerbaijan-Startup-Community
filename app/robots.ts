import type { MetadataRoute } from "next";

/**
 * The public page is open to crawlers. The submissions panel and anything
 * behind a member's login are not.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/api/"],
    },
  };
}
