import LanguageSwitcher from "./LanguageSwitcher";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="logo">سعودي <span>واصل</span></a>
          <div className="header-actions">
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <FloatingWhatsApp />
    </>
  );
}
