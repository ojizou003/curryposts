import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "推しカレー 𝕏",
    template: "%s | 推しカレー 𝕏",
  },
  description: "Xのカレーに関する投稿を集めたギャラリーサイト。日本全国の美味しいカレー投稿を都道府県別に閲覧できます。",
  keywords: [
    "カレー",
    "カレー投稿",
    "グルメ",
    "X",
    "ギャラリー",
    "都道府県",
    "日本のカレー",
    "カレーショップ",
    "グルメ投稿"
  ],
  authors: [{ name: "推しカレー 𝕏" }],
  creator: "推しカレー 𝕏",
  publisher: "推しカレー 𝕏",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: '推しカレー 𝕏',
    description: 'Xのカレーに関する投稿を集めたギャラリーサイト。日本全国の美味しいカレー投稿を都道府県別に閲覧できます。',
    siteName: 'カレー投稿ギャラリー',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '推しカレー 𝕏',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '推しカレー 𝕏',
    description: 'Xのカレーに関する投稿を集めたギャラリーサイト',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="推しカレー 𝕏" />
        <meta name="application-name" content="推しカレー 𝕏" />
        <meta name="msapplication-TileColor" content="#ff6b35" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
