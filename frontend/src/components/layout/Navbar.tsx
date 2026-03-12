import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {

  return (

    <nav className="bg-white border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl font-semibold"
        >
            Shopwill
        </Link>

        <div className="flex gap-4">

          <Link to="/login">
            <Button variant="outline">
              Login
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="outline">
              Cart
            </Button>
          </Link>

          <Link to="/register">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              Register
            </Button>
          </Link>

        </div>

      </div>

    </nav>

  )
}