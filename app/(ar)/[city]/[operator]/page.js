import { operatorIntroduction, localDistricts, operatorFaqs, operatorFacts, operatorAbout } from "../../../../lib/local-content";
import IntentCtas from "../../../../components/IntentCtas";
import PricesTable from "../../../../components/PricesTable";
import CityNextSteps from "../../../../components/CityNextSteps";
import OperatorSources from "../../../../components/OperatorSources";
import { pageMetadata } from "../../../../lib/seo";
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
import { getNeighborhood, publishedNeighborhoods } from "../../../../lib/neighborhoods";
import NeighborhoodPage from "../../../../components/NeighborhoodPage";
import { jeddahOperatorAdvice } from "../../../../lib/jeddah";

const PHONE_LOCAL = "0564612017";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...operatorCities.flatMap((city) => operators.map((o) => ({ city, operator: o.slug }))), ...publishedNeighborhoods().map((page) => ({ city: page.city, operator: page.slug }))];
}

function getData(city, operator) {
  return {
    c: cities.find((x) => x.slug === city),
    o: operators.find((x) => x.slug === operator),
  };
}

export async function generateMetadata({ params }) {
  const { city, operator } = await params;
  const neighborhood = getNeighborhood(city, operator);
  if (neighborhood) {
    const cityName = cities.find((entry) => entry.slug === city)?.name;
    return pageMetadata({ title: `فايبر حي ${neighborhood.name} ${cityName} | فحص تغطية الألياف البصرية`, description: neighborhood.description }, `/${city}/${operator}`);
  }
  const { c, o } = getData(city, operator);
  if (!c || !o) return {};
  const title = `فايبر ${o.name} ${c.name} | فحص التغطية وطلب الألياف البصرية`;
  const titleTestPaths = ["jeddah/mobily", "jeddah/salam", "makkah/stc", "makkah/salam", "dammam/stc"];
  const correctedTitle = titleTestPaths.includes(`${city}/${operator}`)
    ? `رقم مندوب فايبر ${o.name} ${c.name} ${PHONE_LOCAL}`
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
  return pageMetadata({
    title: correctedTitle,
    description,
    openGraph: { title: correctedTitle, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title: correctedTitle, description, images: ["/twitter-image.png"] },
    alternates: { canonical: `/${c.slug}/${o.slug}`, languages: languageAlternates(`/${c.slug}/${o.slug}`) },
  });
}

