import { House, LogOut, Menu, Package, ShoppingBag, ShoppingCart, User, X } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/hooks/useCart"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const { data: cart } = useCart(isAuthenticated)
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)
  const isActive = (path: string) => location.pathname === path
  const cartCount = (cart?.items ?? []).reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-40 border-b border-white/70 bg-background/80 backdrop-blur-xl">
      <div className="page-section">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <span className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                S
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight">Shopwill</p>
                <p className="text-xs text-muted-foreground">Curated everyday essentials</p>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white hover:text-foreground",
                isActive("/") && "bg-white text-foreground shadow-sm"
              )}
            >
              Home
            </Link>

            <a
              href="/#catalog"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white hover:text-foreground"
            >
              Catalog
            </a>

            <Link to="/cart">
              <Button variant={isActive("/cart") ? "default" : "outline"} className="rounded-full px-4">
                <ShoppingCart className="size-4" />
                Cart
                {cartCount > 0 ? (
                  <span className={cn(
                    "ml-1 inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold",
                    isActive("/cart")
                      ? "bg-white/20 text-white"
                      : "bg-primary text-primary-foreground"
                  )}>
                    {cartCount}
                  </span>
                ) : null}
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/orders">
                  <Button variant={isActive("/orders") ? "default" : "outline"} className="rounded-full px-4">
                    <Package className="size-4" />
                    Orders
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant={isActive("/profile") ? "default" : "outline"} className="rounded-full px-4">
                    <User className="size-4" />
                    Profile
                  </Button>
                </Link>
                <Button className="rounded-full px-4" onClick={() => void logout()}>
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="rounded-full px-4">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full px-4">
                    <ShoppingBag className="size-4" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/70 bg-background/95 md:hidden">
          <div className="page-section py-4">
            <div className="section-panel flex flex-col gap-2 p-3">
              <Link to="/" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                  <House className="size-4" />
                  Home
                </Button>
              </Link>
              <a href="/#catalog" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                  <ShoppingBag className="size-4" />
                  Catalog
                </Button>
              </a>
              <Link to="/cart" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                  <ShoppingCart className="size-4" />
                  Cart
                  {cartCount > 0 ? (
                    <span className="ml-auto inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      {cartCount}
                    </span>
                  ) : null}
                </Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/orders" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                      <Package className="size-4" />
                      Orders
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                      <User className="size-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button className="w-full rounded-xl py-5" onClick={() => void logout()}>
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl px-4 py-5">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button className="w-full justify-start rounded-xl px-4 py-5">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
