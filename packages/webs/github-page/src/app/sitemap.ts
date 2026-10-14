import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://wisdomstar94.github.io/log-diary";

const ROUTE_PATHS = ["/", "/privacy/", "/support/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTE_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
