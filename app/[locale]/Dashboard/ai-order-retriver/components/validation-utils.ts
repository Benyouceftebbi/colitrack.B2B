import type { Order } from "../data/sample-orders"
import { getAllWilayas, getCommunesByWilayaName, normalizeString } from "../data/algeria-regions"

/**
 * Validates the region data (wilaya and commune) of an order
 * @param order The order to validate
 * @returns Object with validation results for wilaya and commune
 */
export function validateRegionData(order: Order) {
  const wilayaName = order.orderData.wilaya.name_fr.value
  const communeName = order.orderData.commune.name_fr.value

  // Check if wilaya exists
  const allWilayas = getAllWilayas()
  const wilayaExists = allWilayas.some((wilaya) => normalizeString(wilaya.name_ascii) === normalizeString(wilayaName))

  // Check if commune exists
  let communeExists = false
  if (wilayaExists) {
    const communes = getCommunesByWilayaName(wilayaName)
    communeExists = communes.some(
      (commune) => normalizeString(commune.commune_name_ascii) === normalizeString(communeName),
    )
  }

  return {
    wilayaValid: wilayaExists,
    communeValid: communeExists,
  }
}

/**
 * Checks if an order has valid region data
 * @param order The order to check
 * @returns True if the order has valid region data, false otherwise
 */
export function hasValidRegionData(order: Order): boolean {
  const validation = validateRegionData(order)
  return validation.wilayaValid && validation.communeValid
}
