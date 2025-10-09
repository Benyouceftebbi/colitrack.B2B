"use client"
import { ArrowUpRight, Box, CheckCircle, Clock, Package, Truck } from "lucide-react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { doc, getDocs, collection, onSnapshot, query, where, Timestamp, orderBy } from "firebase/firestore"
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
  const atStartOfDay = (d: Date) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
  const toExclusive00 = (d: Date) => { const x = atStartOfDay(d); x.setDate(x.getDate() + 1); return x; };
  
  useEffect(() => {
    // 1) Load shops ONCE by email, pick first, and DO NOT pull SMS here
    let alive = true;
    (async () => {
      if (!userEmail) { setLoading(false); return; }
  
      try {
        const shopsQuery = query(collection(db, "Clients"), where("email", "==", userEmail));
        const shopDocs = await getDocs(shopsQuery);
  
        if (!alive) return;
        if (shopDocs.empty) { setError("No shop data found"); setLoading(false); return; }
  
        const fetchedShops = shopDocs.docs.map(d => ({ ...d.data(), id: d.id }));
        setShops(fetchedShops);
        // keep previously selected shop if any, otherwise first
        setShopData(prev => prev?.id ? prev : fetchedShops[0]);
      } catch (err) {
        if (!alive) return;
        console.error("Error fetching shops:", err);
        setError("Error fetching shop data");
      } finally {
        if (alive) setLoading(false);
      }
    })();
  
    return () => { alive = false; };
  }, [userEmail]);
  useEffect(() => {
    if (!shopData?.id) return;
  
    // guard against overlapping fast changes (e.g., selecting far dates)
    const reqTag = Math.random().toString(36).slice(2);
    let latest = reqTag;
    (async () => {
      setLoading(true);
  
      try {
        const shopRef = doc(db, "Clients", shopData.id);
        const from = dateRange?.from ? atStartOfDay(dateRange.from) : null;
        const to = dateRange?.to ? atStartOfDay(dateRange.to) : null; // EXCLUSIVE handled below
  
        // build query
        let qRef: any = collection(shopRef, "SMS");
        if (from && to) {
          const fromTs = dateToTimestamp(from);
          const toTs = dateToTimestamp(to); // end is EXCLUSIVE at 00:00 of the chosen end day
          qRef = query(
            qRef,
            where("date", ">=", fromTs),
            where("date", "<", toTs),
            orderBy("date", "desc")
          );
        } else {
          qRef = query(qRef, orderBy("date", "desc"));
        }
  
        const smsSnap = await getDocs(qRef);
        if (latest !== reqTag) return; // stale → ignore
  
        const smsData = smsSnap.docs.map(d => {
          const s = d.data();
          if (s.date) s.date = timestampToDate(s.date);
          return { ...s, id: d.id, lastStatus: null };
        });
  
        // write minimally to avoid layout “resets”
        setShopData(prev => prev?.id === shopData.id ? { ...prev, sms: smsData } : prev);
      } catch (err) {
        console.error("Error fetching SMS:", err);
        setError("Error fetching SMS");
      } finally {
        if (latest === reqTag) setLoading(false);
      }
    })();
  
    return () => { latest = ""; };
  }, [shopData.id, dateRange?.from, dateRange?.to]);
  useEffect(() => {
    if (!shopData?.id) return;
  
    const qRef = collection(db, "Clients", shopData.id, "SMScampaign");
    const unsub = onSnapshot(qRef, (snapshot) => {
      setShopData(prev => {
        if (!prev || prev.id !== shopData.id) return prev;
        let changed = false;
        let campaigns = prev.smsCampaign ? [...prev.smsCampaign] : [];
  
        snapshot.docChanges().forEach((change) => {
          const id = change.doc.id;
          if (change.type === "added" || change.type === "modified") {
            const raw = change.doc.data();
            if (raw.createdAt) raw.createdAt = timestampToDate(raw.createdAt);
            const next = { id, ...raw };
            const idx = campaigns.findIndex(c => c.id === id);
            if (idx === -1) { campaigns.push(next); changed = true; }
            else if (JSON.stringify(campaigns[idx]) !== JSON.stringify(next)) {
              campaigns[idx] = next; changed = true;
            }
          }
          if (change.type === "removed") {
            const before = campaigns.length;
            campaigns = campaigns.filter(c => c.id !== id);
            if (campaigns.length !== before) changed = true;
          }
        });
  
        return changed ? { ...prev, smsCampaign: campaigns } : prev;
      });
  
      // keep a light mirror in `shops` if you need it
      setShops(prev =>
        prev.map(s => (s.id !== shopData.id ? s : { ...s, smsCampaign: (s.smsCampaign || []) }))
      );
    });
  
    return () => unsub();
  }, [shopData.id]);
  // Set up real-time listener for OrdersRetrieved collection






 
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
