import EnglishPage from "../../../components/EnglishPage";
import { englishPages, englishMetadata } from "../../../lib/english";

const page = englishPages.find((item) => item.path === "/en/5g-home-internet-khobar");
export const metadata = englishMetadata(page);

export default function Page() {
  return <EnglishPage page={page} />;
}
