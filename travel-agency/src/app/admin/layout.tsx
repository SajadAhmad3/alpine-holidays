import { Manrope } from "next/font/google"

const manrope = Manrope({
  variable: "--font-admin",
  subsets: ["latin"],
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${manrope.variable} min-h-screen bg-[#0b0f0e] font-[var(--font-admin)]`}
    >
      {children}
    </div>
  )
}
