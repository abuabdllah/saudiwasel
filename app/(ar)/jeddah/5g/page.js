import { pageMetadata } from "../../../../lib/seo";
import JeddahFiveGPage from "../../../../components/JeddahFiveGPage";
import { languageAlternates } from "../../../../lib/languages";

const title = "مندوب راوتر 5G جدة | STC وزين وسلام وموبايلي";
const description = "رقم مندوب راوتر 5G جدة لخيارات STC وزين وسلام وموبايلي، والتحقق من التغطية والباقات المتاحة لعنوانك ومتابعة الطلب.";
export const metadata = pageMetadata({ title, description, alternates: { canonical: "/jeddah/5g", languages: languageAlternates("/jeddah/5g") }, openGraph: { title, description, images: ["/opengraph-image.png"] }, twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] } });

export default function Page() { return <JeddahFiveGPage />; }
