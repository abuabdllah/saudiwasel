import CityFiveGPage from "../../../../components/CityFiveGPage";
import { cityFivegPages } from "../../../../lib/city-fiveg";
import { pageMetadata } from "../../../../lib/seo";

export const metadata = pageMetadata({
  title: "رقم مندوب راوتر 5G الطائف | STC وزين وسلام وموبايلي",
  description: cityFivegPages.taif.description,
  alternates: { canonical: "/taif/5g" },
});

export default function Page() { return <CityFiveGPage city="taif" />; }
