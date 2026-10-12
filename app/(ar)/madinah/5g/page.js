import CityFiveGPage from "../../../../components/CityFiveGPage";
import { cityFivegPages } from "../../../../lib/city-fiveg";
import { pageMetadata } from "../../../../lib/seo";

export const metadata = pageMetadata({
  title: "رقم مندوب راوتر 5G المدينة المنورة | STC وزين وسلام وموبايلي",
  description: cityFivegPages.madinah.description,
  alternates: { canonical: "/madinah/5g" },
});

export default function Page() { return <CityFiveGPage city="madinah" />; }
