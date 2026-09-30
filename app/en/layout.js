import "./english.css";
import { EnglishHeader, EnglishFooter } from "../../components/EnglishChrome";

export const metadata = {
  metadataBase: new URL("https://saudiwasel.com"),
  applicationName: "Saudi Wasel",
};

export default function EnglishLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="en-site">
        <a className="en-skip" href="#en-main">Skip to content</a>
        <EnglishHeader />
        {children}
        <EnglishFooter />
      </body>
    </html>
  );
}
