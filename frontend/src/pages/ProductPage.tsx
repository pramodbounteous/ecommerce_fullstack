import { useParams } from "react-router-dom"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import ProductGallery from "@/components/products/ProductGallery"
import ProductInfo from "@/components/products/ProductInfo"

import { useProduct } from "@/hooks/useProduct"

export default function ProductPage() {

  const { id } = useParams()

  const { data, isLoading } = useProduct(id!)

  if (isLoading) {
    return <div className="p-10">Loading...</div>
  }

  return (

    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 gap-20 items-center">

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