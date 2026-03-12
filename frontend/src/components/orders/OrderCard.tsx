interface Props {
  order: any
}

export default function OrderCard({ order }: Props) {

  return (

    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      <div className="flex justify-between">

        <h3 className="font-semibold">
          Order #{order.id}
        </h3>

        <span className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>

      </div>

      <div className="space-y-2">

        {order.items.map((item: any) => (

          <div
            key={item.id}
            className="flex justify-between text-sm"
          >

            <span>
              {item.product.title} × {item.quantity}
            </span>

            <span>
              ${item.totalPrice}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}