export default function ArticleCta({ text = "أرسل موقعك ونساعدك في فحص التغطية ومعرفة الخيارات المتاحة.", showCall = false }) {
  return <aside className="article-cta">
    <h2>تحتاج مساعدة في طلب الفايبر؟</h2>
    <p>{text}</p>
    <a className="btn btn-coverage" href="/coverage">افحص تغطية الفايبر</a>{" "}
    <a className="btn btn-wa" href="https://wa.me/966564612017">راسلنا واتساب</a>
    {showCall && <> {" "}<a className="btn btn-call" href="tel:0564612017">اتصل الآن</a></>}
  </aside>;
}
