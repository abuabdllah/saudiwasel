export const operatorSources = {
  stc: { url: "https://www.stc.com.sa/", label: "موقع STC الرسمي", verifiedAt: null },
  salam: { url: "https://salam.sa/", label: "موقع سلام الرسمي", verifiedAt: null },
  mobily: { url: "https://www.mobily.com.sa/", label: "موقع موبايلي الرسمي", verifiedAt: null },
  zain: { url: "https://sa.zain.com/", label: "موقع زين الرسمي", verifiedAt: null },
};

export function referencePlans(plans) {
  return plans.map((plan) => ({
    ...plan,
    down: "يُراجع لدى المشغل",
    up: "يُراجع لدى المشغل",
    price: "غير مؤكد؛ راجع المصدر الرسمي",
    perks: "تُراجع تكلفة الجهاز والتركيب والالتزام",
  }));
}
