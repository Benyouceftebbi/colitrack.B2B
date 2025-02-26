"use client"
import { useShop } from "@/app/context/ShopContext"
import { functions } from "@/firebase/firebase"
import { httpsCallable } from "firebase/functions"
import * as React from "react"

export function useMessageCenter() {
  const {shopData,setShopData}=useShop()
 const token=shopData?.token||0
 const senderId=shopData?.senderId|| "Colitrack"
 const templateKeys = ["expedited", "out_for_delivery", "stop_desk"];
 const selectedTemplates = React.useMemo(() => {

  
   return templateKeys.filter((key) => shopData?.hasOwnProperty(key));
 }, [shopData]);
  const [previewTemplate, setPreviewTemplate] = React.useState<string | null>(null)



const toggleTemplate = React.useCallback(async (templateId: string) => {
  const updateTrackingTemplates = httpsCallable(functions, "updateTrackingTemplates");

  setShopData((prev) => {
    if (!prev) return prev; // Handle case where shopData is undefined

    const updatedData = { ...prev };

    if (prev[templateId]) {
      // Key exists, so remove it
      delete updatedData[templateId];
    } else {
      // Key doesn't exist, so add it (You may need to set a default value)
      updatedData[templateId] = true;
    }

    return updatedData;
  });

  try {
    await updateTrackingTemplates({ templateId });
  } catch (error) {
    console.error("Error updating tracking templates:", error);
   }
}, [setShopData]);
 

  return {
    token,
    senderId,
    selectedTemplates,
    toggleTemplate,
    previewTemplate,
    setPreviewTemplate
  }
}