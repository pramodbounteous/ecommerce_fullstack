import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { addToCart } from "@/api/cart"
import { useToast } from "@/components/providers/ToastProvider"

export function useAddToCart() {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({
      productId,
      quantity
    }: {
      productId: number
      quantity: number
    }) => addToCart(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
      toast({
        title: "Added to cart",
        description: "The item is ready in your cart.",
        variant: "success"
      })
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>

      toast({
        title: "Could not add item",
        description:
          axiosError.response?.data?.message ?? "Please try again.",
        variant: "error"
      })
    }

  })

}
