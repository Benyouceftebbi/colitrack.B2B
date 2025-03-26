import React, { createContext, useContext, useEffect, useState,ReactNode } from 'react';
import { doc, getDoc, getDocs, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import {
    Sidebar as SidebarPrimitive,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarInset,
  } from '@/components/ui/sidebar'
  import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
interface ShopContextType {
 shopData: any; // Define the type based on your shop data structure
 loading: boolean;
 error: string | null;
 setShopData:any
 setShops:any
 shops:any
}
const ShopContext = createContext<ShopContextType | undefined>(undefined);
export const ShopProvider: React.FC<{ userId: string;userEmail:string;children: ReactNode }> = ({ userId,userEmail, children }) => {
 const [shopData, setShopData] = useState<any>(null);
 const [shops,setShops]=useState<any>([])
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {

  
const fetchShopData = async () => {

  
    if (!userEmail) {
      console.log("hello how are you");
      
      setLoading(false);
      return;
    }

    try {
   
  
      // Query Firestore for all shops where email matches userEmail
      const shopsQuery = query(collection(db, "Shops"), where("email", "==", userEmail));

      const shopDocs = await getDocs(shopsQuery);
      console.log("dasasdasd2222226655",userEmail);
console.log("mamam",shopDocs.size);

      if (shopDocs.empty) {
        console.log("dasasdasd");
        
        setError("No shop data found");
        setLoading(false);
        return;
      }

      const fetchedShops = [];

      for (const shopDoc of shopDocs.docs) {
        const shopData = { ...shopDoc.data(), id: shopDoc.id };


        // Reference to shop document
        const shopRef = doc(db, "Shops", shopDoc.id);

        // Fetch subcollections in parallel
        const [smsDocs, trackingDocs, smsCampaignDocs] = await Promise.all([
          getDocs(collection(shopRef, "SMS")),
          getDocs(collection(shopRef, "Tracking")),
          getDocs(collection(shopRef, "SMScampaign")),
        ]);

        const trackingMap = {};
        const smsData = [];
        const trackingData=[]
        // Process tracking and SMS data in a single loop
        trackingDocs.docs.forEach((trackingDoc) => {
          const trackingInfo = { ...trackingDoc.data(), id: trackingDoc.id };
          trackingMap[trackingDoc.id] = trackingInfo.lastStatus || null;

          // Find corresponding SMS documents
          const relatedSmsDocs = smsDocs.docs.filter(smsDoc => smsDoc.data().trackingId === trackingInfo.id);
          const messageTypes = relatedSmsDocs.map(smsDoc => smsDoc.data().type);

          // Add messageTypes to trackingInfo
          trackingInfo.messageTypes = messageTypes;
          trackingInfo.phoneNumber = trackingInfo.data.contact_phone || trackingInfo.data.phone;
          // Add trackingInfo to trackingData
          trackingData.push(trackingInfo);
        });

        // Process SMS data
        smsDocs.docs.forEach((smsDoc) => {
          smsData.push({
            ...smsDoc.data(),
            id: smsDoc.id,
            lastStatus: trackingMap[smsDoc.data().trackingId] || null, // Match lastStatus
          });
        });

        // Process SMS campaigns
        const smsCampaignData = smsCampaignDocs.docs.map((smsDoc) => ({
          ...smsDoc.data(),
          id: smsDoc.id,
        }));

        // Attach subcollections
        shopData.sms = smsData;
        shopData.tracking = trackingData;
        shopData.smsCampaign = smsCampaignData;

        fetchedShops.push(shopData);
      }

      // Set the first retrieved shop as the main shopData
      setShopData(fetchedShops[0] || null);
      setShops(fetchedShops);
    } catch (err) {
      setError("Error fetching shop data");
    } finally {
      setLoading(false);
    }
  };

  fetchShopData();
}, [userEmail])

 if(loading===false && shopData){
  return (
   <ShopContext.Provider value={{ shopData, loading, error,setShopData,setShops,shops}}>
     {children}
   </ShopContext.Provider>
 );
}
 return(
  <div className="flex h-screen overflow-hidden w-full">
 <SidebarPrimitive>
<SidebarHeader className="p-4">
  <Skeleton className="h-8 w-8 rounded-full" />
</SidebarHeader>
<SidebarContent>
  <SidebarMenu>
    {[...Array(5)].map((_, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuButton asChild>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
</SidebarContent>
<SidebarFooter className="p-4">
  <SidebarMenuButton asChild className="w-full">
    <div className="flex items-center">
      <Skeleton className="h-4 w-4 mr-2" />
      <Skeleton className="h-4 w-16" />
    </div>
  </SidebarMenuButton>
</SidebarFooter>
</SidebarPrimitive>
  <SidebarInset className="flex-1 overflow-auto">
  <div className="min-h-screen bg-background p-2 sm:p-4 md:p-8">
<div className="container mx-auto space-y-4 sm:space-y-6 md:space-y-8">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <Skeleton className="h-8 w-64" />
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </div>

  <div className="grid gap-2 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
     <Card key={index} className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
     <CardContent className="p-2 sm:p-4 md:p-6">
       <div className="flex items-center justify-between">
         <div>
           <Skeleton className="h-4 w-20 mb-2" />
           <Skeleton className="h-6 w-24" />
         </div>
         <Skeleton className="h-8 w-8 rounded-full" />
       </div>
       <div className="mt-2 sm:mt-4">
         <Skeleton className="h-2 w-full" />
       </div>
       <div className="mt-1 sm:mt-2">
         <Skeleton className="h-4 w-24" />
       </div>
     </CardContent>
   </Card>
    ))}
  </div>

  <div className="grid gap-2 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  </div>

  <Card>
    <CardHeader>
      <CardTitle><Skeleton className="h-6 w-36" /></CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
  </Card>
</div>
</div>
  </SidebarInset>
</div>
)
}

export const useShop = () => {
 const context = useContext(ShopContext);
 if (context === undefined) {
   throw new Error("useShop must be used within a ShopProvider");
 }
 return context;
}