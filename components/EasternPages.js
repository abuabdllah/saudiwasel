import { operatorBody, operatorFaqs, choiceCopy, operatorFacts, operatorAbout, cityIntroductions, operatorIntroduction, localDistricts } from "../lib/local-content";
import PricesTable from "./PricesTable";
import CityOperatorLinks from "./CityOperatorLinks";
import IntentCtas from "./IntentCtas";
import CityNextSteps from "./CityNextSteps";
import OperatorSources from "./OperatorSources";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { cities } from "../lib/cities";
import { easternCities } from "../lib/eastern";

function ContactBox({ city, text }) {
  return (
    <div className="contact-box">
      <p>{text}</p>
      <IntentCtas city={city} />
    </div>
  );
}

function Intro({ data }) {
  return data.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function Choice({ data, operator, city }) {
  return (
    <>
      <h2>فايبر أو 5G في {data.name}؟</h2>
      <p>{choiceCopy(city, operator?.slug)} لخيارات {data.name}، راجع <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>، أو تصفح خيارات <a href="/5g">راوتر 5G</a>{operator && <> و<a href={`/5g/${operator.slug}`}>5G {operator.name}</a></>}.</p>
    </>
  );
}

function InternalLinks({ city, currentOperator }) {
  return <CityOperatorLinks city={city} current={currentOperator?.slug} />;
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
            <h1>مندوب فايبر {data.name} وفحص التغطية</h1>
            <p className="hero-sub">{cityIntroductions[city]}</p>
            <ul className="hero-points"><li>✔ فحص الخدمة حسب المبنى</li><li>✔ مقارنة مشغلي الفايبر</li><li>✔ متابعة الطلب عبر واتساب</li></ul>
          </div>
          <LeadForm defaultCity={data.name} />
        </div>
      </section>
      <section className="container">
        <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد سكان {data.name} على تحديد العقار ومراجعة خيارات الإنترنت قبل رفع الطلب ومتابعة التنفيذ.</p>
        <h2>الإنترنت المنزلي في {data.name}</h2>
        <Intro data={data} />
        <h2>مشغلو الفايبر في {data.name}</h2>
        <InternalLinks city={city} />
        <h2>السكن والاتصال في أحياء {data.name}</h2>
        <div className="card faq">
          {localDistricts(city).map((district) => <div key={district.name}><h3>{district.name}</h3><p>{district.text}</p></div>)}
        </div>
        <p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p>
        <h2>رقم مندوب فايبر {data.name}</h2>
        <ContactBox city={city} text={`لإرسال موقع المبنى وفحص خيارات الفايبر في ${data.name}، تواصل على الرقم أو عبر واتساب.`} />
        <Choice city={city} data={data} />
        <h2>أسئلة شائعة عن الفايبر في {data.name}</h2>
        <div className="card faq">{data.faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</div>
        <JsonLd data={schemas} />
      </section>
      <section className="container">
        <h2>مدن قريبة</h2>
        <div className="cities">{cities.filter((item) => item.slug !== city).map((item) => <a key={item.slug} href={`/${item.slug}`}>مندوب فايبر {item.name}</a>)}</div>
      </section>
    <CityNextSteps city={city} />
  </main>
  );
}

export function EasternOperatorPage({ city, operator }) {
  const data = { ...easternCities[city], intro: operatorBody(city, operator.slug) };
  const districts = localDistricts(city, operator.slug);
  const faqs = operatorFaqs(city, operator.slug);
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
            <h1>فايبر {operator.name} {data.name} وفحص التغطية</h1>
            <p className="hero-sub">{operatorIntroduction(city, operator.slug)}</p>
            <ul className="hero-points"><li>✔ فحص العنوان قبل الطلب</li><li>✔ توضيح الباقات المتاحة</li><li>✔ تواصل مباشر عبر واتساب</li></ul>
          </div>
          <LeadForm defaultCity={data.name} operator={operator.name} />
        </div>
      </section>
      <section className="container">
        <p className="notice">موقع مستقل وغير تابع لأي مشغل. نرتب مراجعة ألياف {operator.name} لمسكنك في {data.name} ونساعد في متابعة إجراء الاشتراك بعد اعتماد التفاصيل.</p>
        <h2>فايبر {operator.name} في {data.name}</h2>
        <Intro data={data} />

        <h2>خيارات باقات فايبر {operator.name}</h2>
        <OperatorSources operator={operator.slug} /><PricesTable operator={operator.slug} service="fiber" context={`فايبر ${operator.name} في ${data.name}`} />
        <h2>رقم مندوب فايبر {operator.name} {data.name}</h2>
        <IntentCtas city={city} operator={operator.slug} />

        <h2>معلومات مهمة قبل تركيب فايبر {operator.name}</h2>
        <ul className="req-list">{operatorFacts(city, operator.slug).map((fact) => <li key={fact}>{fact}</li>)}</ul>
        <h2>عن فايبر {operator.name}</h2><p>{operatorAbout(city, operator.slug)}</p>

        <h2>مندوب {operator.name} في أحياء {data.name}</h2>
        <div className="card faq">{districts.map((district) => <div key={district.name}><h3>{district.name}</h3><p>{district.text}</p></div>)}</div>
        <p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p>

        <Choice city={city} data={data} operator={operator} />

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
    <CityNextSteps city={city} operator={operator.slug} />
  </main>
  );
}
