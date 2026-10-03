const steps = [
  {
    number: "01",
    title: "Imagine",
    description:
      "Tell us what you want to see, when you want to go, and how you want to experience Kashmir.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Together, shape the places, pace and experiences that make the journey yours.",
  },
  {
    number: "03",
    title: "Refine",
    description:
      "Take your time, adjust the details and make the journey feel just right.",
  },
  {
    number: "04",
    title: "Go",
    description:
      "Then leave the planning behind and let Kashmir tell the rest of the story.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#e9e2d5] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Intro */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#756b5d]">
              The Journey
            </p>

            <h2 className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-[#27241f] md:text-5xl">
              From the first idea
              <br />
              to the first view.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[#625b51] md:pb-1 md:text-base">
            Every journey begins differently. Yours starts with a
            conversation.
          </p>

        </div>

        {/* Story line */}
        <div className="relative mt-14">

          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-[#173F3F]/15 md:block" />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">

            {steps.map((step) => (
              <div key={step.number} className="relative">

                {/* Number */}
                <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#173F3F]/30 bg-[#e9e2d5]">
                  <div className="h-2 w-2 rounded-full bg-[#D6A85F]" />
                </div>

                {/* Content */}
                <div className="mt-5">

                  <p className="text-xs font-medium tracking-[0.2em] text-[#756b5d]">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-2xl font-medium tracking-tight text-[#173F3F] md:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#625b51]">
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Closing line */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px w-8 bg-[#D6A85F]" />

          <p className="text-xs uppercase tracking-[0.25em] text-[#756b5d]">
            And then, Kashmir
          </p>
        </div>

      </div>
    </section>
  )
}
