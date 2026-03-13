import Navbar from "@/components/layout/Navbar"
import HeroBanner from "@/components/layout/HeroBanner"
import FeaturedProductsCarousel from "@/components/products/FeaturedProductsCarousel"
import ProductGrid from "@/components/products/ProductGrid"
import Footer from "@/components/layout/Footer"

export default function HomePage() {

  return (

    <div className="min-h-screen bg-muted/20">

      <Navbar />

      <HeroBanner />

      <FeaturedProductsCarousel />

      <ProductGrid />

      <Footer />

    </div>

  )
}
