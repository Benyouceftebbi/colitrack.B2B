import type { Order } from "../data/sample-orders"
import { getAllWilayas, getCommunesByWilayaName, normalizeString } from "../data/algeria-regions"
import { isDeliveryTypeValid } from "../data/shipping-availability"
import { getNoastCommuneIdByWilaya } from "../data/noast-centers"

// Update the validateRegionData function to completely ignore commune for NOEST Express with stopdesk
export function validateRegionData(order: Order, shopData?: any) {
  const wilayaName = order.orderData.wilaya.name_fr.value
  const communeName = order.orderData.commune.name_fr.value
  const deliveryType = order.orderData.delivery_type.value
  const shippingProvider = shopData?.deliveryCompany?.toUpperCase()
  const isNoastExpress = shippingProvider === "NOEST EXPRESS"
  const isYalidinExpress = shippingProvider === "YALIDIN EXPRESS"
  const requiresStopDesk = isNoastExpress || isYalidinExpress

  // Check if wilaya exists
  const allWilayas = getAllWilayas()
  const wilayaExists = allWilayas.some((wilaya) => normalizeString(wilaya.name_ascii) === normalizeString(wilayaName))

  // Check if commune exists - for NOAST Express with stopdesk, commune is not required
  let communeExists = true // Default to true

  // For NOAST Express with stopdesk, commune validation is skipped entirely
  if (isNoastExpress && deliveryType === "stopdesk") {
    communeExists = true // Always valid for NOEST Express with stopdesk, regardless of value
  }
  // For NOAST Express with home delivery OR any other shipping provider, validate commune
  else if (!isNoastExpress || (isNoastExpress && deliveryType === "home")) {
    if (wilayaExists) {
      // For NOAST Express, if commune is undefined or same as wilaya, consider it valid
      if (isNoastExpress && (!communeName || normalizeString(communeName) === normalizeString(wilayaName))) {
        communeExists = true
      } else {
        const communes = getCommunesByWilayaName(wilayaName)
        communeExists = communes.some(
          (commune) => normalizeString(commune.commune_name_ascii) === normalizeString(communeName),
        )
      }
    } else {
      communeExists = false
    }
  }

  // Check if delivery type is valid for the commune
  // For NOEST Express with stopdesk, we skip commune-based validation
  let isDeliveryValid = true
  if (isNoastExpress && deliveryType === "stopdesk") {
    isDeliveryValid = true // Always valid for NOEST Express with stopdesk
  } else {
    isDeliveryValid = isDeliveryTypeValid(communeName, deliveryType, shippingProvider)
  }

  // Check if stop desk center is required and selected
  let stopDeskValid = true
  if (deliveryType === "stopdesk" && requiresStopDesk) {
    // Only for NOEST Express and Yalidin Express, stop desk selection is REQUIRED
    stopDeskValid = !!order.orderData.stop_desk?.id
  }

  return {
    wilayaValid: wilayaExists,
    communeValid: communeExists,
    deliveryTypeValid: isDeliveryValid,
    stopDeskValid: stopDeskValid,
    requiresStopDesk: requiresStopDesk,
  }
}

/**
 * Checks if an order has valid region data
 * @param order The order to check
 * @param shopData Optional shop data to check for shipping provider
 * @returns True if the order has valid region data, false otherwise
 */
export function hasValidRegionData(order: Order, shopData?: any): boolean {
  const validation = validateRegionData(order, shopData)
  return validation.wilayaValid && validation.communeValid && validation.deliveryTypeValid && validation.stopDeskValid
}

/**
 * Asynchronously checks all orders for validation issues
 * @param orders Array of orders to check
 * @param shopData Optional shop data to check for shipping provider
 * @returns Promise that resolves to an object with valid and invalid orders
 */
export async function checkOrdersForIssues(orders: Order[], shopData?: any) {
  console.log("Checking orders for issues:", orders)

  const validOrders: Order[] = []
  const invalidOrders: { order: Order; issues: string[] }[] = []

  for (const order of orders) {
    const validation = validateRegionData(order, shopData)
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

    // Check for stop desk validation
    if (!validation.stopDeskValid) {
      issues.push(`Missing stop desk selection for ${shopData?.deliveryCompany || "shipping provider"}`)
    }

    // Simulate checking with shipping provider API
    if (validation.wilayaValid && validation.communeValid) {
      const deliveryAvailable = await checkDeliveryAvailability(
        order.orderData.commune.name_fr.value,
        order.orderData.delivery_type.value,
        shopData?.deliveryCompany,
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
 * @param shippingProvider The shipping provider
 * @returns Promise that resolves to true if delivery is available
 */
export async function checkDeliveryAvailability(
  communeName: string,
  deliveryType: string,
  shippingProvider?: string,
): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Home delivery is always available
  if (deliveryType === "home") return true

  // For NOEST Express with stopdesk, always return true
  if (shippingProvider?.toUpperCase() === "NOEST EXPRESS" && deliveryType === "stopdesk") {
    return true
  }

  // For stop desk, check availability
  return isDeliveryTypeValid(communeName, deliveryType, shippingProvider)
}

// Helper function to find commune ID for NOEST Express
export function findNoestCommuneId(wilayaName: string): string | undefined {
  return getNoastCommuneIdByWilaya(wilayaName)
}

/**
 * Checks if an order is valid for export based on shipping provider
 * @param order The order to check
 * @param shopData Shop data containing shipping provider information
 * @returns True if the order is valid for export, false otherwise
 */
export function isOrderValidForExport(order: Order, shopData?: any): boolean {
  const validation = validateRegionData(order, shopData)

  const isNoestExpress = shopData?.deliveryCompany?.toUpperCase() === "NOEST EXPRESS"
  const isYalidinExpress = shopData?.deliveryCompany?.toUpperCase() === "YALIDIN EXPRESS"
  const requiresStopDesk = isNoestExpress || isYalidinExpress

  const missingStopDesk =
    order.orderData.delivery_type.value === "stopdesk" && requiresStopDesk && !order.orderData.stop_desk?.id

  // For NOEST Express with stopdesk, we don't need to validate commune at all
  if (isNoestExpress && order.orderData.delivery_type.value === "stopdesk") {
    return validation.wilayaValid && validation.stopDeskValid && !missingStopDesk
  } else {
    return (
      validation.wilayaValid &&
      validation.communeValid &&
      validation.deliveryTypeValid &&
      (!requiresStopDesk || validation.stopDeskValid) &&
      !missingStopDesk
    )
  }
}
