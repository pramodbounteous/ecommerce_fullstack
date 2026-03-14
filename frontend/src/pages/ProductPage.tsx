import { useParams } from "react-router-dom"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import ProductGallery from "@/components/products/ProductGallery"
import ProductInfo from "@/components/products/ProductInfo"
import ProductDetailSkeleton from "@/components/products/ProductDetailSkeleton"

import { useProduct } from "@/hooks/useProduct"

export default function ProductPage() {

  const { id } = useParams()

  const { data, isLoading } = useProduct(id!)

  if (isLoading) {
    return (
      <div className="page-shell">
        <Navbar />
        <div className="page-section py-12 md:py-14">
          <ProductDetailSkeleton />
        </div>
        <Footer />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="page-shell">
        <Navbar />
        <div className="page-section py-12 md:py-14">
          <div className="section-panel py-16 text-center text-muted-foreground">
            Product not found.
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-section py-10 md:py-14">
        <div className="mb-8">
          <p className="section-kicker">Product page</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Product details</h1>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ProductGallery image={data.image} />

        <ProductInfo
          id={data.id}
          title={data.title}
          price={data.price}
          description={data.description}
          stock={data.stock}
        />
        </div>
      </div>
      <Footer />
    </div>
  )
}
