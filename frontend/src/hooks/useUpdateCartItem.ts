import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCartItem } from "@/api/cart"

export function useUpdateCartItem() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: ({
      itemId,
      quantity
    }: {
      itemId: number
      quantity: number
    }) => updateCartItem(itemId, quantity),

    onMutate: async ({ itemId, quantity }) => {

      await queryClient.cancelQueries({ queryKey: ["cart"] })

      const previousCart = queryClient.getQueryData(["cart"])

      queryClient.setQueryData(["cart"], (old: any) => {

        if (!old) return old

        return {
          ...old,
          items: old.items.map((item: any) =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          )
        }

      })

      return { previousCart }

    },

    onError: (_err, _vars, context) => {

      queryClient.setQueryData(["cart"], context?.previousCart)

    },

    onSettled: () => {

      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })

    }

  })

}