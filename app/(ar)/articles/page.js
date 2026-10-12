import { pageMetadata } from "../../../lib/seo";
import PageSchema from "../../../components/PageSchema";
const articles = [
  { slug: "salam-fiber-coverage", title: "كيف تعرف تغطية فايبر سلام في حيك", excerpt: "خطوات فحص عنوان المبنى عبر القنوات الرسمية ولوحة الألياف، والبدائل عند عدم توفر الخدمة." },
  { slug: "stc-fiber-coverage", title: "كيف تعرف تغطية فايبر STC وخريطة الألياف", excerpt: "كيف تستخدم خريطة الألياف وتراجع موقع المبنى قبل الطلب، ومتى تفحص بديل 5G." },
  { slug: "mobily-fiber-coverage", title: "كيف تعرف تغطية فايبر موبايلي", excerpt: "دليل مبسط للتحقق من تغطية موبايلي على عنوانك وفهم نتيجة الفحص وتجهيز البيانات." },
  { slug: "stc-fiber-request", title: "طريقة طلب الياف بصرية STC خطوة بخطوة", excerpt: "من فحص التغطية وتجهيز بيانات العنوان إلى متابعة موعد التركيب والتفعيل." },
  { slug: "check-fiber-coverage", title: "كيف أعرف إن الفايبر متوفر في عنواني؟", excerpt: "طريقة عملية لفحص المبنى وفهم نتيجة التغطية قبل اختيار المشغل." },
  { slug: "mandoob-vs-technician", title: "الفرق بين مندوب الألياف البصرية وفني التركيب", excerpt: "اعرف دور كل شخص، ومتى تتواصل مع المندوب ومتى تحتاج الفني." },
];

export const metadata = pageMetadata({
  title: "مقالات الألياف البصرية والفايبر في السعودية - سعودي واصل",
  description: "أدلة مبسطة عن طلب الألياف البصرية، فحص تغطية الفايبر، ودور مندوب الألياف وفني التركيب في السعودية.",
  alternates: { canonical: "/articles" },
});

export default function ArticlesPage() {
  return <main>
      <PageSchema metadata={metadata} />
    <section className="container articles-hero">
      <p className="article-kicker">دليل سعودي واصل</p>
      <h1>مقالات الألياف البصرية</h1>
      <p className="articles-lead">معلومات عملية وبسيطة تساعدك تفحص التغطية، تفهم خطوات الطلب، وتعرف مين تتواصل معه في كل مرحلة.</p>
    </section>
    <section className="container article-grid">
      {articles.map((article) => <a className="article-card" href={`/articles/${article.slug}`} key={article.slug}>
        <h2>{article.title}</h2><p>{article.excerpt}</p>
      </a>)}
    </section>
  </main>;
}
