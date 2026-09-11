import type { MetadataRoute } from "next";

/** The public page is open to crawlers; the submissions panel is not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
  };
}
