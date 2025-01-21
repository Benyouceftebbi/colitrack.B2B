"use client"
import { useShop } from "@/app/context/ShopContext"
import * as React from "react"

export function useMessageCenter() {
  const {shopData,setShopData}=useShop()
 const token=shopData?.token||0
 const senderId=shopData?.senderId|| "Colitrack"
  const [selectedTemplates, setSelectedTemplates] = React.useState<string[]>([])
  const [previewTemplate, setPreviewTemplate] = React.useState<string | null>(null)


  const toggleTemplate = React.useCallback((templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  }, []);

  React.useEffect(() => {
    setShopData(prevShopData => {
      const updatedShopData = { ...prevShopData };
      selectedTemplates.forEach(templateId => {
        updatedShopData[templateId] = true;
      });
      Object.keys(updatedShopData).forEach(key => {
        if (key.startsWith('template') && !selectedTemplates.includes(key)) {
          updatedShopData[key] = false;
        }
      });
      return updatedShopData;
    });
  }, [selectedTemplates, setShopData]);

  return {
    token,
    senderId,
    selectedTemplates,
    toggleTemplate,
    previewTemplate,
    setPreviewTemplate
  }
}