import ProductCard from "./ProductCard"

export default function ProductGrid() {

  const products = [
    {
      id: 1,
      title: "Smart Watch",
      price: 299,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      title: "Headphones",
      price: 199,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      title: "Speaker",
      price: 149,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 4,
      title: "Camera",
      price: 499,
      image: "https://via.placeholder.com/200"
    }
  ]

  return (

    <section className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {products.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
          />
        ))}

      </div>

    </section>

  )
}