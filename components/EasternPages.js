import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { cities } from "../lib/cities";
import { operators } from "../lib/operators";
import { easternCities, getEasternDistricts, getEasternFaqs } from "../lib/eastern";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

function ContactBox({ text }) {
  return (
    <div className="contact-box">
      <p>{text}</p>
      <div className="header-actions">
        <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
        <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
      </div>
    </div>
  );
}

function Intro({ data }) {
  return data.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function Choice({ data, operator }) {
  return (
    <>
      <h2>فايبر أو 5G في {data.name}؟</h2>
      <p>{data.choice} راجع <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>، أو تصفح خيارات <a href="/5g">راوتر 5G</a>{operator && <> و<a href={`/5g/${operator.slug}`}>5G {operator.name}</a></>}.</p>
    </>
  );
}

function InternalLinks({ city, currentOperator }) {
  const data = easternCities[city];
  return (
    <div className="cities">
      {operators.filter((operator) => operator.slug !== currentOperator?.slug).map((operator) => (
        <a key={operator.slug} href={`/${city}/${operator.slug}`}>مندوب فايبر {operator.name} {data.name}</a>
      ))}
      <a href={`/${city}`}>مندوب فايبر {data.name}</a>
      <a href={`/${data.other.slug}`}>مندوب فايبر {data.other.name}</a>
    </div>
  );
}

export function EasternCityPage({ city }) {
  const data = easternCities[city];
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: data.name, path: `/${city}` }]),
    serviceSchema({ name: `مندوب فايبر ${data.name}`, serviceType: "تركيب الألياف البصرية", city: data.name, path: `/${city}` }),
    faqSchema(data.faqs),
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب فايبر {data.name} وتركيب الألياف البصرية</h1>
            <p className="hero-sub">افحص عنوانك وقارن خيارات الفايبر وراوتر 5G قبل تقديم طلب الإنترنت المنزلي.</p>
            <ul className="hero-points"><li>✔ فحص الخدمة حسب المبنى</li><li>✔ مقارنة مشغلي الفايبر</li><li>✔ متابعة الطلب عبر واتساب</li></ul>
          </div>
          <LeadForm defaultCity={data.name} />
        </div>
      </section>
      <section className="container">
        <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد في فحص الخيارات ورفع طلب الاشتراك ومتابعته.</p>
        <h2>الإنترنت المنزلي في {data.name}</h2>
        <Intro data={data} />
        <h2>رقم مندوب فايبر {data.name}</h2>
        <ContactBox text={`لإرسال موقع المبنى وفحص خيارات الفايبر في ${data.name}، تواصل على الرقم أو عبر واتساب.`} />
        <h2>مشغلو الفايبر في {data.name}</h2>
        <InternalLinks city={city} />
        <h2>السكن والاتصال في أحياء {data.name}</h2>
        <div className="card faq">
          {data.districts.map(([name, description]) => <div key={name}><h3>{name}</h3><p>{description} {data.districtCta}</p></div>)}
        </div>
        <Choice data={data} />
        <h2>أسئلة شائعة عن الفايبر في {data.name}</h2>
        <div className="card faq">{data.faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</div>
        <JsonLd data={schemas} />
      </section>
      <section className="container">
        <h2>صفحات قريبة</h2>
        <div className="cities">{cities.filter((item) => ![city, data.other.slug].includes(item.slug)).map((item) => <a key={item.slug} href={`/${item.slug}`}>مندوب فايبر {item.name}</a>)}</div>
      </section>
    </main>
  );
}

export function EasternOperatorPage({ city, operator }) {
  const data = easternCities[city];
  const districts = getEasternDistricts(city, operator.slug);
  const faqs = getEasternFaqs(city, operator.name);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: data.name, path: `/${city}` }, { name: operator.name, path: `/${city}/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} ${data.name}`, serviceType: "تركيب الألياف البصرية", city: data.name, path: `/${city}/${operator.slug}` }),
    faqSchema(faqs),
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب فايبر {operator.name} في {data.name}</h1>
            <p className="hero-sub">تحقق من جاهزية عنوانك لخدمة {operator.name}، راجع الباقات، وتابع طلب التركيب من مكان واحد.</p>
            <ul className="hero-points"><li>✔ فحص العنوان قبل الطلب</li><li>✔ توضيح الباقات المتاحة</li><li>✔ تواصل مباشر عبر واتساب</li></ul>
          </div>
          <LeadForm defaultCity={data.name} operator={operator.name} />
        </div>
      </section>
      <section className="container">
        <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد كمندوب مبيعات في فحص الخدمة ورفع طلب الاشتراك ومتابعته.</p>
        <h2>فايبر {operator.name} في {data.name}</h2>
        <Intro data={data} />
        <h2>رقم مندوب فايبر {operator.name} {data.name}</h2>
        <ContactBox text={`لفحص عنوانك ومراجعة باقات فايبر ${operator.name} في ${data.name}، اتصل أو أرسل موقع المبنى عبر واتساب.`} />

        <h2>أسعار باقات فايبر {operator.name} (آخر تحديث: {operator.updated})</h2>
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead>
            <tbody>{operator.packages.map((p) => <tr key={p.name}><td>{p.name}</td><td>{p.down}</td><td>{p.up}</td><td>{p.price}</td><td>{p.perks}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{operator.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي قبل الاشتراك.</p>
        <ContactBox text={`قد تتغير عروض ${operator.name} من وقت إلى آخر. تواصل لتأكيد السعر وشروط الباقة قبل تقديم الطلب.`} />

        <h2>معلومات مهمة قبل تركيب فايبر {operator.name}</h2>
        <ul className="req-list">{operator.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        <h2>عن فايبر {operator.name}</h2><p>{operator.about}</p>

        <h2>مندوب {operator.name} في أحياء {data.name}</h2>
        <div className="card faq">{districts.map((district) => <div key={district.name}><h3>{district.name}</h3><p>{district.description.replace(/\.$/, "")}؛ {district.advice}</p></div>)}</div>

        <Choice data={data} operator={operator} />

        <h2>خطوات طلب فايبر {operator.name}</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>إرسال العنوان</h4><p>شارك المدينة والحي وموقع المبنى.</p></div>
          <div className="card"><span>2</span><h4>التحقق</h4><p>تُراجع إمكانية الخدمة على العنوان.</p></div>
          <div className="card"><span>3</span><h4>اختيار الباقة</h4><p>اطلع على التفاصيل واختر ما يناسب استخدامك.</p></div>
          <div className="card"><span>4</span><h4>متابعة التركيب</h4><p>يُرفع الطلب وتتابع حالته حتى التفعيل.</p></div>
        </div>
        <h2>روابط الفايبر في {data.name}</h2><InternalLinks city={city} currentOperator={operator} />
        <h2>أسئلة شائعة عن مندوب فايبر {operator.name} في {data.name}</h2>
        <div className="card faq">{faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</div>
        <JsonLd data={schemas} />
      </section>
    </main>
  );
}
