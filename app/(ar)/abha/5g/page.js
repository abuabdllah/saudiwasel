import CityFiveGPage from "../../../../components/CityFiveGPage";
import { cityFivegPages } from "../../../../lib/city-fiveg";
import { pageMetadata } from "../../../../lib/seo";

export const metadata = pageMetadata({
  title: "رقم مندوب راوتر 5G أبها | STC وزين وسلام وموبايلي",
  description: cityFivegPages.abha.description,
  alternates: { canonical: "/abha/5g" },
});

export default function Page() { return <CityFiveGPage city="abha" />; }
