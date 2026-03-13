interface Props {
  order: any
}

export default function OrderCard({ order }: Props) {

  return (

    <div className="space-y-4 rounded-xl border bg-background p-6 shadow-sm">

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
            className="flex justify-between gap-4 text-sm"
          >

            <span>
              {item.product.title} × {item.quantity}
            </span>

            <span>${item.totalPrice.toFixed(2)}</span>

          </div>

        ))}

      </div>

    </div>

  )

}
