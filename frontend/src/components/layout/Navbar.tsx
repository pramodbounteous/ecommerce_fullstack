import { Menu, ShoppingCart, User, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const closeMenu = () => setIsOpen(false)

  return (

    <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">

        <Link
          to="/"
          className="text-xl font-semibold tracking-tight"
          onClick={closeMenu}
        >
          Shopwill
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline">Orders</Button>
              </Link>
              <Link to="/cart">
                <Button variant="outline">Cart</Button>
              </Link>
              <Button onClick={() => void logout()}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/cart">
                <Button variant="outline">Cart</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>

      </div>

      {isOpen ? (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="size-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/orders" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    Orders
                  </Button>
                </Link>
                <Link to="/cart" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="size-4" />
                    Cart
                  </Button>
                </Link>
                <Button className="w-full" onClick={() => void logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/cart" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="size-4" />
                    Cart
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button className="w-full justify-start">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}

    </nav>

  )
}
