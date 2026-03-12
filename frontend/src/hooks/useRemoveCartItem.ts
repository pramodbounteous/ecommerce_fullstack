import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeCartItem } from "@/api/cart"

export function useRemoveCartItem() {

  const queryClient = useQueryClient()

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

    },

    onSettled: () => {

      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })

    }

  })

}