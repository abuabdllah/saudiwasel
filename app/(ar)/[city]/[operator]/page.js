import { notFound } from "next/navigation";
import { cities } from "../../../../lib/cities";
import { operators, operatorCities } from "../../../../lib/operators";
import LeadForm from "../../../../components/LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "../../../../components/JsonLd";
import { RiyadhOperatorPage } from "../../../../components/RiyadhPages";
import { MakkahOperatorPage } from "../../../../components/MakkahPages";
import { EasternOperatorPage } from "../../../../components/EasternPages";
import { HijazOperatorPage } from "../../../../components/HijazPages";
import { RegionalOperatorPage } from "../../../../components/RegionalPages";
import { regionalSlugs } from "../../../../lib/regional";
import { languageAlternates } from "../../../../lib/languages";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export const dynamicParams = false;

export function generateStaticParams() {
  return operatorCities.flatMap((city) => operators.map((o) => ({ city, operator: o.slug })));
}

function getData(city, operator) {
  return {
    c: cities.find((x) => x.slug === city),
    o: operators.find((x) => x.slug === operator),
  };
}

export async function generateMetadata({ params }) {
  const { city, operator } = await params;
  const { c, o } = getData(city, operator);
  if (!c || !o) return {};
  const title = c.slug === "jeddah"
    ? `رقم مندوب فايبر ${o.name} جدة | أسعار باقات 2026`
    : `رقم مندوب فايبر ${o.name} ${c.name} | باقات 2026`;
  const correctedTitle = ["riyadh", "makkah", "madinah", "taif", "dammam", "khobar", ...regionalSlugs].includes(c.slug)
    ? `رقم مندوب فايبر ${o.name} ${c.slug === "makkah" ? "مكة" : c.name} | أسعار باقات 2026`
    : title;
  const hijazDescriptions = {
    madinah: {
      stc: "رقم مندوب فايبر STC المدينة المنورة لفحص الشقق والمنازل، مراجعة أسعار الباقات، ومقارنة الألياف بخيار 5G.",
      mobily: "رقم مندوب فايبر موبايلي المدينة المنورة للتحقق من المبنى ومراجعة الباقات للسكن الدائم أو المستأجر عبر واتساب.",
      salam: "رقم مندوب فايبر سلام المدينة المنورة لفحص العنوان واختيار اتصال مناسب للشقة أو البيت ومتابعة طلب التركيب.",
      zain: "رقم مندوب فايبر زين المدينة المنورة لمراجعة توفر الخدمة والباقات في المبنى ومقارنة الفايبر براوتر 5G.",
    },
    taif: {
      stc: "رقم مندوب فايبر STC الطائف لفحص الفيلا أو الشقة ومراجعة أسعار الباقات للسكن الدائم أو الموسمي.",
      mobily: "رقم مندوب فايبر موبايلي الطائف للتحقق من العقار ومقارنة الفايبر و5G للمنزل الصيفي أو السكن المستمر.",
      salam: "رقم مندوب فايبر سلام الطائف لفحص المنزل أو الاستراحة ومراجعة الباقة قبل متابعة طلب تركيب الألياف.",
      zain: "رقم مندوب فايبر زين الطائف لمراجعة الخدمة على العنوان واختيار الإنترنت للفيلا أو المسكن المستخدم موسمياً.",
    },
  };
  const regionalDescriptions = {
    abha: {
      stc: "رقم مندوب فايبر STC أبها لفحص السكن الدائم أو الصيفي ومقارنة الألياف بخدمة 5G على العنوان.",
      salam: "رقم مندوب فايبر سلام أبها لمراجعة المنزل الجبلي أو الموسمي واختيار الفايبر أو 5G بعد الفحص.",
      mobily: "رقم مندوب فايبر موبايلي أبها لفحص الفيلا أو الشقة ومقارنة هوم فايبر براوتر 5G قبل الطلب.",
    },
    tabuk: {
      stc: "رقم مندوب فايبر STC تبوك لفحص منزل الموظف أو الأسرة ومراجعة الخدمة في المخططات الحديثة.",
      salam: "رقم مندوب فايبر سلام تبوك للتحقق من الشقق والفلل الجديدة ومقارنة الألياف براوتر 5G.",
      mobily: "رقم مندوب فايبر موبايلي تبوك لفحص العقار في الأحياء والمخططات ومراجعة هوم فايبر و5G.",
    },
    buraidah: {
      stc: "رقم مندوب فايبر STC بريدة لفحص الفيلا العائلية وتحديد خيار الألياف أو 5G حسب العنوان.",
      salam: "رقم مندوب فايبر سلام بريدة لمراجعة المنازل الواسعة والمخططات الجديدة قبل طلب التركيب.",
      mobily: "رقم مندوب فايبر موبايلي بريدة لفحص البيت متعدد الغرف ومقارنة هوم فايبر بهوم 5G.",
    },
    hail: {
      stc: "رقم مندوب فايبر STC حائل لفحص الفلل والمساكن العائلية ومقارنة الألياف بخدمة 5G.",
      salam: "رقم مندوب فايبر سلام حائل للتحقق من المنزل الدائم ومراجعة خيار التمديد أو الراوتر المتنقل.",
      mobily: "رقم مندوب فايبر موبايلي حائل لفحص الفيلا وتخطيط الاتصال بين الغرف قبل الاشتراك.",
    },
    jazan: {
      stc: "رقم مندوب فايبر STC جازان لفحص الشقق والفلل والسكن المؤقت ومقارنة الخدمة براوتر 5G.",
      salam: "رقم مندوب فايبر سلام جازان لمراجعة العمارة أو المنزل واختيار اتصال يناسب مدة الإقامة.",
      mobily: "رقم مندوب فايبر موبايلي جازان لفحص الوحدة السكنية ومقارنة هوم فايبر بهوم 5G قبل الطلب.",
    },
  };
  const description = regionalDescriptions[c.slug]?.[o.slug] || hijazDescriptions[c.slug]?.[o.slug] || (c.slug === "makkah"
    ? `رقم مندوب فايبر ${o.name} مكة لفحص المبنى، مراجعة الباقات، ومتابعة طلب التركيب للسكن الدائم أو المستأجر.`
    : c.slug === "riyadh"
      ? `رقم مندوب فايبر ${o.name} الرياض لفحص عنوان المبنى، مراجعة الباقات، ورفع طلب الألياف ومتابعة التركيب عبر الاتصال أو واتساب.`
      : c.slug === "dammam"
        ? `رقم مندوب فايبر ${o.name} الدمام لفحص المبنى، مراجعة باقات 2026، ومتابعة تركيب الألياف عبر الاتصال أو واتساب.`
        : c.slug === "khobar"
          ? `رقم مندوب فايبر ${o.name} الخبر للتحقق من الشقة أو المجمع، مقارنة الباقات، ومتابعة طلب التركيب عبر واتساب.`
          : `رقم مندوب فايبر ${o.name} في ${c.name} لفحص التغطية، معرفة الباقات المتاحة، ورفع طلب التركيب ومتابعته حتى التفعيل عبر واتساب.`);
  return {
    title: correctedTitle,
    description,
    openGraph: { title: correctedTitle, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title: correctedTitle, description, images: ["/twitter-image.png"] },
    alternates: { canonical: `/${c.slug}/${o.slug}`, languages: languageAlternates(`/${c.slug}/${o.slug}`) },
  };
}

