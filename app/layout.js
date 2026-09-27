import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://saudiwasel.com"),
  title: "سعودي واصل | مندوب فايبر وراوتر 5G لجميع الشركات في السعودية",
  description: "سعودي واصل: مندوب فايبر وراوتر 5G لـ STC وموبايلي وزين وسلام في جميع مدن المملكة. نفحص التغطية، نقارن الباقات، ونتابع طلبك حتى التفعيل.",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
