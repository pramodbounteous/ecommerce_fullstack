import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import {
  createSavedAddress,
  getSavedAddresses,
  removeSavedAddress,
  updateSavedAddress,
  type SavedAddressInput
} from "@/api/addresses"
import { useToast } from "@/components/providers/ToastProvider"

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{
    message?: string
    errors?: {
      fieldErrors?: Record<string, string[]>
    }
  }>

  const fieldErrors = axiosError.response?.data?.errors?.fieldErrors

  return (
    axiosError.response?.data?.message ??
    (fieldErrors ? Object.values(fieldErrors).flat().join(", ") : null) ??
    "Address request failed."
  )
}

export function useSavedAddresses(enabled = true) {
  return useQuery({
    queryKey: ["saved-addresses"],
    queryFn: getSavedAddresses,
    enabled
  })
}

export function useSaveAddress() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id?: number
      data: SavedAddressInput
    }) => (id ? updateSavedAddress(id, data) : createSavedAddress(data)),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["saved-addresses"]
      })
      toast({
        title: variables.id ? "Address updated" : "Address saved",
        description: "Your delivery address is ready for checkout.",
        variant: "success"
      })
    },

    onError: (error) => {
      toast({
        title: "Address save failed",
        description: getErrorMessage(error),
        variant: "error"
      })
    }
  })
}

export function useDeleteAddress() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: number) => removeSavedAddress(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-addresses"]
      })
      toast({
        title: "Address removed",
        description: "The saved address was deleted from your profile.",
        variant: "success"
      })
    },

    onError: (error) => {
      toast({
        title: "Address delete failed",
        description: getErrorMessage(error),
        variant: "error"
      })
    }
  })
}
