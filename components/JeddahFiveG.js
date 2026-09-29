import LeadForm from "./LeadForm";
import { fivegOperators } from "../lib/fiveg";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";
const districts = ["الروضة", "السلامة", "الصفا", "النعيم", "الحمدانية"];

export default function JeddahFiveG({ operatorSlug }) {
  const operator = operatorSlug ? fivegOperators.find((item) => item.slug === operatorSlug) : null;
  const name = operator?.name;
  const service = name ? `راوتر 5G ${name}` : "راوتر 5G";

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب {service} في جدة</h1>
            <p className="hero-sub">اطلب الإنترنت المنزلي اللاسلكي في جدة بعد التحقق من التغطية على عنوانك، مع شرح الخيارات ومتابعة الطلب حتى استلام الراوتر وتفعيله.</p>
            <ul className="hero-points"><li>✔ يعمل دون تمديدات داخلية</li><li>✔ فحص التغطية قبل الطلب</li><li>✔ متابعة مباشرة مع المندوب</li></ul>
          </div>
          <LeadForm defaultCity="جدة" operator={name ? `${name} 5G` : "5G"} />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لأي مشغل. نساعدك في معرفة الخيارات ورفع الطلب ومتابعته.</p>

        {operator && <>
          <h2>أسعار باقات {operator.brand}</h2>
          <div className="table-wrap"><table className="compare">
            <thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead>
            <tbody>{operator.packages.map((p) => <tr key={p.name}><td>{p.name}</td><td>{p.down}</td><td>{p.up}</td><td>{p.price}</td><td>{p.perks}</td></tr>)}</tbody>
          </table></div>
          <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من موقع {name} الرسمي، وقد تتغير العروض والأسعار. تواصل معنا لتأكيد السعر الحالي.</p>
        </>}

        <h2>معلومات مهمة قبل الاشتراك في راوتر 5G</h2>
        <div className="steps">
          <div className="card"><h4>من دون تمديدات</h4><p>يعمل الراوتر لاسلكياً ولا يحتاج إلى تمديد ألياف داخل المنزل.</p></div>
          <div className="card"><h4>الإشارة ومكان الراوتر</h4><p>جودة الاتصال تعتمد على قوة الإشارة وعلى وضع الراوتر في مكان مناسب داخل المنزل.</p></div>
          <div className="card"><h4>مناسب للمستأجرين</h4><p>خيار عملي للسكن المستأجر لأنه لا يتطلب أعمال تمديد ثابتة.</p></div>
          <div className="card"><h4>النقل مع السكن</h4><p>يمكن طلب نقل الخدمة عند الانتقال إلى سكن آخر وفق شروط الباقة وتوفر التغطية في الموقع الجديد.</p></div>
        </div>

        <h2>لماذا تطلب عن طريق مندوب؟</h2>
        <div className="steps">
          <div className="card"><h4>تحقق قبل الطلب</h4><p>نراجع توفر الشبكة على عنوانك قبل رفع الطلب.</p></div>
          <div className="card"><h4>شرح واضح</h4><p>نوضح الفروق بين الخيارات المتاحة من دون إضافة رسوم على خدمتنا.</p></div>
          <div className="card"><h4>رفع الطلب</h4><p>نساعدك في إدخال بيانات الطلب بالطريقة الصحيحة.</p></div>
          <div className="card"><h4>متابعة التفعيل</h4><p>نبقى معك لمتابعة وصول الراوتر وتشغيل الخدمة.</p></div>
        </div>

        <h2>ماذا تحتاج للطلب؟</h2>
        <ul className="req-list"><li>هوية وطنية أو إقامة سارية</li><li>العنوان الوطني أو موقع المنزل على الخريطة</li><li>رقم جوال للتواصل والتوصيل</li></ul>

        <h2>مقارنة مختصرة بين راوتر 5G والفايبر</h2>
        <p>راوتر 5G أسرع في التجهيز ولا يحتاج تمديدات، لكن أداءه يتأثر بالإشارة والازدحام. الفايبر يحتاج توفر الألياف وتركيباً في المبنى، وعادةً يوفر اتصالاً أكثر ثباتاً. <a href="/fiber-vs-5g">اقرأ المقارنة الكاملة بين الفايبر و5G</a>.</p>

        <h2>{service} في أحياء جدة</h2>
        <div className="district-details">
          {districts.map((district) => <div key={district}>
            <h3>{service} في حي {district}</h3>
            <p>للطلب من حي {district}، أرسل موقع المنزل حتى نتحقق من الشبكة المتاحة على العنوان. قوة 5G قد تختلف بين مبنى وآخر وداخل غرف المنزل، لذلك لا تعني الإشارة في المنطقة ضمان جودة الخدمة في موقعك.</p>
          </div>)}
        </div>

        <div className="contact-box"><h2>تواصل مع المندوب</h2><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>
      </section>
    </main>
  );
}
