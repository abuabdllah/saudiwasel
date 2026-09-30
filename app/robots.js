export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/.netlify/functions/"] },
    sitemap: "https://saudiwasel.com/sitemap.xml",
  };
}
