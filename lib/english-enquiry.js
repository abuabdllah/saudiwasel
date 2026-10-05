export const enquiryCities = ["Jeddah", "Riyadh", "Khobar", "Dammam", "Makkah", "Madinah", "Taif", "Abha", "Tabuk", "Buraidah", "Hail", "Jazan"];

export function englishEnquiryUrl({ city, otherCity = "", district, housing, service }) {
  const cityName = city === "other" ? otherCity.trim() : city;
  const message = `Hi, I'm interested in ${service} in ${cityName}.\nArea: ${district.trim()}\nHousing type: ${housing}\nPlease check the options available at my address. I would like support in English.`;
  return `https://wa.me/966564612017?text=${encodeURIComponent(message)}`;
}
