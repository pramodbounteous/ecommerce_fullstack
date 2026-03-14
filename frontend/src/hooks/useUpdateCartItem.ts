import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { updateCartItem } from "@/api/cart"
import type { Cart } from "@/api/cart"
import { useToast } from "@/components/providers/ToastProvider"

export function useUpdateCartItem() {

  const queryClient = useQueryClient()
  const { toast } = useToast()

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

      const previousCart = queryClient.getQueryData<Cart>(["cart"])

      queryClient.setQueryData<Cart>(["cart"], (old) => {

        if (!old) return old

        return {
          ...old,
          items: old.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          )
        }

      })

      return { previousCart }

    },

    onError: (error, _vars, context) => {
      const axiosError = error as AxiosError<{ message?: string }>

      queryClient.setQueryData(["cart"], context?.previousCart)
      toast({
        title: "Quantity update failed",
        description:
          axiosError.response?.data?.message ?? "Please review available stock and try again.",
        variant: "error"
      })

    },

    onSettled: () => {

      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })

    }

  })

}
