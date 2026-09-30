import LeadForm from "../../../components/LeadForm";
import IntentCtas from "../../../components/IntentCtas";
import JsonLd, { breadcrumbSchema, faqSchema } from "../../../components/JsonLd";
import { pageMetadata } from "../../../lib/seo";
import { cities } from "../../../lib/cities";

export const metadata = pageMetadata({
  title: "فحص تغطية الفايبر و5G في السعودية | SaudiWasel",
  description: "اختر المدينة والحي والمشغل لطلب التحقق من تغطية الفايبر أو 5G على عنوان المبنى. سجل بيانات التواصل أو تابع عبر واتساب دون تأكيد تغطية غير موثوق.",
}, "/coverage");

const faqs = [
  { q: "هل تعطي الأداة نتيجة تغطية مباشرة؟", a: "لا. النموذج يجمع موقعك وتفضيلاتك لطلب مراجعة العنوان. لا توجد هنا وصلة آلية بخرائط المشغلين، ولا نعطي تأكيدًا قبل التحقق من المبنى." },
  { q: "لماذا لا يكفي اختيار المدينة والحي؟", a: "قد تصل الألياف إلى مبنى دون المبنى المجاور. يلزم موقع المبنى أو العنوان الوطني في مرحلة المتابعة لتأكيد إمكانية الخدمة." },
  { q: "هل أحتاج صورة هوية في مرحلة الفحص؟", a: "لا ترسل هوية أو رموز تحقق عبر نموذج فحص التغطية. يكفي الموقع المبدئي ورقم التواصل، وتُستكمل متطلبات الاشتراك عبر قناة المشغل الموثوقة عند الحاجة." },
  { q: "ماذا يحدث إذا لم يتوفر الفايبر؟", a: "نراجع مشغلًا آخر إن أمكن، أو تقارن خيارات 5G حسب الإشارة في المنزل وشروط الباقة. لا يوجد ضمان بأن الفايبر أو 5G متوفر على كل عنوان." },
];

export default async function CoveragePage({ searchParams }) {
  const query = await searchParams;
  const city = typeof query.city === "string" ? query.city : "";
  const operator = typeof query.operator === "string" && ["stc", "salam", "mobily", "zain"].includes(query.operator) ? query.operator : "";
  return <main>
    <section className="hero"><div className="container hero-grid">
      <div><h1>فحص تغطية الفايبر و5G حسب عنوانك</h1><p className="hero-sub">ابدأ بالمدينة والحي، ثم حدد مشغلك أو اطلب مقارنة المتاح. بعدها شارك بيانات التواصل عند الحاجة لمراجعة المبنى ومتابعة الطلب.</p>
        <p className="notice">SaudiWasel منصة مستقلة وليست الموقع الرسمي لأي مشغل. الطلب لا يعني تأكيد التغطية أو إتمام الاشتراك.</p>
        <a href="/articles/check-fiber-coverage">اقرأ خطوات التحقق من العنوان</a>
      </div><LeadForm defaultCity={city} operator={operator} intent={query.intent === "order" ? "order" : "coverage"} />
    </div></section>
    <section className="container"><h2>كيف تتم مراجعة التغطية؟</h2><div className="steps">
      <div className="card"><h3>حدد موقعك</h3><p>اختر المدينة واكتب الحي. اقتراحات الأحياء ليست إعلانًا بتوفر التغطية.</p></div>
      <div className="card"><h3>تحقق من المبنى</h3><p>عند التواصل، أرسل موقع المبنى الدقيق لمراجعته عبر قنوات المشغل المناسبة.</p></div>
      <div className="card"><h3>قارن قبل الاشتراك</h3><p>راجع سعر الباقة الحالي وتكلفة الجهاز والتركيب والالتزام في مصدر المشغل الرسمي.</p></div>
      <div className="card"><h3>تابع طلبك</h3><p>احتفظ بمرجع الطلب وتواصل عبر واتساب. موعد التركيب والتفعيل يحدده المشغل بعد قبول الطلب.</p></div>
    </div><h2>اختر صفحة مدينتك</h2><div className="cities">{cities.map((entry) => <a key={entry.slug} href={`/${entry.slug}`}>{entry.name}</a>)}</div>
      <h2>إذا لم يتوفر الفايبر</h2><p>تأكد أولًا من دقة العنوان، ثم راجع <a href="/5g">خيارات 5G</a> و<a href="/fiber-vs-5g">مقارنة Fiber و5G</a>. جودة الاتصال اللاسلكي تعتمد على الإشارة داخل المنزل وليست على اسم الحي وحده.</p>
      <h2>أسئلة عن فحص العنوان</h2><div className="card faq">{faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</div><IntentCtas />
      <JsonLd data={[breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "فحص التغطية", path: "/coverage" }]), faqSchema(faqs), { "@type": "WebPage", name: "فحص تغطية الفايبر و5G", url: "https://saudiwasel.com/coverage", inLanguage: "ar-SA" }]} />
    </section>
  </main>;
}
