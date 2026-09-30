import LanguageSwitcher from "./LanguageSwitcher";
import { englishPages, englishDisclaimer } from "../lib/english";

export function EnglishHeader() {
  return (
    <header className="en-header">
      <div className="en-container en-header-top">
        <a href="/en" className="en-logo" aria-label="Saudi Wasel English home">Saudi <span>Wasel</span><small>Independent home internet advice</small></a>
        <div className="en-header-actions">
          <span className="en-language"><LanguageSwitcher language="ar" /></span>
          <a href="tel:0564612017" className="en-call">Call <bdi>0564612017</bdi></a>
          <a href="https://wa.me/966564612017" className="en-button en-button-wa">WhatsApp</a>
        </div>
      </div>
      <nav className="en-container en-nav" aria-label="English pages">
        {englishPages.map((page) => <a key={page.path} href={page.path}>{page.nav}</a>)}
      </nav>
    </header>
  );
}

export function EnglishFooter() {
  return (
    <footer className="en-footer">
      <div className="en-container">
        <div className="en-footer-top">
          <a className="en-logo" href="/en">Saudi <span>Wasel</span></a>
          <div className="en-footer-contact"><a href="tel:0564612017">Call 0564612017</a><a href="https://wa.me/966564612017">Contact us on WhatsApp</a></div>
        </div>
        <nav className="en-footer-links" aria-label="English internet guides">
          {englishPages.map((page) => <a key={page.path} href={page.path}>{page.nav}</a>)}
        </nav>
        <p className="en-disclaimer">{englishDisclaimer}</p>
      </div>
    </footer>
  );
}
