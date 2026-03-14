export interface SavedAddress {
  id: string
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

const savedAddressesKey = (userId: number) => `savedAddresses:${userId}`

export function getSavedAddresses(userId?: number) {
  if (!userId) {
    return [] as SavedAddress[]
  }

  const rawValue = localStorage.getItem(savedAddressesKey(userId))

  if (!rawValue) {
    return [] as SavedAddress[]
  }

  try {
    return JSON.parse(rawValue) as SavedAddress[]
  } catch {
    localStorage.removeItem(savedAddressesKey(userId))
    return [] as SavedAddress[]
  }
}

export function setSavedAddresses(userId: number, addresses: SavedAddress[]) {
  localStorage.setItem(savedAddressesKey(userId), JSON.stringify(addresses))
}

export function saveAddress(userId: number, address: SavedAddress) {
  const addresses = getSavedAddresses(userId)
  const existingIndex = addresses.findIndex((item) => item.id === address.id)

  if (existingIndex >= 0) {
    addresses[existingIndex] = address
  } else {
    addresses.unshift(address)
  }

  setSavedAddresses(userId, addresses)
  return addresses
}

export function removeSavedAddress(userId: number, addressId: string) {
  const addresses = getSavedAddresses(userId).filter((item) => item.id !== addressId)
  setSavedAddresses(userId, addresses)
  return addresses
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
