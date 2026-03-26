import api from "@/lib/api"

export interface SavedAddress {
  id: number
  label: string
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string | null
  city: string
  state: string
  country: string
  pincode: string
}

export interface SavedAddressInput {
  label: string
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  pincode: string
}

interface AddressApiRecord {
  id: number
  label?: string | null
  fullName?: string | null
  email?: string | null
  phone?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  street?: string | null
  city: string
  state: string
  country: string
  pincode: string
}

function normalizeSavedAddress(address: AddressApiRecord): SavedAddress {
  const addressLine1 = address.addressLine1 ?? address.street ?? ""

  return {
    id: address.id,
    label: address.label?.trim() || `${address.city} address`,
    fullName: address.fullName?.trim() || "",
    email: address.email?.trim() || "",
    phone: address.phone?.trim() || "",
    addressLine1,
    addressLine2: address.addressLine2 ?? "",
    city: address.city,
    state: address.state,
    country: address.country,
    pincode: address.pincode
  }
}

function toAddressApiPayload(data: SavedAddressInput) {
  return {
    ...data,
    // Backward compatibility for the currently deployed backend,
    // which still validates `street` instead of `addressLine1`.
    street: data.addressLine1
  }
}

export const getSavedAddresses = async () => {
  const res = await api.get("/users/address")
  return (res.data.data as AddressApiRecord[]).map(normalizeSavedAddress)
}

export const createSavedAddress = async (data: SavedAddressInput) => {
  const res = await api.post("/users/address", toAddressApiPayload(data))
  return normalizeSavedAddress(res.data.data as AddressApiRecord)
}

export const updateSavedAddress = async (id: number, data: SavedAddressInput) => {
  const res = await api.patch(`/users/address/${id}`, toAddressApiPayload(data))
  return normalizeSavedAddress(res.data.data as AddressApiRecord)
}

export const removeSavedAddress = async (id: number) => {
  await api.delete(`/users/address/${id}`)
}

export function formatSavedAddress(address: SavedAddress) {
  return [
    address.fullName,
    address.addressLine1,
    address.addressLine2,
    `${address.city}, ${address.state} ${address.pincode}`,
    address.country,
    `Phone: ${address.phone}`
  ]
    .filter(Boolean)
    .join(", ")
}
