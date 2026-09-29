import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd, { organizationSchema } from "../components/JsonLd";

export const metadata = {
  metadataBase: new URL("https://saudiwasel.com"),
  title: "سعودي واصل | مندوب فايبر وراوتر 5G لجميع الشركات في السعودية",
  description: "سعودي واصل: مندوب فايبر وراوتر 5G لـ STC وسلام وزين وموبايلي في جميع مدن المملكة. نفحص التغطية، نقارن الباقات، ونتابع طلبك حتى التفعيل.",
  applicationName: "سعودي واصل",
  openGraph: {
    siteName: "سعودي واصل",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <JsonLd data={organizationSchema} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
