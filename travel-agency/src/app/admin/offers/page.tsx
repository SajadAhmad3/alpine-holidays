"use client"

import { FormEvent, useEffect, useState } from "react"

type Offer = {
  id: number
  name: string
  description: string
  days: number
  nights: number
  price: number
  locationSummary: string
  imageUrl: string
  active: boolean
  featured: boolean
}

type OfferForm = {
  name: string
  description: string
  days: string
  nights: string
  price: string
  locationSummary: string
  imageUrl: string
  active: boolean
}

const emptyForm: OfferForm = {
  name: "",
  description: "",
  days: "",
  nights: "",
  price: "",
  locationSummary: "",
  imageUrl: "",
  active: true,
}

function getToken() {
  return localStorage.getItem("adminToken")
}

function handleAuthFailure(response: Response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("adminToken")
    window.location.replace("/admin/login")
    return true
  }

  return false
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [featuredId, setFeaturedId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Offer | null>(
    null
  )
  const [form, setForm] = useState<OfferForm>(emptyForm)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [authChecked, setAuthChecked] = useState(false)

  const loadOffers = async () => {
    try {
      setError("")

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
      const response = await fetch(
        `${apiUrl}/api/offers`,
        {
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch offers")
      }

      const data: Offer[] = await response.json()

      setOffers(data)

      const featuredOffer = data.find(
        (offer) => offer.featured
      )

      setFeaturedId(
        featuredOffer ? featuredOffer.id : null
      )
    } catch (error) {
      console.error(error)
      setError("Could not load offers.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = getToken()

    if (!token) {
      window.location.replace("/admin/login")
      return
    }

    setAuthChecked(true)
    loadOffers()
  }, [])

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#0b0f0e]" />
    )
  }

  const updateField = (
    field: keyof OfferForm,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setMessage("")
    setError("")
  }

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id)

    setForm({
      name: offer.name,
      description: offer.description,
      days: String(offer.days),
      nights: String(offer.nights),
      price: String(offer.price),
      locationSummary: offer.locationSummary,
      imageUrl: offer.imageUrl,
      active: offer.active,
    })

    setMessage("")
    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleSetFeatured = async (id: number) => {
    setMessage("")
    setError("")

    try {
      const token = getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

      const response = await fetch(
        `${apiUrl}/api/admin/offers/${id}/featured`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (handleAuthFailure(response)) {
        return
      }

      if (!response.ok) {
        throw new Error(
          "Failed to set featured offer"
        )
      }

      setFeaturedId(id)

      setOffers((current) =>
        current.map((offer) => ({
          ...offer,
          featured: offer.id === id,
        }))
      )

      setMessage("Featured offer updated.")
    } catch (error) {
      console.error(error)
      setError(
        "Could not update featured offer."
      )
    }
  }

  const handleToggleActive = async (offer: Offer) => {
    setMessage("")
    setError("")

    try {
      const token = getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

      const response = await fetch(
        `${apiUrl}/api/admin/offers/${offer.id}/active?active=${!offer.active}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (handleAuthFailure(response)) {
        return
      }

      if (!response.ok) {
        throw new Error(
          "Failed to update offer status"
        )
      }

      const updatedOffer: Offer = await response.json()

      setOffers((current) =>
        current.map((item) =>
          item.id === offer.id
            ? updatedOffer
            : item
        )
      )

      setMessage(
        updatedOffer.active
          ? "Offer activated."
          : "Offer deactivated."
      )
    } catch (error) {
      console.error(error)
      setError(
        "Could not update offer status."
      )
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    const id = deleteTarget.id

    setDeletingId(id)
    setMessage("")
    setError("")

    try {
      const token = getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

      const response = await fetch(
        `${apiUrl}/api/admin/offers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (handleAuthFailure(response)) {
        return
      }

      if (!response.ok) {
        throw new Error("Failed to delete offer")
      }

      setOffers((current) =>
        current.filter((offer) => offer.id !== id)
      )

      if (featuredId === id) {
        setFeaturedId(null)
      }

      if (editingId === id) {
        resetForm()
      }

      setDeleteTarget(null)
      setMessage("Offer deleted successfully.")
    } catch (error) {
      console.error(error)
      setError(
        "Could not delete offer. Please try again."
      )
    } finally {
      setDeletingId(null)
    }
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setSaving(true)
    setMessage("")
    setError("")

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

    const url = editingId
      ? `${apiUrl}/api/admin/offers/${editingId}`
      : `${apiUrl}/api/admin/offers`

    const method = editingId ? "PUT" : "POST"

    try {
      const token = getToken()

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          days: Number(form.days),
          nights: Number(form.nights),
          price: Number(form.price),
          locationSummary: form.locationSummary,
          imageUrl: form.imageUrl,
          active: form.active,
        }),
      })

      if (handleAuthFailure(response)) {
        return
      }

      if (!response.ok) {
        throw new Error("Failed to save offer")
      }

      setMessage(
        editingId
          ? "Offer updated successfully."
          : "Offer created successfully."
      )

      resetForm()
      await loadOffers()
    } catch (error) {
      console.error(error)
      setError(
        "Could not save offer. Please try again."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f0e] text-[#f1f4f2]">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#6f8f87]">
              Package management
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Offers
            </h1>

            <p className="mt-2 text-base text-[#899691] sm:text-lg">
              Manage the journeys shown across the website.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#151b19] px-4 py-3">
            <p className="text-sm text-[#899691]">
              Total offers
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {offers.length}
            </p>
          </div>
        </header>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-base text-emerald-400">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-base text-red-400">
            {error}
          </div>
        )}

        <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">

          {/* Offers */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Current offers
                </h2>

                <p className="mt-1 text-base text-[#899691]">
                  Select an offer to edit it.
                </p>
              </div>

              {featuredId && (
                <span className="hidden text-sm font-medium text-[#7da79d] sm:block">
                  ★ Featured selected
                </span>
              )}
            </div>

            {loading ? (
              <div className="rounded-xl border border-white/10 bg-[#151b19] px-6 py-14 text-center">
                <p className="text-base text-[#899691]">
                  Loading offers...
                </p>
              </div>
            ) : offers.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#151b19] px-6 py-14 text-center">
                <p className="text-xl font-medium text-white">
                  No offers yet
                </p>

                <p className="mt-2 text-base text-[#899691]">
                  Create your first travel package.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <article
                    key={offer.id}
                    className={`overflow-hidden rounded-xl border bg-[#151b19] transition-all ${
                      editingId === offer.id
                        ? "border-[#315c55]/70 shadow-lg shadow-black/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">

                      {/* Image */}
                      <div className="h-48 w-full shrink-0 overflow-hidden bg-[#101513] sm:h-auto sm:w-44">
                        <img
                          src={offer.imageUrl}
                          alt={offer.name}
                          className={`h-full w-full object-cover transition ${
                            offer.active
                              ? ""
                              : "grayscale opacity-50"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 p-5 sm:p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                                  offer.active
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                    : "border-white/10 bg-white/5 text-white/40"
                                }`}
                              >
                                {offer.active
                                  ? "Active"
                                  : "Inactive"}
                              </span>

                              {offer.featured && (
                                <span className="rounded-full border border-[#315c55]/30 bg-[#315c55]/10 px-3 py-1.5 text-xs font-medium text-[#7da79d]">
                                  ★ Featured
                                </span>
                              )}
                            </div>

                            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
                              {offer.name}
                            </h2>

                            <p className="mt-1 text-sm text-[#7da79d]">
                              {offer.locationSummary}
                            </p>

                            <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-7 text-[#a2ada8]">
                              {offer.description}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#78857f]">
                              <span>
                                {offer.days}{" "}
                                {offer.days === 1
                                  ? "day"
                                  : "days"}
                              </span>

                              <span className="text-white/20">
                                ·
                              </span>

                              <span>
                                {offer.nights}{" "}
                                {offer.nights === 1
                                  ? "night"
                                  : "nights"}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="shrink-0 sm:text-right">
                            <p className="text-2xl font-semibold tracking-tight text-white">
                              ₹
                              {offer.price.toLocaleString(
                                "en-IN"
                              )}
                            </p>

                            <p className="mt-1 text-xs text-[#697772]">
                              per package
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(offer)
                            }
                            className="rounded-lg border border-white/10 bg-[#1d2724] px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-[#24302d] hover:text-white"
                          >
                            Edit offer
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleActive(offer)
                            }
                            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                          >
                            {offer.active
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          {offer.active &&
                            !offer.featured && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleSetFeatured(
                                    offer.id
                                  )
                                }
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#7da79d] transition hover:bg-[#315c55]/10 hover:text-white"
                              >
                                Set as featured
                              </button>
                            )}

                          {offer.featured && (
                            <span className="px-3 py-2.5 text-sm font-medium text-[#7da79d]">
                              This is the featured offer
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(offer)
                            }
                            disabled={
                              deletingId === offer.id
                            }
                            className="ml-auto rounded-lg border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Editor */}
          <aside className="sticky top-6 rounded-xl border border-white/10 bg-[#151b19] p-6 shadow-xl shadow-black/10 md:p-7">

            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#6f8f87]">
                  {editingId ? "Editing" : "Create"}
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {editingId
                    ? "Edit offer"
                    : "New offer"}
                </h2>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                  Offer name
                </label>

                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Kashmir in Bloom"
                  className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                  Description
                </label>

                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe the experience..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                    Days
                  </label>

                  <input
                    required
                    type="number"
                    min="1"
                    value={form.days}
                    onChange={(event) =>
                      updateField(
                        "days",
                        event.target.value
                      )
                    }
                    placeholder="5"
                    className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                    Nights
                  </label>

                  <input
                    required
                    type="number"
                    min="0"
                    value={form.nights}
                    onChange={(event) =>
                      updateField(
                        "nights",
                        event.target.value
                      )
                    }
                    placeholder="4"
                    className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#7da79d]">
                    ₹
                  </span>

                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) =>
                      updateField(
                        "price",
                        event.target.value
                      )
                    }
                    placeholder="32999"
                    className="w-full rounded-lg border border-white/10 bg-[#101513] py-3 pl-9 pr-4 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                  Location
                </label>

                <input
                  required
                  type="text"
                  value={form.locationSummary}
                  onChange={(event) =>
                    updateField(
                      "locationSummary",
                      event.target.value
                    )
                  }
                  placeholder="Srinagar · Pahalgam"
                  className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#a2ada8]">
                  Image URL
                </label>

                <input
                  required
                  type="url"
                  value={form.imageUrl}
                  onChange={(event) =>
                    updateField(
                      "imageUrl",
                      event.target.value
                    )
                  }
                  placeholder="https://..."
                  className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3 text-base text-white outline-none placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                />
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-[#101513] px-4 py-4">
                <div>
                  <p className="text-base font-medium text-white">
                    Active offer
                  </p>

                  <p className="mt-1 text-sm text-[#697772]">
                    Show this offer on the website
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    updateField(
                      "active",
                      event.target.checked
                    )
                  }
                  className="h-5 w-5 accent-[#315c55]"
                />
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#315c55] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#3b6b62] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Create offer"}
              </button>
            </form>
          </aside>
        </section>
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-offer-dialog-title"
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#151b19] p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-lg font-semibold text-red-400">
              !
            </div>

            <h2
              id="delete-offer-dialog-title"
              className="mt-5 text-xl font-semibold text-white"
            >
              Delete offer?
            </h2>

            <p className="mt-2 text-base leading-6 text-[#899691]">
              You are about to permanently delete{" "}
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
                  : "Delete offer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
