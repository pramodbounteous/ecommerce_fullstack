import ProductCard from "./ProductCard"
import { useProducts } from "@/hooks/useProducts"

export default function ProductGrid() {

  const { data, isLoading } = useProducts()

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading products...
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20">
        No products available
      </div>
    )
  }

  return (

    <section className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {data.map((product: any) => (

          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.productImg}
          />

        ))}

      </div>

    </section>

  )
}