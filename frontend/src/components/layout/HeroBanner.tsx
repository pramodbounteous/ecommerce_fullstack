import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="page-section pt-6 md:pt-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_52%,_#0f766e_100%)] px-6 py-10 text-white shadow-[0_32px_90px_-42px_rgba(15,23,42,0.8)] sm:px-8 md:px-10 md:py-14">
        <div className="relative max-w-2xl space-y-6">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.26em] text-white/80">
              Spring Collection 2026
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Premium essentials for every day.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-white/78 sm:text-base">
                Discover trending tech, beauty, and lifestyle picks with fresh arrivals,
                standout deals, and easy checkout.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-white px-5 text-slate-950 hover:bg-white/90">
                <a href="#catalog">
                  Explore catalog
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/10 px-5 text-white hover:bg-white/16 hover:text-white"
              >
                <Link to="/register">Create account</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">New season arrivals</span>
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">Exclusive member deals</span>
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2">Fast doorstep delivery</span>
            </div>
        </div>
      </div>
    </section>
  )
}
