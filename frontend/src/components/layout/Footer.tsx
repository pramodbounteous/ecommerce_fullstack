export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-slate-950 text-slate-100">
      <div className="page-section py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-2 text-sm font-semibold text-primary-foreground">
                S
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Shopwill</h2>
                <p className="text-sm text-slate-400">Modern ecommerce experience</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Shop everyday favorites, seasonal picks, and trending essentials in one place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Browse</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Featured products</p>
              <p>Catalog search</p>
              <p>Cart and checkout</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Account</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Profile management</p>
              <p>Order tracking</p>
              <p>Secure sign in</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          New arrivals, popular picks, and easy shopping with Shopwill.
        </div>
      </div>
    </footer>
  )
}
