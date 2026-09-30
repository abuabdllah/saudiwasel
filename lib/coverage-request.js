export const COVERAGE_FORM_NAME = "coverage-request";
export const COVERAGE_FORM_PATH = "/__forms.html";
export const WHATSAPP_NUMBER = "966564612017";

export function createReference() {
  const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const random = crypto.getRandomValues(new Uint8Array(12));
  return `SW-${Array.from(random, (byte) => alphabet[byte & 31]).join("")}`;
}

export function coverageWhatsAppUrl(form, reference, cityName) {
  const operators = { any: "المشغلون المتاحون على العنوان", stc: "STC", salam: "سلام", mobily: "موبايلي", zain: "زين" };
  const services = { fiber: "الألياف البصرية", "5g": "إنترنت منزلي 5G", compare: "مقارنة Fiber و5G" };
  const buildings = { home: "منزل / فيلا", apartment: "شقة", office: "مكتب / منشأة" };
  const message = [
    "طلب تحقق تغطية جديد - SaudiWasel",
    `مرجع الطلب: ${reference}`,
    `الاسم: ${form.name.trim()}`,
    `الجوال: ${form.phone.trim()}`,
    `المدينة: ${cityName}`,
    `الحي: ${form.district.trim()}`,
    `نوع الخدمة: ${services[form.service]}`,
    `المشغل المفضل: ${operators[form.operator]}`,
    `نوع العقار: ${buildings[form.buildingType]}`,
    `الملاحظات: ${form.notes.trim() || "لم تُضف ملاحظات"}`,
    ...(form.buildingLocation.trim() ? [`موقع المبنى:\n${form.buildingLocation.trim()}`] : []),
    "تم تسجيل الطلب عبر نموذج SaudiWasel.",
    "طلب التحقق بانتظار مراجعة توفر الخدمة.",
  ].join("\n\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export async function saveCoverageRequest(form, submission, fetchRequest = fetch) {
  const body = new URLSearchParams({
    "form-name": COVERAGE_FORM_NAME,
    ...form,
    ...submission,
    consent: String(form.consent),
    consentVersion: "2026-09-30",
    coverageStatus: "pending_verification",
  });
  const response = await fetchRequest(COVERAGE_FORM_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok) throw new Error("Coverage request was not saved");
}
