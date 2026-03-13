import { useMutation, useQueryClient } from "@tanstack/react-query"

import { checkout } from "@/api/orders"
import { useToast } from "@/components/providers/ToastProvider"

export function useCheckout() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({

    mutationFn: ({
      paymentMethod,
      shippingAddress
    }: {
      paymentMethod: string
      shippingAddress: string
    }) =>
      checkout(paymentMethod, shippingAddress),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      })
      toast({
        title: "Order placed",
        description: "Your order has been created successfully.",
        variant: "success"
      })
    },

    onError: () => {
      toast({
        title: "Checkout failed",
        description: "Please verify your cart and shipping details.",
        variant: "error"
      })
    }

  })

}