export default async function OperatorPage({ params }) {
  const { city, operator } = await params;
  const { c, o } = getData(city, operator);
  if (!c || !o) notFound();
  if (c.slug === "riyadh") return <RiyadhOperatorPage operator={o} />;
  if (c.slug === "makkah") return <MakkahOperatorPage operator={o} />;
  if (["madinah", "taif"].includes(c.slug)) return <HijazOperatorPage city={c.slug} operator={o} />;
  if (["dammam", "khobar"].includes(c.slug)) return <EasternOperatorPage city={c.slug} operator={o} />;
  if (regionalSlugs.includes(c.slug)) return <RegionalOperatorPage city={c.slug} operator={o} />;
  const others = operators.filter((x) => x.slug !== o.slug);

  const faqs = [
    { q: `كيف أتواصل مع مندوب فايبر ${o.name} في ${c.name}؟`, a: `تواصل معنا عبر واتساب أو اتصل على ${PHONE_LOCAL}، أو عبّي النموذج في أعلى الصفحة وسنرد عليك بأسرع وقت.` },
    { q: "هل الطلب عن طريق المندوب عليه رسوم إضافية؟", a: "لا، خدمتنا بدون أي رسوم إضافية عليك." },
    { q: `هل فايبر ${o.name} متوفر في حيي في ${c.name}؟`, a: `تختلف التغطية من حي إلى آخر ومن مبنى إلى آخر. أرسل اسم حيك وموقع مبناك لنتحقق من توفر فايبر ${o.name} تحديداً.` },
    { q: "هل يوجد رسوم تركيب؟", a: `التركيب والراوتر مجاناً في أغلب باقات ${o.name} الحالية، ونوضح لك أي تفاصيل قبل رفع الطلب.` },
    { q: `هل أقدر أنتقل من مشغل آخر إلى ${o.name}؟`, a: `نعم إذا كان مبناك مغطى من ${o.name}. ننصحك تتأكد من أي التزام أو مدة عقد على اشتراكك الحالي قبل الانتقال.` },
    { q: "كم يستغرق التركيب؟", a: "يختلف حسب جاهزية المبنى ومواعيد الفنيين، ونتابع معك الطلب خطوة بخطوة حتى التفعيل." },
  ];

  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: c.name, path: `/${c.slug}` }, { name: o.name, path: `/${c.slug}/${o.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${o.name} ${c.name}`, serviceType: "تركيب الألياف البصرية", city: c.name, path: `/${c.slug}/${o.slug}` }),
    faqSchema(faqs),
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>{o.slug === "salam" && c.slug === "jeddah" ? "مندوب فايبر سلام جدة" : `مندوب فايبر ${o.name} في ${c.name}`}</h1>
            <p className="hero-sub">تركيب ألياف {o.name} البصرية في {c.name}: نفحص تغطية مبناك مجاناً، نشرح لك الباقات، ونرفع طلبك ونتابعه حتى التفعيل.</p>
            <ul className="hero-points">
              <li>✔ تواصل مباشر مع المندوب واتساب</li>
              <li>✔ فحص تغطية {o.name} مجاناً</li>
              <li>✔ بدون رسوم إضافية على خدمتنا</li>
            </ul>
          </div>
          <LeadForm defaultCity={c.name} operator={o.name} />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لـ{o.name}. نساعدك كمندوب مبيعات في فحص التغطية ورفع طلب الاشتراك ومتابعته.</p>

        <h2>رقم مندوب فايبر {o.name} {c.name}</h2>
        <div className="contact-box">
          <p>للاستفسار عن تغطية وباقات فايبر {o.name} في {c.name}، تواصل مع المندوب مباشرة:</p>
          <div className="header-actions">
            <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>أسعار باقات فايبر {o.name} (آخر تحديث: {o.updated})</h2>
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead>
            <tbody>
              {o.packages.map((p) => (
                <tr key={p.name}><td>{p.name}</td><td>{p.down}</td><td>{p.up}</td><td>{p.price}</td><td>{p.perks}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{o.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي قبل الاشتراك.</p>

        <div className="contact-box">
          <h3>تأكيد أسعار باقات {o.name}</h3>
          <p>تتغير الأسعار والعروض من وقت إلى آخر، وقد تتوفر خصومات للأشهر الأولى. راسلنا عبر واتساب لتأكيد أحدث سعر وعرض متاح لعنوانك.</p>
          <div className="header-actions">
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>معلومات مهمة قبل تركيب فايبر {o.name}</h2>
        <ul className="req-list">
          {o.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>

        <h2>لماذا تطلب فايبر {o.name} عن طريق مندوب؟</h2>
        <div className="steps">
          <div className="card"><h4>رد سريع</h4><p>بدل الانتظار في خدمة العملاء، تتواصل مع مندوب يرد عليك واتساب مباشرة.</p></div>
          <div className="card"><h4>شرح واضح</h4><p>نشرح لك الباقات والفروق بينها ونرشح لك الأنسب لاستخدامك.</p></div>
          <div className="card"><h4>متابعة الطلب</h4><p>نتابع طلبك مع الفنيين حتى يتم التركيب، وتسألنا في أي وقت عن الحالة.</p></div>
          <div className="card"><h4>مقارنة المشغلين</h4><p>إذا كان مبناك مغطى من أكثر من مشغل، نوضح لك الفرق قبل أن تقرر.</p></div>
        </div>

        <h2>عن فايبر {o.name}</h2>
        <p>{o.about}</p>

        <h2>فايبر {o.name} في {c.name}</h2>
        <p>{c.intro}</p>
        <p>تغطية {o.name} بالألياف البصرية في {c.name} ممتدة في أحياء كثيرة لكنها تختلف من مبنى لآخر، لذلك أول خطوة دائماً هي فحص عنوانك. أرسل اسم حيك وموقع مبناك ونرد عليك بالنتيجة والخيارات المتاحة.</p>

        {c.slug !== "jeddah" && <>
          <h2>مندوب فايبر {o.name} في أحياء {c.name}</h2>
          <div className="cities">
            {c.districts.map((d) => <span key={d}>فايبر {o.name} حي {d}</span>)}
          </div>
        </>}

        {c.slug === "jeddah" && o.slug === "stc" && (
          <>
            <h2>فايبر STC في أحياء جدة</h2>
            <div className="card faq">
              <div><h3>حي الروضة</h3><p>يقع حي الروضة في وسط جدة، ويضم فللاً وعمائر سكنية متنوعة. أرسل موقع المبنى لفحص التغطية المتاحة على عنوانك.</p></div>
              <div><h3>حي الصفا</h3><p>يمتد حي الصفا في شرق جدة وتتنوع مساكنه بين العمائر والفلل. شاركنا موقعك للتحقق من التغطية في المبنى.</p></div>
              <div><h3>حي الحمدانية</h3><p>الحمدانية من أحياء شمال شرق جدة، وتضم مخططات سكنية حديثة وفللاً. تواصل معنا لفحص التغطية حسب عنوانك.</p></div>
              <div><h3>حي أبحر الشمالية</h3><p>تقع أبحر الشمالية في شمال جدة وتشتهر بالفلل والمخططات الجديدة. أرسل موقع المنزل لنتحقق من خيارات التغطية.</p></div>
              <div><h3>حي السلامة</h3><p>حي السلامة قريب من المحاور الرئيسية في شمال وسط جدة، ويجمع بين العمائر والفلل. اطلب فحص التغطية لمبناك قبل الاشتراك.</p></div>
            </div>
          </>
        )}

        <h2>خطوات طلب فايبر {o.name} عن طريق المندوب</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>أرسل عنوانك</h4><p>المدينة والحي وموقع المبنى عبر النموذج أو واتساب.</p></div>
          <div className="card"><span>2</span><h4>فحص التغطية</h4><p>نتحقق من توفر فايبر {o.name} في مبناك.</p></div>
          <div className="card"><span>3</span><h4>اختيار الباقة</h4><p>نرسل لك الباقات والعروض المتاحة وتختار الأنسب.</p></div>
          <div className="card"><span>4</span><h4>التركيب</h4><p>نرفع الطلب ونتابعه معك حتى التركيب والتفعيل.</p></div>
        </div>

        <h2>ماذا تحتاج للطلب؟</h2>
        <ul className="req-list">
          <li>الهوية الوطنية أو الإقامة سارية المفعول</li>
          <li>العنوان الوطني أو موقع المبنى على الخريطة</li>
          <li>رقم جوال للتواصل وتنسيق موعد التركيب</li>
        </ul>

        <h2>{o.name} أو {others.map((x) => x.name).join(" أو ")}؟</h2>
        <p>إذا كان مبناك مغطى من أكثر من مشغل، نقارن لك بين الباقات المتاحة من حيث السرعة والمميزات ومدة الالتزام، وتختار الأنسب لاستخدامك.</p>
        <div className="cities">
          {others.map((x) => (
            <a key={x.slug} href={`/${c.slug}/${x.slug}`}>مندوب فايبر {x.name} {c.name}</a>
          ))}
          {c.slug === "jeddah" && <a href="/jeddah/zain">مندوب زين جدة</a>}
          {c.slug === "jeddah" && <a href="/jeddah/5g">مندوب راوتر 5G جدة</a>}
          <a href={`/${c.slug}`}>كل خيارات الفايبر في {c.name}</a>
        </div>

        <h2>مبناك غير مغطى بفايبر {o.name}؟</h2>
        <p>جرّب راوتر 5G: يصلك دون تمديدات، والراوتر مجاني مع الاشتراك. <a href={`/5g/${o.slug}`}>راوتر 5G {o.name}</a> أو <a href="/fiber-vs-5g">قارن بين الفايبر و5G</a>.</p>

        <h2>أسئلة شائعة عن مندوب فايبر {o.name} في {c.name}</h2>
        <div className="card faq">
          {faqs.map((f) => (
            <div key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>
          ))}
        </div>

        <JsonLd data={schemas} />
      </section>
    </main>
  );
}
