import CityFiveGPage from "../../../../components/CityFiveGPage";
import { cityFivegPages } from "../../../../lib/city-fiveg";
import { pageMetadata } from "../../../../lib/seo";

export const metadata = pageMetadata({
  title: "رقم مندوب راوتر 5G تبوك | STC وزين وسلام وموبايلي",
  description: cityFivegPages.tabuk.description,
  alternates: { canonical: "/tabuk/5g" },
});

export default function Page() { return <CityFiveGPage city="tabuk" />; }