export default async function OperatorPage({ params }) {
  const { city, operator } = await params;
  const neighborhood = getNeighborhood(city, operator);
  if (neighborhood) return <NeighborhoodPage page={neighborhood} />;
  const { c, o } = getData(city, operator);
  if (!c || !o) notFound();
  if (c.slug === "riyadh") return <RiyadhOperatorPage operator={o} />;
  if (c.slug === "makkah") return <MakkahOperatorPage operator={o} />;
  if (["madinah", "taif"].includes(c.slug)) return <HijazOperatorPage city={c.slug} operator={o} />;
  if (["dammam", "khobar"].includes(c.slug)) return <EasternOperatorPage city={c.slug} operator={o} />;
  if (regionalSlugs.includes(c.slug)) return <RegionalOperatorPage city={c.slug} operator={o} />;
  const others = operators.filter((x) => x.slug !== o.slug);
  const addressAdvice = c.slug === "jeddah" ? jeddahOperatorAdvice[o.slug] : null;

  const faqs = operatorFaqs(c.slug, o.slug);

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
            <h1>فايبر {o.name} {c.name} وفحص التغطية</h1>
            <p className="hero-sub">{operatorIntroduction(c.slug, o.slug)}</p>
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
        <p className="notice">موقع مستقل وغير تابع لأي مشغل. للاستفسار عن ألياف {o.name} بمدينة {c.name}، نرتب التحقق من الوحدة ثم نتابع الطلب بعد مراجعة تفاصيله.</p>

        <h2>رقم مندوب فايبر {o.name} {c.name}</h2>
        <div className="contact-box">
          <p>{c.slug === "jeddah" && o.slug === "stc"
            ? `للتواصل مع مندوب فايبر STC في جدة والاستفسار عن التغطية وإمكانية تركيب الألياف البصرية، يمكنك الاتصال على ${PHONE_LOCAL} أو التواصل معنا عبر واتساب. نتحقق من توفر الخدمة على عنوانك ونساعدك في متابعة طلب الاشتراك والتركيب والتفعيل.`
            : c.slug === "jeddah" && o.slug === "mobily"
              ? "للتواصل مع مندوب فايبر موبايلي في جدة والاستفسار عن توفر الألياف البصرية، يمكنك التواصل معنا عبر الهاتف أو واتساب. نساعدك في التحقق من التغطية على عنوانك ومعرفة إمكانية الاشتراك والتركيب حسب توفر الخدمة."
              : `للاستفسار عن تغطية وباقات فايبر ${o.name} في ${c.name}، تواصل مع المندوب مباشرة:`}</p>
        </div>

        <h2>خيارات باقات فايبر {o.name}</h2>
        <OperatorSources operator={o.slug} />
        <PricesTable operator={o.slug} service="fiber" context={`فايبر ${o.name} في ${c.name}`} />

        <IntentCtas city={c.slug} operator={o.slug} />

        <h2>معلومات مهمة قبل تركيب فايبر {o.name}</h2>
        <ul className="req-list">
          {operatorFacts(c.slug, o.slug).map((fact) => <li key={fact}>{fact}</li>)}
        </ul>

        <h2>لماذا تطلب فايبر {o.name} عن طريق مندوب؟</h2>
        <div className="steps">
          <div className="card"><h4>رد سريع</h4><p>للاستفسار عن {o.name} في {c.name}، أرسل رسالة واتساب توضح عنوانك والخطوة التي تحتاج المساعدة فيها.</p></div>
          <div className="card"><h4>شرح واضح</h4><p>نقارن معك تكلفة باقات {o.name} لمسكن {c.name} ومدة الالتزام، مع بقاء الاختيار النهائي بيدك.</p></div>
          <div className="card"><h4>متابعة الطلب</h4><p>لمتابعة تركيب {o.name} في {c.name}، نساعد في معرفة حالة الطلب ومتطلبات تنسيق الزيارة دون تحديد موعد مضمون.</p></div>
          <div className="card"><h4>مقارنة المشغلين</h4><p>إذا أمكن طلب أكثر من خدمة لعقار {c.name}، ضع عرض {o.name} بجانب البدائل المتاحة واقرأ شروط كل منها.</p></div>
        </div>

        <h2>عن فايبر {o.name}</h2>
        <p>{operatorAbout(c.slug, o.slug)}</p>

        <h2>فايبر {o.name} في {c.name}</h2>
        <p>{addressAdvice ? addressAdvice.introduction : c.intro}</p>
        {addressAdvice && <><h3>{addressAdvice.title}</h3><p>{addressAdvice.advice}</p></>}
        <p>يتطلب توفر {o.name} بالألياف البصرية في {c.name} التحقق من المبنى المحدد ولا يمكن تعميم النتيجة على الحي، لذلك أول خطوة دائماً هي فحص عنوانك. لفحص ألياف {o.name} في {c.name}، شارك الحي ورابط مدخل العقار حتى نرتب مراجعة عنوانه.</p>

        {c.slug !== "jeddah" && <>
          <h2>مندوب فايبر {o.name} في أحياء {c.name}</h2>
          <div className="cities">
            {c.districts.map((d) => <span key={d}>فايبر {o.name} حي {d}</span>)}
          </div>
        </>}

        {c.slug === "jeddah" && <><h2>مندوب فايبر {o.name} في أحياء جدة</h2><div className="card faq">{localDistricts("jeddah", o.slug).map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div></>}

        <h2>خطوات طلب فايبر {o.name} عن طريق المندوب</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>أرسل عنوانك</h4><p>حدد في طلب {o.name} بمدينة {c.name} موقع الوحدة والحي عبر النموذج أو رسالة واتساب.</p></div>
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
        <p>عند تعدد خدمات عقار {c.name}، نقارن عرض {o.name} بخياراته الأخرى من حيث الرفع والتكلفة والالتزام، ثم تختار وفق استخدام الأسرة.</p>
        <div className="cities">
          {others.map((x) => (
            <a key={x.slug} href={`/${c.slug}/${x.slug}`}>مندوب فايبر {x.name} {c.name}</a>
          ))}
          {c.slug === "jeddah" && <a href="/jeddah/zain">مندوب زين جدة</a>}
          {c.slug === "jeddah" && <a href="/jeddah/5g">مندوب راوتر 5G جدة</a>}
          <a href={`/${c.slug}`}>كل خيارات الفايبر في {c.name}</a>
        </div>

        <h2>مبناك غير مغطى بفايبر {o.name}؟</h2>
        <p>عند غياب ألياف {o.name} عن مسكن {c.name}، راجع خيار 5G وإشارة الغرفة وتكلفة الجهاز قبل اعتماد بديل دون تمديدات. <a href={`/5g/${o.slug}`}>راوتر 5G {o.name}</a> أو <a href="/fiber-vs-5g">قارن بين الفايبر و5G</a>.</p>

        <h2>أسئلة شائعة عن مندوب فايبر {o.name} في {c.name}</h2>
        <div className="card faq">
          {faqs.map((f) => (
            <div key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>
          ))}
        </div>

        <JsonLd data={schemas} />
      </section>
    <CityNextSteps city={c.slug} operator={o.slug} />
    </main>
  );
}
