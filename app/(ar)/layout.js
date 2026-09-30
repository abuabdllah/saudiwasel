import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import JsonLd, { organizationSchema, websiteSchema } from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import ConversionTracking from "../../components/ConversionTracking";
import RelatedGuides from "../../components/RelatedGuides";

export const metadata = {
  metadataBase: new URL("https://saudiwasel.com"),
  title: "سعودي واصل | مندوب فايبر وراوتر 5G لجميع الشركات في السعودية",
  description: "سعودي واصل: مندوب فايبر وراوتر 5G لـ STC وسلام وزين وموبايلي في جميع مدن المملكة. نفحص التغطية، نقارن الباقات، ونتابع طلبك حتى التفعيل.",
  applicationName: "سعودي واصل",
  openGraph: {
    siteName: "سعودي واصل",
    locale: "ar_SA",
    type: "website",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar-SA" dir="rtl">
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Header />
        <Breadcrumbs />
        {children}
        <RelatedGuides />
        <Footer />
        <ConversionTracking />
      </body>
    </html>
  );
}
