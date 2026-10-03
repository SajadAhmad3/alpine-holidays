import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alpinedreamholidays.com"),
  title: {
    default: "Alpine Dream Holidays | Kashmir Travel & Experiences",
    template: "%s | Alpine Dream Holidays",
  },
  description:
    "Thoughtfully planned journeys through Kashmir, from Srinagar and Gulmarg to Pahalgam and Sonamarg.",
  keywords: [
    "Kashmir travel",
    "Kashmir holidays",
    "Kashmir tour packages",
    "Kashmir travel agency",
    "Srinagar",
    "Gulmarg",
    "Pahalgam",
    "Sonamarg",
  ],
  openGraph: {
    title: "Alpine Dream Holidays | Kashmir Travel & Experiences",
    description:
      "Thoughtfully planned journeys through the valleys, mountains and timeless beauty of Kashmir.",
    url: "https://www.alpinedreamholidays.com",
    siteName: "Alpine Dream Holidays",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
