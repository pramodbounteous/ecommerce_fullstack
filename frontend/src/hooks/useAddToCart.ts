import { useMutation, useQueryClient } from "@tanstack/react-query"
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
    onError: () => {
      toast({
        title: "Could not add item",
        description: "Please try again.",
        variant: "error"
      })
    }

  })

}
