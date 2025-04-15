/**
 * This file contains utility functions to check shipping availability
 * for different communes and delivery methods
 */

 import { normalizeString } from "./algeria-regions"

 // Mock list of communes that don't have stop desk available
 // In a real application, this would come from an API call to the shipping provider
 const communesWithoutStopDesk: string[] = [
   "Ain Beida",
   "Tadjemout",
   "Hassi Delaa",
   "Hai 350 Maskan",
   "Tit",
   "Sebaa",
   "Oued Morra",
   "Tadjena",
   "Talassa",
 ]
 
 /**
  * Checks if stop desk delivery is available for a specific commune
  * @param communeName The name of the commune to check
  * @returns True if stop desk is available, false otherwise
  */
 export function isStopDeskAvailable(communeName: string): boolean {
   if (!communeName) return false
 
   const normalizedCommuneName = normalizeString(communeName)
 
   // Check if the commune is in the list of communes without stop desk
   return !communesWithoutStopDesk.some((commune) => normalizeString(commune) === normalizedCommuneName)
 }
 
 /**
  * Simulates an async check with the shipping provider's API
  * to verify if a delivery method is available for a specific commune
  * @param communeName The name of the commune
  * @param deliveryType The delivery type to check ('home' or 'stopdesk')
  * @returns Promise that resolves to true if delivery is available, false otherwise
  */
 export async function checkDeliveryAvailability(communeName: string, deliveryType: string): Promise<boolean> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 300))
 
   // Home delivery is always available
   if (deliveryType === "home") return true
 
   // For stop desk, check availability
   return isStopDeskAvailable(communeName)
 }
 
 /**
  * Validates if the selected delivery type is available for the commune
  * @param communeName The name of the commune
  * @param deliveryType The selected delivery type ('home' or 'stopdesk')
  * @returns True if the delivery type is valid for the commune, false otherwise
  */
 export function isDeliveryTypeValid(communeName: string, deliveryType: string): boolean {
   // Home delivery is always valid
   if (deliveryType === "home") return true
 
   // For stop desk, check availability
   return isStopDeskAvailable(communeName)
 }
 