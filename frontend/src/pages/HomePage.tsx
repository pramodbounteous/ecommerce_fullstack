import Navbar from "@/components/layout/Navbar"
import HeroBanner from "@/components/layout/HeroBanner"
import FeaturedProductsCarousel from "@/components/products/FeaturedProductsCarousel"
import ProductGrid from "@/components/products/ProductGrid"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <div className="page-shell">
      <Navbar />
      <HeroBanner />
      <FeaturedProductsCarousel />
      <ProductGrid />
      <Footer />
    </div>
  )
}
