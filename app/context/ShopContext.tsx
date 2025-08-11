"use client"
import { ArrowUpRight, Box, CheckCircle, Clock, Package, Truck } from "lucide-react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { doc, getDocs, collection, onSnapshot, query, where, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import type { DateRange } from "react-day-picker"

interface ShopData {
  id?: string
  senderId?: string
  smsToken?: string
  tokens?: number
  smsReminder?: string[]
  senderIdRequest?: {
    status: string
    requestDate: Date
    expectedDeliveryDate: Date
    senderId: string
  }
  deliveryCompany?: string
  orders?: any[] // Add orders array to store retrieved orders
  sms?: any[]
  tracking?: any[]
  smsCampaign?: any[]
}

interface ShopContextProps {
  shopData: ShopData
  setShopData: (shopData: ShopData | ((prev: ShopData) => ShopData)) => void
  loading: boolean
  error: string | null
  shops: any[]
  setShops: (shops: any[]) => void
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange) => void
  // updateOrderStatus: (orderId: string, status: string) => Promise<boolean>
}

const ShopContext = createContext<ShopContextProps>({
  shopData: {},
  setShopData: () => {},
  loading: true,
  error: null,
  shops: [],
  setShops: () => {},
  dateRange: undefined,
  setDateRange: () => {},
  //  updateOrderStatus: async () => false,
})

interface ShopProviderProps {
  children: ReactNode
  userId?: string
  userEmail?: string
}

