import { pageMetadata } from "../../../lib/seo";
import PageSchema from "../../../components/PageSchema";
const articles = [
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
