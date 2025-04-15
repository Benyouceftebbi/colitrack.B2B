import type { Order } from "../data/sample-orders"
import { getAllWilayas, getCommunesByWilayaName, normalizeString } from "../data/algeria-regions"
import { isDeliveryTypeValid } from "../data/shipping-availability"

/**
 * Validates the region data (wilaya and commune) of an order
 * @param order The order to validate
 * @returns Object with validation results for wilaya, commune, and delivery type
 */
export function validateRegionData(order: Order) {
  const wilayaName = order.orderData.wilaya.name_fr.value
  const communeName = order.orderData.commune.name_fr.value
  const deliveryType = order.orderData.delivery_type.value

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

  // Check if delivery type is valid for the commune
  const isDeliveryValid = isDeliveryTypeValid(communeName, deliveryType)

  return {
    wilayaValid: wilayaExists,
    communeValid: communeExists,
    deliveryTypeValid: isDeliveryValid,
  }
}

/**
 * Checks if an order has valid region data
 * @param order The order to check
 * @returns True if the order has valid region data, false otherwise
 */
export function hasValidRegionData(order: Order): boolean {
  const validation = validateRegionData(order)
  return validation.wilayaValid && validation.communeValid && validation.deliveryTypeValid
}

/**
 * Asynchronously checks all orders for validation issues
 * @param orders Array of orders to check
 * @returns Promise that resolves to an object with valid and invalid orders
 */
export async function checkOrdersForIssues(orders: Order[]) {
  console.log("Checking orders for issues:", orders)

  const validOrders: Order[] = []
  const invalidOrders: { order: Order; issues: string[] }[] = []

  for (const order of orders) {
    const validation = validateRegionData(order)
    const issues: string[] = []

    if (!validation.wilayaValid) {
      issues.push("Invalid wilaya")
    }

    if (!validation.communeValid) {
      issues.push("Invalid commune")
    }

    if (!validation.deliveryTypeValid) {
      issues.push("Invalid delivery type for this commune")
    }

    // Simulate checking with shipping provider API
    if (validation.wilayaValid && validation.communeValid) {
      const deliveryAvailable = await checkDeliveryAvailability(
        order.orderData.commune.name_fr.value,
        order.orderData.delivery_type.value,
      )

      if (!deliveryAvailable) {
        if (order.orderData.delivery_type.value === "stopdesk") {
          issues.push("Stop desk not available in this commune")
        } else {
          issues.push("Delivery not available in this commune")
        }
      }
    }

    if (issues.length === 0) {
      validOrders.push(order)
    } else {
      invalidOrders.push({ order, issues })
    }
  }

  console.log("Valid orders:", validOrders)
  console.log("Invalid orders:", invalidOrders)

  return {
    validOrders,
    invalidOrders,
  }
}

/**
 * Asynchronously checks delivery availability with the shipping provider
 * @param communeName The commune name
 * @param deliveryType The delivery type
 * @returns Promise that resolves to true if delivery is available
 */
export async function checkDeliveryAvailability(communeName: string, deliveryType: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Home delivery is always available
  if (deliveryType === "home") return true

  // For stop desk, check availability
  return isDeliveryTypeValid(communeName, deliveryType)
}