export const ShopProvider = ({ children, userId, userEmail }: ShopProviderProps) => {
  const [shopData, setShopData] = useState<ShopData>({})
  const [shops, setShops] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [creativeAiItems, setCreativeAiItems] = useState<any[]>([])
  const [creativeAiLoading, setCreativeAiLoading] = useState<boolean>(true)
  const [creativeAiError, setCreativeAiError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
      to: new Date(tomorrow.setHours(23, 59, 59, 999)),
    }
  })

  // Helper function to convert JavaScript Date to Firestore Timestamp
  const dateToTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date)
  }

  // Helper function to convert Firestore Timestamp to JavaScript Date
  const timestampToDate = (timestamp: any): Date => {
    // If it's a Firestore Timestamp object with toDate method
    if (timestamp && typeof timestamp.toDate === "function") {
      return timestamp.toDate()
    }

    // Handle Firestore timestamp object with seconds and nanoseconds
    if (timestamp && timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    }

    // If it's already a Date or a string, convert or return as is
    if (timestamp instanceof Date) {
      return timestamp
    }

    // If it's a string or number, convert to Date
    if (timestamp) {
      return new Date(timestamp)
    }

    // Default to current date if timestamp is undefined or null
    return new Date()
  }

  useEffect(() => {
    const fetchShopData = async () => {
      if (!userEmail) {
        console.log("No user email provided")
        setLoading(false)
        return
      }

      try {
        const shopsQuery = query(collection(db, "Clients"), where("email", "==", userEmail))
        const shopDocs = await getDocs(shopsQuery)

        if (shopDocs.empty) {
          console.log("No shop data found")
          setError("No shop data found")
          setLoading(false)
          return
        }

        const fetchedShops = []

        for (const shopDoc of shopDocs.docs) {
          const shopData = { ...shopDoc.data(), id: shopDoc.id }
          const shopRef = doc(db, "Clients", shopDoc.id)

          // Convert dateRange to Firestore timestamps
          const fromTimestamp = dateRange?.from ? dateToTimestamp(dateRange.from) : null
          const toTimestamp = dateRange?.to ? dateToTimestamp(dateRange.to) : null

          // Firestore query conditions for SMS and Tracking collections
          const smsQuery =
            fromTimestamp && toTimestamp
              ? query(
                  collection(shopRef, "SMS"),
                  where("date", ">=", fromTimestamp),
                  where("date", "<=", toTimestamp),
                )
              : collection(shopRef, "SMS")




          const smsCampaignQuery = collection(shopRef, "SMScampaign")

          // Fetch subcollections in parallel
          const [smsDocs, smsCampaignDocs] = await Promise.all([
            getDocs(smsQuery),

            getDocs(smsCampaignQuery)

          ])

          const trackingMap = {}
          const smsData = []


          
          // Process SMS data
          smsDocs.docs.forEach((smsDoc) => {
            const smsInfo = smsDoc.data()

            // Convert timestamp fields
            if (smsInfo.createdAt) {
              smsInfo.createdAt = timestampToDate(smsInfo.createdAt)
            }

            smsData.push({
              ...smsInfo,
              id: smsDoc.id,
              lastStatus: trackingMap[smsInfo.trackingId] || null,
            })
          })

          // Process SMS campaigns
          const smsCampaignData = smsCampaignDocs.docs.map((smsDoc) => {
            const campaignData = smsDoc.data()

            // Convert timestamp fields
            if (campaignData.createdAt) {
              campaignData.createdAt = timestampToDate(campaignData.createdAt)
            }

            return {
              ...campaignData,
              id: smsDoc.id,
            }
          })

          // Attach subcollections
          shopData.sms = smsData
          shopData.smsCampaign = smsCampaignData
          fetchedShops.push(shopData)
        }

        setShopData(fetchedShops[0] || {})
        setShops(fetchedShops)
      } catch (err) {
        console.error("Error fetching shop data:", err)
        setError("Error fetching shop data")
      } finally {
        setLoading(false)
      }
    }

    fetchShopData()
  }, [userEmail])

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true)
      if (!shopData.id) {
        console.log("No shop provided")
        setLoading(false)
        return
      }

      try {
        const shopsQuery = query(collection(db, "Clients"), where("email", "==", userEmail))
        const shopDocs = await getDocs(shopsQuery)
        console.log("hello mama")

        if (shopDocs.empty) {
          console.log("No shop data found")
          setError("No shop data found")
          setLoading(false)
          return
        }

        const fetchedShops = []

        const shopRef = doc(db, "Clients", shopData.id)

        // Convert dateRange to Firestore timestamps
        const fromTimestamp = dateRange?.from ? dateToTimestamp(dateRange.from) : null
        const toTimestamp = dateRange?.to ? dateToTimestamp(dateRange.to) : null

        const smsQuery =
        fromTimestamp && toTimestamp
          ? query(
              collection(shopRef, "SMS"),
              where("date", ">=", fromTimestamp),
              where("date", "<=", toTimestamp),
            )
          : collection(shopRef, "SMS")


        // Fetch subcollections in parallel
        const [smsDocs] = await Promise.all([
          getDocs(smsQuery),

        ])

        const trackingMap = {}
        const smsData = []



        // Process SMS data
        smsDocs.docs.forEach((smsDoc) => {
          const smsInfo = smsDoc.data()

          // Convert timestamp fields
          if (smsInfo.createdAt) {
            smsInfo.createdAt = timestampToDate(smsInfo.createdAt)
          }

          smsData.push({
            ...smsInfo,
            id: smsDoc.id,
            lastStatus: trackingMap[smsInfo.trackingId] || null,
          })
        })


        setShopData((prev) => ({ ...prev,  sms: smsData }))
        setLoading(false)
      } catch (err) {
        console.error("Error fetching shop data when chaning time:", err)
        setError("Error fetching shop data when chaning time")
      } finally {
        setLoading(false)
      }
    }

    fetchShopData()
  }, [shopData.id, dateRange])
    useEffect(() => {
    if (!shopData.id) return
     
    const unsubscribe = onSnapshot(collection(db, "Clients", shopData.id, "SMScampaign"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
      
 
        if (change.type === "added") {
          const campaignData = change.doc.data()
 
          
          // Convert timestamp fields
          if (campaignData.createdAt) {
            campaignData.createdAt = timestampToDate(campaignData.createdAt)
          }

          const newCampaign = {
            id: change.doc.id,
            ...campaignData,
          }
         console.log("New SMS campaign added:", change.doc.id, campaignData);
          // Update shopData only if campaign doesn't already exist
          setShopData((prevShopData) => {
            const campaignExists = prevShopData.smsCampaign?.some((campaign) => campaign.id === newCampaign.id)
            if (campaignExists) return prevShopData

            return {
              ...prevShopData,
              smsCampaign: [...(prevShopData.smsCampaign || []), newCampaign],
            }
          })

          // Update shops array only if campaign doesn't already exist
          setShops((prevShops) =>
            prevShops.map((shop) => {
              if (shop.id !== shopData.id) return shop

              const campaignExists = shop.smsCampaign?.some((campaign) => campaign.id === newCampaign.id)
              if (campaignExists) return shop

              return {
                ...shop,
                smsCampaign: [...(shop.smsCampaign || []), newCampaign],
              }
            }),
          )
        }

        if (change.type === "modified") {
          const campaignData = change.doc.data()

          // Convert timestamp fields
          if (campaignData.createdAt) {
            campaignData.createdAt = timestampToDate(campaignData.createdAt)
          }

          const updatedCampaign = {
            id: change.doc.id,
            ...campaignData,
          }

          // Update shopData
          setShopData((prevShopData) => ({
            ...prevShopData,
            smsCampaign:
              prevShopData.smsCampaign?.map((campaign) =>
                campaign.id === updatedCampaign.id ? updatedCampaign : campaign,
              ) || [],
          }))

          // Update shops array
          setShops((prevShops) =>
            prevShops.map((shop) =>
              shop.id === shopData.id
                ? {
                    ...shop,
                    smsCampaign:
                      shop.smsCampaign?.map((campaign) =>
                        campaign.id === updatedCampaign.id ? updatedCampaign : campaign,
                      ) || [],
                  }
                : shop,
            ),
          )
        }

        if (change.type === "removed") {
          const removedCampaignId = change.doc.id

          // Update shopData
          setShopData((prevShopData) => ({
            ...prevShopData,
            smsCampaign: prevShopData.smsCampaign?.filter((campaign) => campaign.id !== removedCampaignId) || [],
          }))

          // Update shops array
          setShops((prevShops) =>
            prevShops.map((shop) =>
              shop.id === shopData.id
                ? {
                    ...shop,
                    smsCampaign: shop.smsCampaign?.filter((campaign) => campaign.id !== removedCampaignId) || [],
                  }
                : shop,
            ),
          )
        }
      })
    })

    return () => unsubscribe()
  }, [shopData.id])
  // Set up real-time listener for OrdersRetrieved collection
  useEffect(() => {
    if (!shopData.id) {
      console.log("No shop ID available for OrdersRetrieved listener")
      return
    }

    console.log("Setting up OrdersRetrieved listener for shop ID:", shopData.id)

    const ordersRef = collection(db, "Clients", shopData.id, "OrdersRetrieved")

    try {
      const unsubscribe = onSnapshot(
        ordersRef,
        (snapshot) => {
          console.log("OrdersRetrieved snapshot received:", snapshot.docChanges().length, "changes")

          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("New order added:", change.doc.id)
              const orderData = change.doc.data()

              // Convert timestamp fields to JavaScript Date objects
              if (orderData.timestamp) {
                orderData.timestamp = timestampToDate(orderData.timestamp)
              }

              // Handle nested timestamp fields in orderData
              if (orderData.orderData && orderData.orderData.message_time && orderData.orderData.message_time.value) {
                // Check if it's a Firestore timestamp
                if (
                  typeof orderData.orderData.message_time.value === "object" &&
                  orderData.orderData.message_time.value.seconds !== undefined
                ) {
                  orderData.orderData.message_time.value = timestampToDate(orderData.orderData.message_time.value)
                }
              }

              const newOrder = {
                id: change.doc.id,
                ...orderData,
              }

              // Update shopData only if order doesn't already exist
              setShopData((prevShopData) => {
                const orderExists = prevShopData.orders?.some((order) => order.id === newOrder.id)
                if (orderExists) {
                  console.log("Order already exists, skipping:", newOrder.id)
                  return prevShopData
                }

                console.log("Adding new order to state:", newOrder.id)
                return {
                  ...prevShopData,
                  orders: [...(prevShopData.orders || []), newOrder],
                }
              })
            }

            if (change.type === "modified") {
              console.log("Order modified:", change.doc.id)
              const orderData = change.doc.data()

              // Convert timestamp fields to JavaScript Date objects
              if (orderData.timestamp) {
                orderData.timestamp = timestampToDate(orderData.timestamp)
              }

              // Handle nested timestamp fields in orderData
              if (orderData.orderData && orderData.orderData.message_time && orderData.orderData.message_time.value) {
                // Check if it's a Firestore timestamp
                if (
                  typeof orderData.orderData.message_time.value === "object" &&
                  orderData.orderData.message_time.value.seconds !== undefined
                ) {
                  orderData.orderData.message_time.value = timestampToDate(orderData.orderData.message_time.value)
                }
              }

              const updatedOrder = {
                id: change.doc.id,
                ...orderData,
              }

              // Update shopData
              setShopData((prevShopData) => ({
                ...prevShopData,
                orders:
                  prevShopData.orders?.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)) || [],
              }))
            }

            if (change.type === "removed") {
              console.log("Order removed:", change.doc.id)
              const removedOrderId = change.doc.id

              // Update shopData
              setShopData((prevShopData) => ({
                ...prevShopData,
                orders: prevShopData.orders?.filter((order) => order.id !== removedOrderId) || [],
              }))
            }
          })
        },
        (error) => {
          console.error("Error in OrdersRetrieved listener:", error)
        },
      )

      return () => {
        console.log("Unsubscribing from OrdersRetrieved listener")
        unsubscribe()
      }
    } catch (err) {
      console.error("Failed to set up OrdersRetrieved listener:", err)
    }
  }, [shopData.id]) // Add shopData.id as a dependency

   //creative ai 

   useEffect(() => {
    const fetchCreativeAiInspirations = async () => {
      setCreativeAiLoading(true)
      setCreativeAiError(null)
      try {
        const creativeAiCollectionRef = collection(db, "CreativeAi")
        const querySnapshot = await getDocs(creativeAiCollectionRef)
        const fetchedItems: any[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.prompt && data.image && data.type && data.user) {
            fetchedItems.push({
              id: doc.id,
              image: data.image as string,
              beforeImage: data.beforeImage as string | undefined,
              user: data.user as string,
             // avatar:
             //   data.avatar ||
              //  `/placeholder.svg?height=32&width=32&text=${(data.user as string)?.[0]?.toUpperCase() || "U"}`,
              
              prompt: data.prompt as string,
              //likes: (data.likes as number) || Math.floor(Math.random() * 1500),
              type: data.type as "image" | "reel",
              duration: data.duration as string | undefined,
              //settings: data.settings as any,
              createdAt: data.createdAt ? timestampToDate(data.createdAt) : new Date(),
            })
          }
        })
        setCreativeAiItems(fetchedItems)
      } catch (error) {
        console.error("Error fetching CreativeAI inspirations:", error)
        setCreativeAiError("Could not load community inspirations.")
      } finally {
        setCreativeAiLoading(false)
      }
    }
    fetchCreativeAiInspirations()

  }, []) // Empty dependency array ensures this runs only once on mount
  // Set up real-time listener for SMScampaign collection


 
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const texts = [
      "Initializing...",
      "Loading delivery analytics...",
      "Preparing optimization tools...",
      "Setting up tracking dashboard...",
      "Almost ready...",
    ]

    let interval: NodeJS.Timeout

    // Simulate loading progress
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // Update loading text based on progress
        const textIndex = Math.min(Math.floor(prev / 20), texts.length - 1)
        setLoadingText(texts[textIndex])

        return prev + 1
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  if (!loading && shopData.id) {
    return (
      <ShopContext.Provider
        value={{
          shopData,
          loading,
          error,
          setShopData,
          setShops,
          shops,
          dateRange,
          setDateRange,
          creativeAiItems,
          //  updateOrderStatus,
        }}
      >
        {children}
      </ShopContext.Provider>
    )
  }

  // Show loading UI when data is not yet available
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Name */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Coli<span className="text-indigo-500">track</span>
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-medium text-slate-700">Elevate Your E-Commerce Delivery Performance</h2>
          <p className="text-slate-600">
            Comprehensive tools to optimize delivery rates, track packages, and enhance customer satisfaction
          </p>
        </div>

        {/* Features */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          {[
            { icon: Truck, text: "Delivery Optimization" },
            { icon: CheckCircle, text: "Success Rate Analytics" },
            { icon: Clock, text: "Real-time Tracking" },
            { icon: Box, text: "Inventory Management" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow"
            >
              <feature.icon className="mr-2 h-5 w-5 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">{feature.text}</span>
              <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" />
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{loadingText}</span>
          <span className="font-medium text-slate-700">{progress}%</span>
        </div>
      </div>
    </div>
  )
}

export const useShop = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}
