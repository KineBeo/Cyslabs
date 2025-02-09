import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "./components/footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cyslabs.vercel.app/'),
  title: {
    default: 'Cyslabs',
    template: '%s | Cyslabs'
  },
  description: "The coolest cybersecurity lab in Vietnam",
  keywords: ["cyslabs", "cybersecurity", "vietnam"],
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://cyslabs.vercel.app/",
    title: "Cyslabs",
    description: "The coolest cybersecurity lab in Vietnam",
    siteName: "Cyslabs",
    images: [
      {
        url: "/favicon.ico"
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyslabs',
    description: 'The coolest cybersecurity lab in Vietnam',
    images: ['/favicon.ico'],
  },
  manifest: '/manifest.ts',
  verification: {
    google: 'your_google_verification_code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
