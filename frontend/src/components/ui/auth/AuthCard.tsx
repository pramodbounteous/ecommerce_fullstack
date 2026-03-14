import type { ReactNode } from "react"

interface Props {
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.12),transparent_26%)]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/88 shadow-[0_36px_90px_-44px_rgba(15,23,42,0.5)] backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[linear-gradient(160deg,_#0f172a_0%,_#1d4ed8_55%,_#0f766e_100%)] p-10 text-white lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Shopwill</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">Sign in to save favorites, track orders, and shop faster.</h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
            Join Shopwill to unlock easy reorders, account updates, and exclusive picks.
          </p>
        </div>

        <div className="w-full p-8 sm:p-10">
          <div className="space-y-2">
            <p className="section-kicker">Account</p>
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <div className="mt-8 space-y-6">
            {children}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            By continuing, you agree to our Terms of service.
          </p>
        </div>
      </div>
    </div>
  )
}
