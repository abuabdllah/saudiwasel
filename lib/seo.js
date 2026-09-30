export const SITE_URL = "https://saudiwasel.com";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).href;
}

export function pageMetadata(input, path = input.alternates?.canonical || "/") {
  const canonical = absoluteUrl(path);
  const english = new URL(canonical).pathname.startsWith("/en");
  const languages = input.alternates?.languages;
  return {
    ...input,
    alternates: {
      ...input.alternates,
      canonical,
      ...(languages && { languages: Object.fromEntries(Object.entries(languages).map(([language, url]) => [language, absoluteUrl(url)])) }),
    },
    openGraph: {
      siteName: english ? "Saudi Wasel" : "سعودي واصل",
      type: new URL(canonical).pathname.startsWith("/articles/") ? "article" : "website",
      locale: english ? "en_SA" : "ar_SA",
      ...input.openGraph,
      title: input.title,
      description: input.description,
      url: canonical,
      images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630, alt: "SaudiWasel | سعودي واصل" }],
    },
    twitter: {
      ...input.twitter,
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [absoluteUrl("/twitter-image.png")],
    },
  };
}
