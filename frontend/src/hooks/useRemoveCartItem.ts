import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeCartItem } from "@/api/cart"
import { useToast } from "@/components/providers/ToastProvider"

export function useRemoveCartItem() {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({

    mutationFn: (itemId: number) =>
      removeCartItem(itemId),

    onMutate: async (itemId) => {

      await queryClient.cancelQueries({ queryKey: ["cart"] })

      const previousCart = queryClient.getQueryData(["cart"])

      queryClient.setQueryData(["cart"], (old: any) => {

        if (!old) return old

        return {
          ...old,
          items: old.items.filter(
            (item: any) => item.id !== itemId
          )
        }

      })

      return { previousCart }

    },

    onError: (_err, _vars, context) => {

      queryClient.setQueryData(["cart"], context?.previousCart)
      toast({
        title: "Remove failed",
        description: "The cart item could not be removed.",
        variant: "error"
      })

    },

    onSuccess: () => {
      toast({
        title: "Item removed",
        description: "The item was removed from your cart.",
        variant: "success"
      })
    },

    onSettled: () => {

      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })

    }

  })

}
