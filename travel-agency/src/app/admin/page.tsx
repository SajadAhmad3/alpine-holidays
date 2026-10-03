"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Enquiry = {
  id: number
  name: string
  email: string
  message: string
  status: string
  createdAt: string
}

type Offer = {
  id: number
  name: string
  days: number
  nights: number
  price: number
}

async function getEnquiries(): Promise<Enquiry[]> {
  const token = localStorage.getItem("adminToken")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("adminToken")
    window.location.replace("/admin/login")
    throw new Error("Authentication expired")
  }

  if (!response.ok) {
    throw new Error("Failed to fetch enquiries")
  }

  return response.json()
}

async function getOffers(): Promise<Offer[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch offers")
  }

  return response.json()
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    CONTACTED:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    CONVERTED:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${
        styles[status] ??
        "border-white/10 bg-white/5 text-white/60"
      }`}
    >
      {status}
    </span>
  )
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  async function loadDashboard() {
    setLoading(true)
    setLoadError(false)

    try {
      const [enquiriesData, offersData] =
        await Promise.all([
          getEnquiries(),
          getOffers(),
        ])

      setEnquiries(enquiriesData)
      setOffers(offersData)
    } catch (error) {
      console.error(error)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      window.location.replace("/admin/login")
      return
    }

    setAuthChecked(true)
    loadDashboard()
  }, [])

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#0b0f0e]" />
    )
  }

  const handleLogout = () => {
    setLoggingOut(true)

    localStorage.removeItem("adminToken")

    window.location.replace("/admin/login")
  }

  const recentEnquiries = enquiries
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5)

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "NEW"
  ).length

  return (
    <main className="min-h-screen bg-[#0b0f0e] text-[#f1f4f2]">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#111715]">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">

          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#315c55] text-base font-semibold text-white">
              A
            </div>

            <div>
              <p className="text-base font-semibold tracking-tight text-white">
                Alpine Dream
              </p>

              <p className="text-xs text-white/40">
                Admin Console
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              View website
            </Link>

            <button
              type="button"
              onClick={() =>
                setShowLogoutDialog(true)
              }
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">

        {/* Page heading */}
        <section className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Dashboard
          </h1>

          <p className="mt-2 text-base text-[#899691] sm:text-lg">
            Manage your travel offers and customer enquiries.
          </p>
        </section>

        {loadError && (
          <section className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Couldn&apos;t load dashboard data
                </h2>

                <p className="mt-1 text-base text-[#899691]">
                  We couldn&apos;t connect to the server. Please try again.
                </p>
              </div>

              <button
                type="button"
                onClick={loadDashboard}
                disabled={loading}
                className="shrink-0 rounded-lg bg-[#315c55] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3b6b62] disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          </section>
        )}

        {/* Overview cards */}
        <section className="grid gap-4 md:grid-cols-2">

          {/* Offers */}
          <Link
            href="/admin/offers"
            className="group rounded-xl border border-white/10 bg-[#151b19] p-5 transition duration-200 hover:border-white/20 hover:bg-[#19201e]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Offers
                </h2>

                <p className="mt-1 text-base text-[#899691]">
                  Travel packages
                </p>

                <p className="mt-4 text-5xl font-semibold tracking-tight text-white">
                  {loading ? "—" : offers.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#1d2724] text-xl text-[#7da79d] transition group-hover:border-[#315c55] group-hover:bg-[#315c55] group-hover:text-white">
                →
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-base font-medium text-[#7da79d]">
                Manage offers
              </span>

              <span className="text-lg text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
          </Link>

          {/* Enquiries */}
          <Link
            href="/admin/enquiries"
            className="group rounded-xl border border-white/10 bg-[#151b19] p-5 transition duration-200 hover:border-white/20 hover:bg-[#19201e]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Enquiries
                </h2>

                <p className="mt-1 text-base text-[#899691]">
                  Customer conversations
                </p>

                <p className="mt-4 text-5xl font-semibold tracking-tight text-white">
                  {loading ? "—" : enquiries.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#1d2724] text-xl text-[#7da79d] transition group-hover:border-[#315c55] group-hover:bg-[#315c55] group-hover:text-white">
                →
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-base font-medium text-[#7da79d]">
                {newEnquiries} new
              </span>

              <span className="text-base font-medium text-white/60 transition group-hover:text-white">
                View enquiries →
              </span>
            </div>
          </Link>
        </section>

        {/* Recent enquiries */}
        <section className="mt-9">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Recent enquiries
              </h2>

              <p className="mt-1 text-base text-[#899691]">
                Latest customer submissions.
              </p>
            </div>

            <Link
              href="/admin/enquiries"
              className="text-sm font-medium text-[#7da79d] transition hover:text-white"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#151b19]">
            {loading ? (
              <div className="px-6 py-10 text-center text-base text-[#899691]">
                Loading enquiries...
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="px-6 py-10 text-center text-base text-[#899691]">
                No enquiries yet.
              </div>
            ) : (
              <div>
                <div className="hidden grid-cols-[1.1fr_1.8fr_0.7fr] gap-6 border-b border-white/10 bg-[#111715] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#697772] md:grid">
                  <span>Customer</span>
                  <span>Message</span>
                  <span>Status</span>
                </div>

                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="grid gap-4 border-b border-white/10 px-6 py-4 last:border-b-0 md:grid-cols-[1.1fr_1.8fr_0.7fr] md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-white">
                        {enquiry.name}
                      </p>

                      <p className="mt-1 truncate text-sm text-[#78857f]">
                        {enquiry.email}
                      </p>
                    </div>

                    <p className="line-clamp-2 text-base leading-relaxed text-[#a2ada8]">
                      {enquiry.message}
                    </p>

                    <div className="flex items-center justify-between gap-3 md:justify-start">
                      <span className="text-sm text-[#697772] md:hidden">
                        Status
                      </span>

                      <StatusBadge
                        status={enquiry.status}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Logout confirmation */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#151b19] p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#315c55]/30 bg-[#315c55]/10 text-[#7da79d]">
              →
            </div>

            <h2
              id="logout-dialog-title"
              className="mt-5 text-xl font-semibold text-white"
            >
              Log out of admin?
            </h2>

            <p className="mt-2 text-base leading-6 text-[#899691]">
              You will be signed out of the Alpine Dream
              Admin Console.
            </p>

            <div className="mt-4 rounded-lg border border-white/10 bg-[#101513] px-4 py-3">
              <p className="text-sm text-[#697772]">
                You can sign in again whenever you need
                access.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowLogoutDialog(false)
                }
                disabled={loggingOut}
                className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg bg-[#315c55] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3b6b62] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingOut
                  ? "Logging out..."
                  : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
