import { db } from "@/firebase/firebase"
import { doc, setDoc } from "firebase/firestore"

export async function updateShippingInfo(
  profileID: string,
  shippingInfo: {
    provider: string
    [key: string]: string
  },
) {
  try {
    const docRef = doc(db, "Shops", profileID)
    let updateData: { [key: string]: string } = {
      deliveryCompany: shippingInfo.provider,
    }

    if (shippingInfo.provider === "Yalidin Express") {
      if (!shippingInfo.apiId || !shippingInfo.apiToken || !shippingInfo.lng) {
        throw new Error("Missing required fields for Yalidin Express")
      }
      updateData = {
        ...updateData,
        apiKey: shippingInfo.apiId,
        apiToken: shippingInfo.apiToken,
        lng: shippingInfo.lng,

      }
    } else {
      if (!shippingInfo.apiKey || !shippingInfo.lng) {
        throw new Error(`Missing required fields for ${shippingInfo.provider}`)
      }
      updateData = {
        ...updateData,
        authToken: shippingInfo.apiKey,
        lng: shippingInfo.lng,
      }
    }

    // Remove any undefined values
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key])

    await setDoc(docRef, updateData, { merge: true })
    return { success: true, message: "Shipping information updated successfully" }
  } catch (error) {
    console.error("Error updating shipping information:", error)
    throw error
  }
}