import JeddahFiveGPage from "../../../components/JeddahFiveGPage";

const title = "مندوب زين جدة | فايبر وراوتر 5G";
const description = "رقم مندوب زين جدة لراوتر 5G وفحص توفر الفايبر حسب عنوان المبنى، مع تأكيد الباقات والأسعار المتاحة ومتابعة الطلب.";
export const metadata = { title, description, alternates: { canonical: "/jeddah/zain" }, openGraph: { title, description }, twitter: { title, description } };

export default function Page() { return <JeddahFiveGPage zainOnly />; }
