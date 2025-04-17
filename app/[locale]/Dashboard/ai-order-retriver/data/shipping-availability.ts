/**
 * This file contains utility functions to check shipping availability
 * for different communes and delivery methods
 */

 import { normalizeString } from "./algeria-regions"
 import { getYalidinCentersForCommune } from "./yalidin-centers"
 import { getNoastCentersForCommune, getNoastCentersByWilaya } from "./noast-centers"
 import { findCommuneByNameAcrossWilayas } from "./algeria-regions"
 
 // Mock list of communes that don't have stop desk available
 // In a real application, this would come from an API call to the shipping provider
 const communesWithoutStopDesk: string[] = [
   "Ain Beida",
   "Tadjemout",
   "Hassi Delaa",
   
   "Tit",
   "Sebaa",
   "Oued Morra",
   "Tadjena",
   "Talassa",
 ]
 
 /**
  * Checks if stop desk delivery is available for a specific commune
  * @param communeName The name of the commune to check
  * @param shippingProvider The shipping provider to check (Yalidin Express or NOEST Express)
  * @returns True if stop desk is available, false otherwise
  */
 export function isStopDeskAvailable(communeName: string, shippingProvider?: string): boolean {
   // For NOEST Express, stop desk is always available regardless of commune
   if (shippingProvider?.toUpperCase() === "NOEST EXPRESS") {
     return true
   }
 
   if (!communeName) return false
 
   const normalizedCommuneName = normalizeString(communeName)
 
   // If a specific shipping provider is specified, check their centers
   if (shippingProvider) {
     if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS") {
       return getYalidinCentersForCommune(communeName).length > 0
     }
   }
 
   // Default check if no specific provider is specified
   // Check if the commune is in the list of communes without stop desk
   return !communesWithoutStopDesk.some((commune) => normalizeString(commune) === normalizedCommuneName)
 }
 
 /**
  * Simulates an async check with the shipping provider's API
  * to verify if a delivery method is available for a specific commune
  * @param communeName The name of the commune
  * @param deliveryType The delivery type to check ('home' or 'stopdesk')
  * @param shippingProvider The shipping provider to check
  * @returns Promise that resolves to true if delivery is available, false otherwise
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
   return isStopDeskAvailable(communeName, shippingProvider)
 }
 
 /**
  * Validates if the selected delivery type is available for the commune
  * @param communeName The name of the commune
  * @param deliveryType The selected delivery type ('home' or 'stopdesk')
  * @param shippingProvider The shipping provider to check
  * @returns True if the delivery type is valid for the commune, false otherwise
  */
 export function isDeliveryTypeValid(communeName: string, deliveryType: string, shippingProvider?: string): boolean {
   // Home delivery is always valid
   if (deliveryType === "home") return true
 
   // For NOEST Express with stopdesk, always return true
   if (shippingProvider?.toUpperCase() === "NOEST EXPRESS" && deliveryType === "stopdesk") {
     return true
   }
 
   // For stop desk, check availability
   return isStopDeskAvailable(communeName, shippingProvider)
 }
 
 /**
  * Gets the appropriate centers for a commune based on the shipping provider
  * @param communeName The name of the commune
  * @param shippingProvider The shipping provider (Yalidin Express or NOEST Express)
  * @returns Array of centers for the specified commune and shipping provider
  */
 export function getCentersForCommune(communeName: string, shippingProvider?: string): any[] {
   if (!shippingProvider) return []
 
   if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS") {
     return getYalidinCentersForCommune(communeName)
   } else if (shippingProvider.toUpperCase() === "NOEST EXPRESS") {
     // For NOEST Express, we need to get the wilaya name from the commune
     // This is a simplified approach - in a real app, you'd have a more robust way to get the wilaya
     const commune = findCommuneByNameAcrossWilayas(communeName)
     if (commune) {
       return getNoastCentersByWilaya(commune.wilaya_name_ascii)
     }
     return getNoastCentersForCommune(communeName)
   }
 
   return []
 }
 
 /**
  * Gets a center by ID from the appropriate shipping provider
  * @param centerId The ID of the center
  * @param shippingProvider The shipping provider (Yalidin Express or NOEST Express)
  * @returns The center if found, undefined otherwise
  */
 export function getCenterById(centerId: string | number, shippingProvider?: string): any | undefined {
   if (!shippingProvider) return undefined
 
   if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS") {
     const { getYalidinCenterById } = require("./yalidin-centers")
     return getYalidinCenterById(centerId)
   } else if (shippingProvider.toUpperCase() === "NOEST EXPRESS") {
     const { getNoastCenterById } = require("./noast-centers")
     return getNoastCenterById(centerId)
   }
 
   return undefined
 }
 