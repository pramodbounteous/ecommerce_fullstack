import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

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

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string
        errors?: {
          fieldErrors?: Record<string, string[]>
        }
      }>

      const fieldErrors = axiosError.response?.data?.errors?.fieldErrors
      const validationMessage = fieldErrors
        ? Object.values(fieldErrors).flat().join(", ")
        : null

      toast({
        title: "Checkout failed",
        description:
          axiosError.response?.data?.message ??
          validationMessage ??
          "Please verify your cart and shipping details.",
        variant: "error"
      })
    }

  })

}
