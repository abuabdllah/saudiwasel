import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="logo">سعودي <span>واصل</span></a>
          <div className="header-actions">
            <LanguageSwitcher />
            <a href="tel:0564612017" className="btn btn-call">📞 اتصل الآن</a>
            <a href="https://wa.me/966564612017" className="btn btn-wa">واتساب</a>
          </div>
        </div>
      </header>
      <a href="https://wa.me/966564612017" className="wa-float" aria-label="واتساب">💬</a>
    </>
  );
}
