"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  id: number
  initialStatus: string
}

const statuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
]

const statusStyles: Record<
  string,
  {
    dot: string
    text: string
    bg: string
    border: string
  }
> = {
  NEW: {
    dot: "bg-blue-400",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  CONTACTED: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  QUALIFIED: {
    dot: "bg-[#a7ad75]",
    text: "text-[#a7ad75]",
    bg: "bg-[#a7ad75]/10",
    border: "border-[#a7ad75]/20",
  },
  CONVERTED: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
}

export default function EnquiryStatusSelect({
  id,
  initialStatus,
}: Props) {
  const [status, setStatus] = useState(initialStatus)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])

  const updateStatus = async (newStatus: string) => {
    if (newStatus === status || saving) {
      setOpen(false)
      return
    }

    const previousStatus = status

    setStatus(newStatus)
    setOpen(false)
    setSaving(true)

    try {
      const token = localStorage.getItem("adminToken")
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

      const response = await fetch(
        `${apiUrl}/api/admin/enquiries/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken")
        window.location.replace("/admin/login")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      console.error(error)
      setStatus(previousStatus)
    } finally {
      setSaving(false)
    }
  }

  const currentStyle =
    statusStyles[status] ?? {
      dot: "bg-white/40",
      text: "text-white/60",
      bg: "bg-white/5",
      border: "border-white/10",
    }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        disabled={saving}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          flex min-w-[155px] items-center justify-between
          gap-4 rounded-lg border px-4 py-2.5
          text-sm font-medium
          transition-all duration-150
          ${currentStyle.bg}
          ${currentStyle.border}
          ${currentStyle.text}
          hover:brightness-125
          disabled:cursor-wait
          disabled:opacity-60
        `}
      >
        <span className="flex items-center gap-2.5">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${currentStyle.dot}`}
          />

          <span className="tracking-wide">
            {status.replace("_", " ")}
          </span>
        </span>

        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-[190px] overflow-hidden rounded-xl border border-white/10 bg-[#151b19] p-1.5 shadow-2xl shadow-black/40"
        >
          {statuses.map((item) => {
            const style = statusStyles[item]
            const selected = item === status

            return (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => updateStatus(item)}
                className={`
                  flex w-full items-center justify-between
                  rounded-lg px-3 py-2.5
                  text-left text-sm font-medium
                  transition-colors
                  ${
                    selected
                      ? "bg-white/5"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full ${style.dot}`}
                  />

                  <span className={style.text}>
                    {item.replace("_", " ")}
                  </span>
                </span>

                {selected && (
                  <svg
                    className="h-4 w-4 text-white/50"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0l-3.75-3.75a1 1 0 111.415-1.42l3.043 3.044 6.543-6.544a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
