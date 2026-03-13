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
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <ProductDetailSkeleton />
        </div>
        <Footer />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12 text-center text-muted-foreground md:px-6">
          Product not found.
        </div>
        <Footer />
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-muted/20">

      <Navbar />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">

        <ProductGallery image={data.image} />

        <ProductInfo
          id={data.id}
          title={data.title}
          price={data.price}
          description={data.description}
        />

      </div>

      <Footer />

    </div>

  )

}
