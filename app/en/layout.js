import "./english.css";
import { EnglishHeader, EnglishFooter } from "../../components/EnglishChrome";
import Breadcrumbs from "../../components/Breadcrumbs";
import ConversionTracking from "../../components/ConversionTracking";
import JsonLd, { organizationSchema, websiteSchema } from "../../components/JsonLd";

export const metadata = {
  metadataBase: new URL("https://saudiwasel.com"),
  applicationName: "Saudi Wasel",
};

export default function EnglishLayout({ children }) {
  return (
    <html lang="en-SA" dir="ltr">
      <body className="en-site">
        <a className="en-skip" href="#en-main">Skip to content</a>
        <EnglishHeader />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Breadcrumbs english />
        {children}
        <EnglishFooter />
        <ConversionTracking />
      </body>
    </html>
  );
}
