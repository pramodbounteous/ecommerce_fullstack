import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart } from "@/api/cart"

export function useAddToCart() {

  const queryClient = useQueryClient()

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
    }

  })

}