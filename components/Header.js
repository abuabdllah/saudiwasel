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
        <nav className="container" aria-label="القائمة الرئيسية" style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", alignItems: "center", paddingBottom: 12 }}>
          <details>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>الشركات</summary>
            <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 }}>
              <li><a href="/stc">فايبر stc</a></li>
              <li><a href="/salam">فايبر سلام</a></li>
              <li><a href="/mobily">فايبر موبايلي</a></li>
            </ul>
          </details>
          <a href="/fiber-installation">تركيب ألياف بصرية</a>
        </nav>
      </header>
      <FloatingWhatsApp />
    </>
  );
}
