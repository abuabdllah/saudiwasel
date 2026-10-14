This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## تدقيق المحتوى العربي

بعد تشغيل خادم التطوير، يفحص الأمر التالي النصوص المعروضة لكل المسارات العربية في خريطة الموقع، بما فيها صفحات المدن والمشغلين والمقالات:

```bash
npm run audit:content -- http://localhost:8889 .netlify/content-audit-after.json
```

يحصي الفحص الجمل والمقاطع المستقلة من ثماني كلمات فأكثر، ويستثني الهيدر والفوتر والنماذج والنصوص غير المعروضة وجملة «موقع مستقل وغير تابع لأي مشغل». يجمع الظهور المتكرر داخل الصفحة وبين الصفحات في سجل واحد لكل نص، ويعرض التكرار داخل خلايا الجداول بشكل منفصل ولا يحذفه من العدد الإجمالي. لا يغيّر الفحص محتوى الموقع.

للمقارنة مع لقطة محفوظة قبل التحرير، مرر ملفها وسيطة ثالثة:

```bash
npm run audit:content -- http://localhost:8889 .netlify/content-audit-after.json .netlify/content-audit-before.json
```

تتحقق المقارنة من بقاء المسارات والعناوين وأوصاف الميتا والروابط الأساسية ومحتوى الجداول كما كانت. يفشل الأمر عند تغير أحد هذه العناصر أو وجود تكرار خارج خلايا الجداول؛ يبقى أي نص سعر متكرر ظاهراً في التقرير لأن جداول الأسعار محمية من التحرير.
