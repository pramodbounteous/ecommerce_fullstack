import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function HeroBanner() {

  return (

    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">

      <div className="rounded-2xl bg-slate-800 px-6 py-10 text-white sm:px-8 md:px-10">

        <div className="max-w-xl space-y-4">

          <h2 className="text-sm uppercase tracking-[0.24em] text-gray-300">
            Best deals online
          </h2>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Smart Wearable
          </h1>

          <p className="max-w-md text-sm text-gray-300 sm:text-base">
            Up to 80% off
          </p>

          <Button asChild>
            <Link to="/">Shop Now</Link>
          </Button>

        </div>

      </div>

    </section>

  )
}
