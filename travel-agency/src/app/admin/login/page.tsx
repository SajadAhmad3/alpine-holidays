"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      )

      if (!response.ok) {
        setError("Invalid username or password.")
        return
      }

      const data = await response.json()

      localStorage.setItem("adminToken", data.token)

      router.push("/admin")
    } catch (error) {
      console.error(error)

      setError(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f0e] text-[#f1f4f2]">

      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large soft glow */}
        <div className="absolute left-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#315c55]/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[550px] w-[550px] rounded-full bg-[#315c55]/10 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Mountain drawing */}
        <svg
          className="absolute bottom-0 left-0 h-[52vh] w-full opacity-[0.28]"
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 560L170 400L260 475L430 250L520 355L700 110L865 315L950 235L1130 420L1250 300L1440 505V620H0V560Z"
            fill="#151f1c"
          />

          <path
            d="M0 560L170 400L260 475L430 250L520 355L700 110L865 315L950 235L1130 420L1250 300L1440 505"
            stroke="#315c55"
            strokeWidth="2"
          />

          <path
            d="M0 600L230 470L355 530L520 390L650 465L820 290L940 410L1090 350L1240 470L1440 390"
            stroke="#7da79d"
            strokeWidth="1"
            opacity="0.45"
          />

          <path
            d="M0 615L180 520L310 570L470 455L590 525L760 390L900 500L1050 430L1190 520L1320 460L1440 500"
            stroke="#ffffff"
            strokeWidth="1"
            opacity="0.12"
          />
        </svg>

        {/* Horizon glow */}
        <div className="absolute bottom-[18%] left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#315c55]/40 to-transparent" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(11,15,14,0.35)_60%,#0b0f0e_100%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#315c55] text-base font-semibold text-white">
              A
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-white">
                Alpine Dream
              </p>

              <p className="text-xs text-[#697772]">
                Admin Console
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              Secure access
            </span>
          </div>
        </header>

        {/* Center */}
        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[430px]">

            {/* Intro */}
            <div className="mb-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#7da79d]">
                Alpine Dream · Operations
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Admin Console
              </h1>

              <p className="mt-3 max-w-md text-base leading-7 text-[#899691]">
                Manage travel offers and customer enquiries
                from one place.
              </p>
            </div>

            {/* Login card */}
            <div className="rounded-xl border border-white/10 bg-[#151b19]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#315c55]/30 bg-[#315c55]/10 text-[#7da79d]">
                  →
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Sign in
                  </h2>

                  <p className="text-sm text-[#697772]">
                    Administrator access
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-[#a2ada8]"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    required
                    autoComplete="username"
                    autoFocus
                    placeholder="Enter username"
                    className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#a2ada8]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    autoComplete="current-password"
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-white/10 bg-[#101513] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#315c55] focus:ring-1 focus:ring-[#315c55]/40"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                    <p className="text-sm leading-5 text-red-400">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#315c55] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#3b6b62] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {loading
                      ? "Signing in..."
                      : "Sign in"}
                  </span>

                  {!loading && (
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </form>

              {/* Security footer */}
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-xs text-[#697772]">
                  Protected administrator access
                </span>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-[#697772]">
              Alpine Dream Admin Console
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
