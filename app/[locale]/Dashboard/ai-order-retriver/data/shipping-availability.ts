/**
 * This file contains utility functions to check shipping availability
 * for different communes and delivery methods
 */

 import { normalizeString } from "./algeria-regions"
 import { getYalidinCentersForCommune } from "./yalidin-centers"
 import { getNoastCentersForCommune, getNoastCentersByWilaya } from "./noast-centers"
 import { getZrEcomCentersForCommune, getZrEcomCentersByWilaya } from "./zr-ecom-centers"
 import { findCommuneByNameAcrossWilayas } from "./algeria-regions"
 import { httpsCallable } from "firebase/functions"
 import { functions } from "@/firebase/firebase"
 
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
  * @param shippingProvider The shipping provider to check (Yalidin Express, NOEST Express, or ZR Express)
  * @returns True if stop desk is available, false otherwise
  */
 export function isStopDeskAvailable(communeName: string, shippingProvider?: string): boolean {
   // For NOEST Express or ZR Express, stop desk is always available regardless of commune
   if (shippingProvider?.toUpperCase() === "NOEST EXPRESS" || shippingProvider?.toUpperCase() === "ZR EXPRESS" || shippingProvider?.toUpperCase() === "E-COM DELIVERY") {
     return true
   }
 
   if (!communeName) return false
 
   const normalizedCommuneName = normalizeString(communeName)
 
   // If a specific shipping provider is specified, check their centers
   if (shippingProvider) {
     if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS" ||shippingProvider.toUpperCase()=== "GUEPEX" ||shippingProvider.toUpperCase() === "YALITEC") {
       return getYalidinCentersForCommune(communeName).length > 0
     } else if (shippingProvider.toUpperCase() === "ZR EXPRESS" || shippingProvider.toUpperCase() === "E-COM DELIVERY") {
       return getZrEcomCentersForCommune(communeName).length > 0
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
 
   // For NOEST Express or ZR Express with stopdesk, always return true
   if (
     (shippingProvider?.toUpperCase() === "NOEST EXPRESS" || shippingProvider?.toUpperCase() === "ZR EXPRESS" ||shippingProvider?.toUpperCase() === "E-COM DELIVERY") &&
     deliveryType === "stopdesk"
   ) {
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
 
   // For NOEST Express or ZR Express with stopdesk, always return true
   if (
     (shippingProvider?.toUpperCase() === "NOEST EXPRESS" || shippingProvider?.toUpperCase() === "ZR EXPRESS" ||shippingProvider?.toUpperCase() === "E-COM DELIVERY") &&
     deliveryType === "stopdesk"
   ) {
     return true
   }
 
   // For stop desk, check availability
   return isStopDeskAvailable(communeName, shippingProvider)
 }
 
 /**
  * Gets the appropriate centers for a commune based on the shipping provider
  * @param communeName The name of the commune
  * @param shippingProvider The shipping provider (Yalidin Express, NOEST Express, or ZR Express)
  * @returns Array of centers for the specified commune and shipping provider
  */
 export function getCentersForCommune(communeName: string, shippingProvider?: string): any[] {
   if (!shippingProvider) return []
 
   if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS" || shippingProvider.toUpperCase() === "GUEPEX" || shippingProvider.toUpperCase() === "YALITEC" ) {
     return getYalidinCentersForCommune(communeName)
   } else if (shippingProvider.toUpperCase() === "NOEST EXPRESS") {
     // For NOEST Express, we need to get the wilaya name from the commune
     // This is a simplified approach - in a real app, you'd have a more robust way to get the wilaya
     const commune = findCommuneByNameAcrossWilayas(communeName)
     if (commune) {
       return getNoastCentersByWilaya(commune.wilaya_name_ascii)
     }
     return getNoastCentersForCommune(communeName)
   } else if (shippingProvider.toUpperCase() === "ZR EXPRESS" || shippingProvider.toUpperCase() ==="E-COM DELIVERY") {
     // For ZR Express, we need to get the wilaya name from the commune
     const commune = findCommuneByNameAcrossWilayas(communeName)
     if (commune) {
       return getZrEcomCentersByWilaya(commune.wilaya_name_ascii)
     }
     return getZrEcomCentersForCommune(communeName)
   }
 
   return []
 }
 
 /**
  * Gets a center by ID from the appropriate shipping provider
  * @param centerId The ID of the center
  * @param shippingProvider The shipping provider (Yalidin Express, NOEST Express, or ZR Express)
  * @returns The center if found, undefined otherwise
  */
 export function getCenterById(centerId: string | number, shippingProvider?: string): any | undefined {
   if (!shippingProvider) return undefined
 
   if (shippingProvider.toUpperCase() === "YALIDIN EXPRESS" || shippingProvider.toUpperCase() === "GUEPEX" || shippingProvider.toUpperCase() === "YALITEC") {
     const { getYalidinCenterById } = require("./yalidin-centers")
     return getYalidinCenterById(centerId)
   } else if (shippingProvider.toUpperCase() === "NOEST EXPRESS") {
     const { getNoastCenterById } = require("./noast-centers")
     return getNoastCenterById(centerId)
   } else if (shippingProvider.toUpperCase() === "ZR EXPRESS" || shippingProvider.toUpperCase()==="E-COM DELIVERY") {
     const { getZrEcomCenterByKey } = require("./zr-ecom-centers")
     return getZrEcomCenterByKey(centerId)
   }
 
   return undefined
 }
 
 /**
  * Uploads orders to the shipping provider's backend
  * @param shopdata The shop data containing API keys and other information
  * @param orders The orders to upload
  * @param deliveryCompany The delivery company to use
  * @returns Promise that resolves to a success object or a failure object with failed orders
  */
 export async function uploadOrders(
   shopdata: any,
   orders: any[],
   deliveryCompany: string | undefined,
 ): Promise<{ success: boolean; failed?: any[]; tokens: number }> {
   // In a real implementation, this would make API calls to the shipping provider
   // For demonstration purposes, we'll simulate some orders failing
 
   try {
     const failedOrders: any[] = []
     let tokens = 0

 
     // Simulate some random failures (about 10% of orders)
     const randomFail = Math.random() < 0.1
 
     // Check for specific validation issues based on shipping provider
     if (shopdata.deliveryCompany === "NOEST Express") {
       // For NOEST Express, check if commune ID is valid
       const uploadNoest = httpsCallable(functions, "uploadNoestOrders")
       const result = await uploadNoest({
         rawOrders: orders,
         apiKey: shopdata.apiKey,
         apiToken: shopdata.apiToken,
         shopId: shopdata.id,
       })
       if (result.data?.success === false) {
         failedOrders.push(
           ...result.data?.failed.map((order) => ({
             ...order,
             failureReason: "Backend validation failed",
           })),
         )
         tokens = result.data?.newTokens
       } else {
         tokens = result.data?.newTokens
       }
     } else if (shopdata.deliveryCompany.toUpperCase() === "YALIDIN EXPRESS" || shopdata.deliveryCompany.toUpperCase() === "GUEPEX" || shopdata.deliveryCompany.toUpperCase() === "YALITEC") {
       const uploadYalidine = httpsCallable(functions, "uploadYalidineOrders")
       const result = await uploadYalidine({
         rawOrders: orders,
         apiKey: shopdata.apiKey,
         apiToken: shopdata.apiToken,
         shopId: shopdata.id,
       })
       if (result.data?.success === false) {
         failedOrders.push(
           ...result.data?.failed.map((order) => ({
             ...order,
             failureReason: "Backend validation failed",
           })),
         )
         tokens = result.data?.newTokens
       } else {
         tokens = result.data?.newTokens
       }
     } else if (shopdata.deliveryCompany.toUpperCase() === "ZR EXPRESS"|| shopdata.deliveryCompany.toUpperCase() ==="E-COM DELIVERY") {
       // For ZR Express, use a similar approach as other providers
       const uploadZrExpress = httpsCallable(functions, "uploadZrOrders")
       const result = await uploadZrExpress({
         rawOrders: orders,
         apiKey: shopdata.apiKey,
         apiToken: shopdata.apiToken,
         shopId: shopdata.id,
       })
       if (result.data?.success === false) {
         failedOrders.push(
           ...result.data?.failed.map((order) => ({
             ...order,
             failureReason: "Backend validation failed",
           })),
         )
         tokens = result.data?.newTokens
       } else {
         tokens = result.data?.newTokens
       }
     } else if (shopdata.deliveryCompany.toUpperCase() === "DHD") {
       // For other providers, just use random failures
       const uploadDHD = httpsCallable(functions, "uploadDHDOrders")
       const result = await uploadDHD({ rawOrders: orders, authToken: shopdata.authToken, shopId: shopdata.id })
       if (result.data?.success === false) {
         failedOrders.push(
           ...result.data?.failed.map((order) => ({
             ...order,
             failureReason: "Backend validation failed",
           })),
         )
         tokens = result.data?.newTokens
       } else {
         tokens = result.data?.newTokens
       }
     } else {
       if (randomFail) {
         failedOrders.push({
           ...orders[0],
           failureReason: "Backend validation failed",
         })
       }
     }
 
     // If there are any failed orders, return them
     if (failedOrders.length > 0) {
       return {
         success: false,
         failed: failedOrders,
         tokens: tokens,
       }
     }
 
     // All orders were successful
     return {
       success: true,
       tokens: tokens,
     }
   } catch (error) {
     console.error("Error uploading orders:", error)
 
     // In case of an exception, return all orders as failed
     return {
       success: false,
       failed: orders.map((order) => ({
         ...order,
         failureReason: "API error: " + (error instanceof Error ? error.message : "Unknown error"),
       })),
     }
   }
 }
 