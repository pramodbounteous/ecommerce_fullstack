import { useMutation } from "@tanstack/react-query"
import { checkout } from "@/api/orders"

export function useCheckout() {

  return useMutation({

    mutationFn: ({
      paymentMethod,
      shippingAddress
    }: {
      paymentMethod: string
      shippingAddress: string
    }) =>
      checkout(paymentMethod, shippingAddress)

  })

}