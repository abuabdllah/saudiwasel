import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";
import EnglishLeadForm from "./EnglishLeadForm";
import { englishPages, englishStcPlans, stcPricesUpdated, priceEnquiry, connectionComparison } from "../lib/english";

const BASE = "https://saudiwasel.com";

export default function EnglishPage({ page }) {
  const isHome = page.path === "/en";
  const breadcrumbs = [{ name: "English home", path: "/en" }];
  if (!isHome) breadcrumbs.push({ name: page.nav, path: page.path });
  const schemas = [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Saudi Wasel",
      alternateName: "سعودي واصل",
      description: "Independent sales agent for home internet enquiries in Saudi Arabia.",
      url: `${BASE}/`,
      logo: `${BASE}/icon.png`,
      telephone: "+966564612017",
      contactPoint: { "@type": "ContactPoint", telephone: "+966564612017", contactType: "sales", availableLanguage: ["English", "Arabic"] },
    },
    breadcrumbSchema(breadcrumbs),
    {
      "@type": "Service",
      "@id": `${BASE}${page.path}#service`,
      name: page.h1,
      serviceType: `Independent sales assistance for ${page.service}`,
      url: `${BASE}${page.path}`,
      areaServed: page.city ? { "@type": "City", name: page.city } : { "@type": "Country", name: "Saudi Arabia" },
      provider: { "@id": `${BASE}/#organization` },
    },
    faqSchema(page.faqs),
  ];

  return (
    <main id="en-main">
      <section className="en-hero">
        <div className="en-container">
          {!isHome && <nav className="en-breadcrumb" aria-label="Breadcrumb"><a href="/en">English home</a><span aria-hidden="true">/</span><span aria-current="page">{page.nav}</span></nav>}
          <div className="en-hero-grid">
            <div className="en-hero-copy">
              <p className="en-kicker">{page.eyebrow}</p>
              <h1>{page.h1}</h1>
              <p className="en-intro">{page.intro}</p>
              <ul className="en-hero-points">{page.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <a href="tel:0564612017" className="en-text-link">Prefer to call? 0564612017 <span aria-hidden="true">↗</span></a>
            </div>
            <EnglishLeadForm city={page.city} service={page.service} />
          </div>
        </div>
      </section>

      <div className="en-container en-content">
        <section className="en-context">
          <span className="en-kicker">Your address makes the difference</span>
          <h2>{page.contextTitle}</h2>
          <p>{page.context}</p>
        </section>

        {page.path === "/en/fiber-vs-5g" && (
          <section className="en-section" aria-labelledby="en-compare-title">
            <h2 id="en-compare-title">Fiber vs 5G: the practical differences</h2>
            <div className="en-table-wrap" role="region" aria-label="Fiber and 5G comparison" tabIndex={0}>
              <table><caption>Compare connection types before choosing a provider</caption><thead><tr><th scope="col">Consideration</th><th scope="col">Fiber internet</th><th scope="col">5G home router</th></tr></thead>
                <tbody>{connectionComparison.map(([label, fiber, fiveg]) => <tr key={label}><th scope="row">{label}</th><td>{fiber}</td><td>{fiveg}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        )}

        <section className="en-section" aria-labelledby="en-operators-title">
          <div className="en-section-heading"><span className="en-kicker">Compare, then choose</span><h2 id="en-operators-title">Operators</h2><p>{page.operatorIntro}</p></div>
          <dl className="en-operators">{page.operators.map(([name, detail]) => <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>)}</dl>
        </section>

        <section className="en-section" aria-labelledby="en-plans-title">
          <h2 id="en-plans-title">{page.path === "/en/fiber-internet-jeddah" ? "Published STC fiber plans and prices" : "Plans and prices"}</h2>
          {page.path === "/en/fiber-internet-jeddah" ? (
            <>
              <p>These entries are translated from the Arabic STC Jeddah page, last updated {stcPricesUpdated}. The figures are unchanged and are not a new quotation. Published prices include VAT; confirm the current offer and its conditions before subscribing.</p>
              <div className="en-table-wrap" role="region" aria-label="Published STC fiber plans" tabIndex={0}>
                <table><caption>STC fiber packages as published on the Arabic counterpart</caption><thead><tr><th scope="col">Plan</th><th scope="col">Download</th><th scope="col">Upload</th><th scope="col">Price</th><th scope="col">Included benefits</th></tr></thead>
                  <tbody>{englishStcPlans.map((plan) => <tr key={plan.name}><th scope="row">{plan.name}</th><td>{plan.down}</td><td>{plan.up}</td><td>{plan.price}</td><td>{plan.perks}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="en-price-note">For other operators and confirmation of the published STC offers: <a href="https://wa.me/966564612017">{priceEnquiry}</a></p>
            </>
          ) : <p className="en-price-note"><a href="https://wa.me/966564612017">{priceEnquiry}</a></p>}
        </section>

        <section className="en-section en-apply" aria-labelledby="en-apply-title">
          <div><span className="en-kicker">Before an application</span><h2 id="en-apply-title">What you need to apply</h2></div>
          <ul>{page.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
        </section>

        <section className="en-section" aria-labelledby="en-steps-title">
          <span className="en-kicker">From your first message</span><h2 id="en-steps-title">How it works</h2>
          <ol className="en-steps">{page.steps.map(([heading, text], index) => <li key={heading}><span className="en-step-number" aria-hidden="true">0{index + 1}</span><h3>{heading}</h3><p>{text}</p></li>)}</ol>
        </section>

        <section className="en-section en-benefits" aria-labelledby="en-benefits-title">
          <div><span className="en-kicker">A little less admin</span><h2 id="en-benefits-title">Why order through us</h2></div>
          <dl>{page.benefits.map(([heading, text]) => <div key={heading}><dt>{heading}</dt><dd>{text}</dd></div>)}</dl>
        </section>

        <section className="en-section en-faq" aria-labelledby="en-faq-title">
          <span className="en-kicker">Before you decide</span><h2 id="en-faq-title">Frequently asked questions</h2>
          {page.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
        </section>

        <section className="en-section en-related" aria-labelledby="en-related-title">
          <h2 id="en-related-title">Explore more home internet guides</h2>
          <nav aria-label="Related English pages">{englishPages.filter((other) => other.path !== page.path).map((other) => <a key={other.path} href={other.path}>{other.nav}<span aria-hidden="true">↗</span></a>)}</nav>
        </section>
      </div>
      <JsonLd data={schemas} />
    </main>
  );
}
