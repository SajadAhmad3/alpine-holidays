"use client"

import { useEffect, useState } from "react"
import EnquiryStatusSelect from "@/components/admin/EnquiryStatusSelect"

type Enquiry = {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
  status: string
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

async function deleteEnquiry(id: number) {
  const token = localStorage.getItem("adminToken")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries/${id}`,
    {
      method: "DELETE",
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
    throw new Error("Failed to delete enquiry")
  }
}

const statusCounts = (enquiries: Enquiry[]) => ({
  total: enquiries.length,
  new: enquiries.filter(
    (enquiry) => enquiry.status === "NEW"
  ).length,
  contacted: enquiries.filter(
    (enquiry) => enquiry.status === "CONTACTED"
  ).length,
  converted: enquiries.filter(
    (enquiry) => enquiry.status === "CONVERTED"
  ).length,
})

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

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<Enquiry | null>(null)
  const [error, setError] = useState("")
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      window.location.replace("/admin/login")
      return
    }

    setAuthChecked(true)

    async function loadEnquiries() {
      try {
        const data = await getEnquiries()
        setEnquiries(data)
      } catch (error) {
        console.error(error)
        setError("Failed to load enquiries.")
      } finally {
        setLoading(false)
      }
    }

    loadEnquiries()
  }, [])

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#0b0f0e]" />
    )
  }

  const counts = statusCounts(enquiries)

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    const id = deleteTarget.id

    setDeletingId(id)
    setError("")

    try {
      await deleteEnquiry(id)

      setEnquiries((current) =>
        current.filter((enquiry) => enquiry.id !== id)
      )

      setDeleteTarget(null)
    } catch (error) {
      console.error(error)
      setError(
        "Could not delete enquiry. Please try again."
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f0e] text-[#f1f4f2]">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#6f8f87]">
              Customer management
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Enquiries
            </h1>

            <p className="mt-2 text-base text-[#899691] sm:text-lg">
              Review and manage customer conversations.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#151b19] px-4 py-3">
            <p className="text-sm text-[#899691]">
              Total enquiries
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {counts.total}
            </p>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#151b19] p-5">
            <p className="text-base font-medium text-[#899691]">
              Total
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              {counts.total}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151b19] p-5">
            <p className="text-base font-medium text-[#899691]">
              New
            </p>

            <p className="mt-3 text-3xl font-semibold text-blue-400">
              {counts.new}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151b19] p-5">
            <p className="text-base font-medium text-[#899691]">
              Contacted
            </p>

            <p className="mt-3 text-3xl font-semibold text-amber-400">
              {counts.contacted}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151b19] p-5">
            <p className="text-base font-medium text-[#899691]">
              Converted
            </p>

            <p className="mt-3 text-3xl font-semibold text-emerald-400">
              {counts.converted}
            </p>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-base text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-[#151b19] px-6 py-14 text-center">
            <p className="text-base text-[#899691]">
              Loading enquiries...
            </p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#151b19] px-6 py-14 text-center">
            <p className="text-xl font-medium text-white">
              No enquiries yet
            </p>

            <p className="mt-2 text-base text-[#899691]">
              Customer enquiries will appear here.
            </p>
          </div>
        ) : (
          <section className="space-y-4">
            {enquiries
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((enquiry) => (
                <article
                  key={enquiry.id}
                  className="rounded-xl border border-white/10 bg-[#151b19] transition-colors hover:border-white/15"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1d2724] text-base font-semibold text-[#7da79d]">
                          {enquiry.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-lg font-semibold text-white sm:text-xl">
                              {enquiry.name}
                            </h2>

                            <span className="text-sm text-[#697772]">
                              #{enquiry.id}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-col gap-1 text-base text-[#899691] sm:flex-row sm:gap-4">
                            <span className="break-all">
                              {enquiry.email}
                            </span>

                            {enquiry.phone && (
                              <span>
                                {enquiry.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        <EnquiryStatusSelect
                          id={enquiry.id}
                          initialStatus={enquiry.status}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget(enquiry)
                          }
                          disabled={deletingId === enquiry.id}
                          className="rounded-lg border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-white/5 bg-[#101513] p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#697772]">
                        Customer message
                      </p>

                      <p className="mt-3 text-base leading-7 text-[#a2ada8]">
                        {enquiry.message}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <time className="text-sm text-[#697772]">
                        {new Date(
                          enquiry.createdAt
                        ).toLocaleString()}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
          </section>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#151b19] p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
              !
            </div>

            <h2
              id="delete-dialog-title"
              className="mt-5 text-xl font-semibold text-white"
            >
              Delete enquiry?
            </h2>

            <p className="mt-2 text-base leading-6 text-[#899691]">
              You are about to permanently delete the enquiry
              from{" "}
              <span className="font-medium text-white">
                {deleteTarget.name}
              </span>
              .
            </p>

            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm font-medium text-red-400">
                This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId !== null}
                className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="rounded-lg bg-red-500/90 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId !== null
                  ? "Deleting..."
                  : "Delete enquiry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
