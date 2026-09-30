export const enquiryCities = ["Jeddah", "Riyadh", "Khobar", "Dammam", "Makkah", "Madinah", "Taif", "Abha", "Tabuk", "Buraidah", "Hail", "Jazan"];

export function englishEnquiryUrl({ city, district, housing, service }) {
  const message = `Hi, I'm interested in ${service} in ${city}.\nArea: ${district.trim()}\nHousing type: ${housing}\nPlease check the options available at my address. I would like support in English.`;
  return `https://wa.me/966564612017?text=${encodeURIComponent(message)}`;
}
