import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://research-vocabulary.vercel.app"),
  title: "Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học | Research Methodology Lexicon",
  description: "Từ điển học thuật song ngữ Anh - Việt tra cứu thuật ngữ phương pháp nghiên cứu, trích dẫn APA, chỉ số thực nghiệm và bẫy sai lầm.",
  keywords: [
    "Phương pháp nghiên cứu",
    "Research Methodology",
    "Từ điển nghiên cứu khoa học",
    "APA 7th",
    "BibTeX",
    "Construct Validity",
    "Cronbach Alpha",
    "Luận án tiến sĩ"
  ],
  authors: [{ name: "Research Methodology Lexicon Editorial Board" }],
  openGraph: {
    title: "Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học",
    description: "Tra cứu chuẩn xác thuật ngữ phương pháp nghiên cứu Anh - Việt, xuất trích dẫn APA 7th, BibTeX và cảnh báo bẫy phương pháp.",
    type: "website",
    locale: "vi_VN",
    siteName: "Research Methodology Lexicon"
  },
  twitter: {
    card: "summary_large_image",
    title: "Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học",
    description: "Tra cứu chuẩn xác thuật ngữ phương pháp nghiên cứu Anh - Việt & xuất trích dẫn APA 7th."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Từ điển Thuật ngữ Phương pháp Nghiên cứu Khoa học (Research Methodology Lexicon)",
    "description": "Hệ thống từ điển thuật ngữ phương pháp nghiên cứu khoa học song ngữ Anh - Việt chuẩn mực quốc tế.",
    "inLanguage": ["vi", "en"],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "researcher"
    }
  };

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
