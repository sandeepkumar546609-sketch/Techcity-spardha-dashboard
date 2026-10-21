import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";

const themeInit = `try{var t=localStorage.getItem("spardha-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const title = "Spardha — Technical assessments for TechCity students";
const description =
  "A technical assessment for TechCity students. Data structures is open now, with multiple choice, code submission, an instant score, and a certificate. AI/ML, cloud computing, and other assessments will follow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Spardha",
  },
  description,
  applicationName: "Spardha",
  keywords: [
    "Spardha",
    "TechCity",
    "technical assessment",
    "data structures",
    "student assessment",
    "coding assessment",
  ],
  authors: [{ name: "TechCity" }],
  creator: "TechCity",
  publisher: "TechCity",
  category: "education",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Spardha",
    title,
    description,
    images: [
      {
        url: "/logo.png",
        width: 945,
        height: 921,
        alt: "Spardha logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [
      {
        url: "/logo.png",
        alt: "Spardha logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090b10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <AuthProvider>
          {children}
          <AuthDialog />
        </AuthProvider>
      </body>
    </html>
  );
}
