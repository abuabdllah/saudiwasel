export default function ArticleCta({ text = "أرسل موقعك ونساعدك في فحص التغطية ومعرفة الخيارات المتاحة." }) {
  return <aside className="article-cta">
    <h2>تحتاج مساعدة في طلب الفايبر؟</h2>
    <p>{text}</p>
    <a className="btn btn-wa" href="https://wa.me/966564612017">راسلنا واتساب</a>
  </aside>;
}
