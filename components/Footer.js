import IntentCtas from "./IntentCtas";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h2>ابدأ من عنوانك، ثم اختر الخدمة</h2>
        <IntentCtas />
        <nav className="footer-links" aria-label="روابط الفايبر">
          <a href="/coverage">افحص تغطية الفايبر</a>
          <a href="/">تركيب فايبر</a>
          <a href="/jeddah">فايبر جدة</a>
          <a href="/riyadh">فايبر الرياض</a>
          <a href="/jeddah/stc">فايبر STC جدة</a>
          <a href="/jeddah/salam">فايبر سلام جدة</a>
          <a href="/jeddah/mobily">فايبر موبايلي جدة</a>
          <a href="/jeddah/zain">مندوب زين جدة</a>
          <a href="/jeddah/5g">مندوب راوتر 5G جدة</a>
          <a href="/fiber-vs-5g">فايبر ولا 5G؟</a>
          <a href="/articles">مقالات</a>
        </nav>
        <nav className="footer-links" aria-label="روابط راوتر 5G">
          <a href="/5g">مندوب راوتر 5G</a>
          <a href="/5g/stc">راوتر 5G STC</a>
          <a href="/5g/salam">راوتر 5G سلام</a>
          <a href="/5g/zain">راوتر 5G زين</a>
          <a href="/5g/mobily">راوتر 5G موبايلي</a>
        </nav>
        <strong>سعودي واصل</strong> — منصة مستقلة لفحص خيارات الفايبر و5G حسب عنوانك
        <p className="disclaimer">
          موقع مستقل وغير تابع لأي مشغل اتصالات. الأسماء والعلامات التجارية
          مملوكة لأصحابها وتُذكر لأغراض التعريف بالخدمات فقط.
        </p>
        <nav className="footer-legal">
          <a href="/about">من نحن</a>
          <a href="/contact">تواصل معنا</a>
          <a href="/privacy">سياسة الخصوصية</a>
        </nav>
      </div>
    </footer>
  );
}
