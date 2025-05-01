"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import {
  CheckCircle,
  ShoppingBag,
  Truck,
  MapPin,
  Gift,
  CreditCard,
  Globe,
  Gamepad2,
  ShoppingCartIcon as Paypal,
  Hotel,
  Repeat,
  Facebook,
  Timer,
  BadgeDollarSign,
  PartyPopper,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/firebase/firebase"
import cryptoCard from "./images/crypto-card-front.jpeg";
import cryptoCard1 from "./images/crypto-card-back.jpeg";
import cryptoCard2 from "./images/crypto-card-whatsapp.jpeg";
import Image from "next/image"
export default function OrderConfirmation() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedWilaaya, setSelectedWilaaya] = useState("")
  const [selectedCommune, setSelectedCommune] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [validationError, setValidationError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Order data from Firebase
  const [orderData, setOrderData] = useState({
    articleName: "",
    articlePrice: 0,
    clientName: "",
    clientPhone: "",
  })
  const docId = searchParams.get("d")
  // Fetch order data from Firebase based on the document ID in URL
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true)
        setError("")

        // Get the document ID from URL parameters
        const docId = searchParams.get("d")

        if (!docId) {
          setError("معرف الطلب غير موجود في الرابط")
          setIsLoading(false)
          return
        }

        // Fetch the document from Firestore
        const docRef = doc(db, "sheetRows", docId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setOrderData({
            articleName: data.field1 || "بطاقة فيزا رقمية",
            articlePrice: data.price || 3500,
            clientName: data.field2 || "",
            clientPhone: data.field5 || "",
          })

          // Set order number from document ID or generate one
          setOrderNumber(docId || docId.substring(0, 4))

        } else {
          setError("لم يتم العثور على الطلب")
        }
      } catch (err) {
        console.error("Error fetching order data:", err)
        setError("حدث خطأ أثناء جلب بيانات الطلب")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderData()
  }, [searchParams])

  // Wilaaya data with pricing for both delivery types
  const wilaayaData = [
    {
      id: "alger",
      name: "الجزائر",
      basePrice: 3500,
      deliveryPrices: { home: 400, office: 700, stop_desk: 300 },
      communes: ["باب الزوار", "حسين داي", "بئر مراد رايس", "الجزائر وسط"],
    },
    {
      id: "alger_kouba",
      name: "الجزائر - القبة",
      basePrice: 3500,
      deliveryPrices: { home: 400, office: 700, stop_desk: 300 },
      communes: ["القبة", "حسين داي", "باش جراح"],
    },
    {
      id: "alger_oued_smar",
      name: "الجزائر - وادي السمار",
      basePrice: 3500,
      deliveryPrices: { home: 400, office: 700, stop_desk: 300 },
      communes: ["وادي السمار", "الحراش", "براقي"],
    },
    {
      id: "alger_express",
      name: "الجزائر السريع",
      basePrice: 3500,
      deliveryPrices: { home: 600, office: 700, stop_desk: 300 },
      communes: ["باب الزوار", "حسين داي", "بئر مراد رايس", "الجزائر وسط"],
    },
    {
      id: "blida",
      name: "البليدة",
      basePrice: 3500,
      deliveryPrices: { home: 600, office: 700, stop_desk: 450 },
      communes: ["البليدة وسط", "أولاد يعيش", "بوفاريك"],
    },
    {
      id: "tipaza",
      name: "تيبازة",
      basePrice: 3500,
      deliveryPrices: { home: 600, office: 700, stop_desk: 450 },
      communes: ["تيبازة وسط", "شرشال", "القليعة"],
    },
    {
      id: "boumerdes",
      name: "بومرداس",
      basePrice: 3500,
      deliveryPrices: { home: 600, office: 700, stop_desk: 450 },
      communes: ["بومرداس وسط", "الثنية", "برج منايل"],
    },
    {
      id: "bouira",
      name: "البويرة",
      basePrice: 3500,
      deliveryPrices: { home: 650, office: 800, stop_desk: 450 },
      communes: ["البويرة وسط", "الأسنام", "سور الغزلان"],
    },
    {
      id: "ain_defla",
      name: "عين الدفلى",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 750, stop_desk: 450 },
      communes: ["عين الدفلى وسط", "مليانة", "العطاف"],
    },
    {
      id: "medea",
      name: "المدية",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["المدية وسط", "البرواقية", "قصر البخاري"],
    },
    {
      id: "chlef",
      name: "الشلف",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 750, stop_desk: 450 },
      communes: ["الشلف وسط", "تنس", "وادي الفضة"],
    },
    {
      id: "tissemsilt",
      name: "تيسمسيلت",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 900, stop_desk: 450 },
      communes: ["تيسمسيلت وسط", "ثنية الحد", "برج بونعامة"],
    },
    {
      id: "tiaret",
      name: "تيارت",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 900, stop_desk: 450 },
      communes: ["تيارت وسط", "عين الذهب", "السوقر"],
    },
    {
      id: "relizane",
      name: "غليزان",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["غليزان وسط", "وادي رهيو", "جديوية"],
    },
    {
      id: "mostaghanem",
      name: "مستغانم",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 700, stop_desk: 450 },
      communes: ["مستغانم وسط", "عين النويصي", "حاسي ماماش"],
    },
    {
      id: "oran",
      name: "وهران",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["وهران وسط", "عين الترك", "السانية"],
    },
    {
      id: "mascara",
      name: "معسكر",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["معسكر وسط", "تيغنيف", "سيق"],
    },
    {
      id: "ain_temouchent",
      name: "عين تموشنت",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["عين تموشنت وسط", "حمام بوحجر", "بني صاف"],
    },
    {
      id: "tlemcen",
      name: "تلمسان",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["تلمسان وسط", "مغنية", "الرمشي"],
    },
    {
      id: "sidi_bel_abbes",
      name: "سيدي بلعباس",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["سيدي بلعباس وسط", "تلاغ", "سفيزف"],
    },
    {
      id: "saida",
      name: "سعيدة",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 900, stop_desk: 450 },
      communes: ["سعيدة وسط", "عين الحجر", "يوب"],
    },
    {
      id: "el_oued",
      name: "الوادي",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["الوادي وسط", "قمار", "الدبيلة"],
    },
    {
      id: "biskra",
      name: "بسكرة",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["بسكرة وسط", "سيدي عقبة", "طولقة"],
    },
    {
      id: "ouargla",
      name: "ورقلة",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["ورقلة وسط", "حاسي مسعود", "تقرت"],
    },
    {
      id: "el_mghaier",
      name: "المغير",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 1000, stop_desk: 600 },
      communes: ["المغير وسط", "جامعة", "سيدي خليل"],
    },
    {
      id: "ouled_djellal",
      name: "أولاد جلال",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 1000, stop_desk: 600 },
      communes: ["أولاد جلال وسط", "سيدي خالد", "الدوسن"],
    },
    {
      id: "el_meniaa",
      name: "المنيعة",
      basePrice: 3500,
      deliveryPrices: { home: 950, office: 1000, stop_desk: 600 },
      communes: ["المنيعة وسط", "حاسي القارة"],
    },
    {
      id: "timimoun",
      name: "تيميمون",
      basePrice: 3500,
      deliveryPrices: { home: 1200, office: 1100, stop_desk: 600 },
      communes: ["تيميمون وسط", "أولاد سعيد"],
    },
    {
      id: "ain_salah",
      name: "عين صالح",
      basePrice: 3500,
      deliveryPrices: { home: 1500, office: 1200, stop_desk: 800 },
      communes: ["عين صالح وسط", "فقارة الزوى"],
    },
    {
      id: "tizi_ouzou",
      name: "تيزي وزو",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 1700, stop_desk: 450 },
      communes: ["تيزي وزو وسط", "عزازقة", "ذراع الميزان"],
    },
    {
      id: "bejaia",
      name: "بجاية",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["بجاية وسط", "أقبو", "أميزور"],
    },
    {
      id: "jijel",
      name: "جيجل",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["جيجل وسط", "الطاهير", "الميلية"],
    },
    {
      id: "bordj_bou_arreridj",
      name: "برج بوعريريج",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["برج بوعريريج وسط", "رأس الوادي", "المنصورة"],
    },
    {
      id: "setif",
      name: "سطيف",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["سطيف وسط", "العلمة", "عين ولمان"],
    },
    {
      id: "msila",
      name: "المسيلة",
      basePrice: 3500,
      deliveryPrices: { home: 800, office: 800, stop_desk: 600 },
      communes: ["المسيلة وسط", "بوسعادة", "سيدي عيسى"],
    },
    {
      id: "batna",
      name: "باتنة",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["باتنة وسط", "بريكة", "عين التوتة"],
    },
    {
      id: "constantine",
      name: "قسنطينة",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["قسنطينة وسط", "الخروب", "حامة بوزيان"],
    },
    {
      id: "guelma",
      name: "قالمة",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["قالمة وسط", "وادي الزناتي", "بوشقوف"],
    },
    {
      id: "khenchela",
      name: "خنشلة",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 450 },
      communes: ["خنشلة وسط", "قايس", "ششار"],
    },
    {
      id: "tebessa",
      name: "تبسة",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 450 },
      communes: ["تبسة وسط", "الونزة", "بئر العاتر"],
    },
    {
      id: "oum_el_bouaghi",
      name: "أم البواقي",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["أم البواقي وسط", "عين مليلة", "عين البيضاء"],
    },
    {
      id: "mila",
      name: "ميلة",
      basePrice: 3500,
      deliveryPrices: { home: 700, office: 700, stop_desk: 450 },
      communes: ["ميلة وسط", "فرجيوة", "شلغوم العيد"],
    },
    {
      id: "skikda",
      name: "سكيكدة",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["سكيكدة وسط", "القل", "عزابة"],
    },
    {
      id: "annaba",
      name: "عنابة",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["عنابة وسط", "البوني", "سيدي عمار"],
    },
    {
      id: "el_tarf",
      name: "الطارف",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["الطارف وسط", "القالة", "بوحجار"],
    },
    {
      id: "souk_ahras",
      name: "سوق أهراس",
      basePrice: 3500,
      deliveryPrices: { home: 750, office: 750, stop_desk: 450 },
      communes: ["سوق أهراس وسط", "سدراتة", "مداوروش"],
    },
    {
      id: "laghouat",
      name: "الأغواط",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["الأغواط وسط", "أفلو", "قلتة سيدي سعد"],
    },
    {
      id: "ghardaia",
      name: "غرداية",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["غرداية وسط", "بريان", "متليلي"],
    },
    {
      id: "djelfa",
      name: "الجلفة",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 900, stop_desk: 600 },
      communes: ["الجلفة وسط", "عين وسارة", "مسعد"],
    },
    {
      id: "touggourt",
      name: "تقرت",
      basePrice: 3500,
      deliveryPrices: { home: 900, office: 1000, stop_desk: 600 },
      communes: ["تقرت وسط", "تماسين", "المقارين"],
    },
    {
      id: "bechar",
      name: "بشار",
      basePrice: 3500,
      deliveryPrices: { home: 1000, office: 1000, stop_desk: 600 },
      communes: ["بشار وسط", "القنادسة", "عبادلة"],
    },
    {
      id: "el_bayadh",
      name: "البيض",
      basePrice: 3500,
      deliveryPrices: { home: 1000, office: 1100, stop_desk: 600 },
      communes: ["البيض وسط", "بوقطب", "الأبيض سيدي الشيخ"],
    },
    {
      id: "naama",
      name: "النعامة",
      basePrice: 3500,
      deliveryPrices: { home: 1000, office: 1200, stop_desk: 600 },
      communes: ["النعامة وسط", "عين الصفراء", "مشرية"],
    },
    {
      id: "beni_abbes",
      name: "بني عباس",
      basePrice: 3500,
      deliveryPrices: { home: 1100, office: 1200, stop_desk: 600 },
      communes: ["بني عباس وسط", "كرزاز", "تبلبالة"],
    },
    {
      id: "adrar",
      name: "أدرار",
      basePrice: 3500,
      deliveryPrices: { home: 1200, office: 1700, stop_desk: 800 },
      communes: ["أدرار وسط", "رقان", "تيميمون"],
    },
    {
      id: "tindouf",
      name: "تندوف",
      basePrice: 3500,
      deliveryPrices: { home: 1500, office: 1700, stop_desk: 1200 },
      communes: ["تندوف وسط", "أم العسل"],
    },
  ]

  // Delivery types
  const deliveryTypes = [
    { id: "home", name: "توصيل إلى المنزل", time: "24 ساعة" },

    { id: "stop_desk", name: "توصيل إلى المكتب",  time: "24 ساعة" },
  ]

  // Get communes for selected wilaaya
  const getCommunes = () => {
    const wilaaya = wilaayaData.find((w) => w.id === selectedWilaaya)
    return wilaaya ? wilaaya.communes : []
  }

  // Get delivery fee based on selected wilaaya and delivery type
  const getDeliveryFee = () => {
    if (!selectedWilaaya || !selectedDelivery) return 0

    const wilaaya = wilaayaData.find((w) => w.id === selectedWilaaya)
    if (!wilaaya) return 0

    return wilaaya.deliveryPrices[selectedDelivery] || 0
  }

  // Get delivery time
  const getDeliveryTime = () => {
    const delivery = deliveryTypes.find((d) => d.id === selectedDelivery)
    return delivery ? delivery.time : ""
  }

  // Sample order data - now using data from Firebase
  const order = {
    customer: {
      name: orderData.clientName || "محمد بن علي",
      phone: orderData.clientPhone || "",
      address: "شارع الزيتون 123",
      wilaaya: selectedWilaaya ? wilaayaData.find((w) => w.id === selectedWilaaya)?.name || "" : "",
      commune: selectedCommune || "",
    },
    delivery: {
      type: selectedDelivery ? deliveryTypes.find((d) => d.id === selectedDelivery)?.name || "" : "",
      estimatedTime: getDeliveryTime(),
    },
    items: [
      {
        id: 1,
        name: orderData.articleName || "بطاقة فيزا رقمية",
        price: orderData.articlePrice || 3500,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        description: "بطاقة فيزا رقمية باسمك الكامل صالحة لمدة 5 سنوات",
      },
    ],
  }

  const features = [
    { icon: <CreditCard className="h-5 w-5 text-[#4f4ce1]" />, text: "بطاقة فيزا رقمية باسمك الكامل" },
    { icon: <Globe className="h-5 w-5 text-[#4f4ce1]" />, text: "الشراء من جميع مواقع التسوق العالمية" },
    { icon: <Gamepad2 className="h-5 w-5 text-[#4f4ce1]" />, text: "شحن جميع الألعاب" },
    { icon: <Paypal className="h-5 w-5 text-[#4f4ce1]" />, text: "تفعيل كلي لحساب PayPal (إرسال واستقبال)" },
    { icon: <Hotel className="h-5 w-5 text-[#4f4ce1]" />, text: "حجوزات الفنادق بكل سهولة" },
    {
      icon: <BadgeDollarSign className="h-5 w-5 text-[#4f4ce1]" />,
      text: "التعامل مع أكثر من 40 عملة (USD, EUR, CAD, ... إلخ)",
    },
    {
      icon: <Facebook className="h-5 w-5 text-[#4f4ce1]" />,
      text: "الترويج على منصات التواصل الاجتماعي (Facebook, Instagram)",
    },
    { icon: <Repeat className="h-5 w-5 text-[#4f4ce1]" />, text: "شحن البطاقة عن طريق أي فيزا أخرى" },
    { icon: <Timer className="h-5 w-5 text-[#4f4ce1]" />, text: "صالحة لمدة 5 سنوات" },
    { icon: <Gift className="h-5 w-5 text-[#4f4ce1]" />, text: "بدون أي عمولات شهرية أو سنوية" },
  ]

  const steps = [
    "تصفح الكتيّب واتباع الإرشادات.",
    "بعد الطلب، صوّر الكتيب والطرد الخاص بك.",
    "أرسل الصور عبر واتساب للتأكيد.",
    "بعد التحقق، نجهّز لك بطاقتك باسمك الكامل وبريدك الإلكتروني.",
    "تبدأ باستخدامها فوراً – حتى قبل أن تصلك!",
  ]

  const reasons = ["تأكيد عضويتك في النظام", "تسهيل عمليات الدفع مستقبلاً", "ضمان حصولك على الدعم والخدمة المخصصة لك"]

  const cardImages = [
    cryptoCard,
   cryptoCard1,
   cryptoCard2,
  ]

  // Cycle through card images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % cardImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [cardImages.length])

  const validateForm = () => {
    if (!selectedWilaaya) {
      setValidationError("يرجى اختيار الولاية")
      return false
    }
    if (!selectedCommune) {
      setValidationError("يرجى اختيار البلدية")
      return false
    }
    if (!selectedDelivery) {
      setValidationError("يرجى اختيار نوع التوصيل")
      return false
    }
    setValidationError("")
    return true
  }

  const handleConfirm = async () => {
    if (isConfirmed) {
      toast({
        title: "تم تأكيد الطلب مسبقاً",
        description: "لقد قمت بتأكيد طلبك بالفعل. لا يمكن تأكيده مرة أخرى.",
        variant: "destructive",
      })
      return
    }

    if (!validateForm()) {
      toast({
        title: "خطأ في النموذج",
        description: validationError,
        variant: "destructive",
      })
      return
    }
  await updateDoc(doc(db,"sheetRows",docId),{
    commune:selectedCommune,
    delivery:selectedDelivery,
    wilaya:selectedWilaaya,
    deliveryFee:deliveryFee
  })
    setIsConfirmed(true)
    setShowConfirmModal(true)
    toast({
      title: "تم تأكيد الطلب!",
      description: "شكراً لك على الشراء. سيتم إرسال بطاقتك قريباً.",
    })
  }

  // Reset commune when wilaaya changes
  useEffect(() => {
    setSelectedCommune("")
  }, [selectedWilaaya])

  // Calculate total
  const subtotal = order.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = getDeliveryFee()
  const total = subtotal + deliveryFee

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4f4ce1]/10 to-white"
      >
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#4f4ce1] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">جاري تحميل بيانات الطلب...</h3>
          <p className="text-gray-500 mt-2">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    )
  }

  // Show error state if there was an error fetching data
  if (error) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4f4ce1]/10 to-white p-4"
      >
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ في تحميل البيانات</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <p className="text-center text-gray-600 mb-4">يرجى التحقق من الرابط أو التواصل مع خدمة العملاء للمساعدة.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#4f4ce1] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4f4ce1]/90 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }


  return (
    <div dir="rtl" className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="bg-[#4f4ce1] text-white">
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎉 احصل على بطاقتك الرقمية الآن وابدأ التسوّق والدفع بكل سهولة!
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              بطاقة فيزا رقمية باسمك وبدون أي عمولات! فعّل بها حسابك على PayPal، اشحن الألعاب، تسوّق من جميع المواقع،
              واستمتع بخدمات عالمية ببطاقة واحدة فقط.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-10"
            >
              <motion.button
                onClick={() => {
                  const orderSection = document.getElementById("order-section")
                  if (orderSection) {
                    orderSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(79, 76, 225, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="relative group bg-white text-[#4f4ce1] hover:bg-white/95 font-bold py-5 px-10 rounded-full text-xl shadow-lg overflow-hidden"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    duration: 2,
                    times: [0, 0.1, 0.9, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center text-[#4f4ce1]/80"
                >
                  <span className="animate-ping absolute h-4 w-4 rounded-full bg-[#4f4ce1] opacity-75"></span>
                </motion.span>
                <span className="relative z-10">اطلب بطاقتك الآن</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#4f4ce1]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="h-16 bg-white rounded-t-[50px] -mb-1"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Status Banner */}
        <AnimatePresence>
          {isConfirmed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6 flex items-center"
            >
              <CheckCircle className="text-green-500 mr-2" />
              <p className="text-green-800">تم تأكيد طلبك! سنرسل لك رسالة تأكيد عبر البريد الإلكتروني قريبًا.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Summary */}
        <div id="order-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1"
          >
            <Card className="border-[#4f4ce1]/20 overflow-hidden bg-white">
              <CardHeader className="bg-white rounded-t-lg">
                <CardTitle className="flex items-center text-black">
                  <MapPin className="ml-2 h-5 w-5" />
                  بيانات العميل
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-black">{order.customer.name}</p>
                    {order.customer.phone && (
                      <p className="text-gray-600 text-sm">رقم الهاتف: {order.customer.phone}</p>
                    )}
                    <p className="text-gray-600 text-sm">{order.customer.address}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="wilaaya" className="text-black">اختر الولاية</Label>
                      <Select value={selectedWilaaya} onValueChange={setSelectedWilaaya} disabled={isConfirmed}>
                        <SelectTrigger
                          id="wilaaya"
                          className={validationError && !selectedWilaaya ? "border-red-500 text-black" : "text-black" }
                        >
                          <SelectValue placeholder="اختر الولاية" />
                        </SelectTrigger>
                        <SelectContent >
                          {wilaayaData.map((wilaaya) => (
                            <SelectItem key={wilaaya.id} value={wilaaya.id}>
                              {wilaaya.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="commune" className="text-black">اختر البلدية</Label>
                      <Select
                        value={selectedCommune}
                        onValueChange={setSelectedCommune}
                        disabled={!selectedWilaaya || isConfirmed}
                      >
                        <SelectTrigger
                          id="commune"
                          className={validationError && !selectedCommune ? "border-red-500 text-black" : "text-black"}
                        >
                          <SelectValue placeholder="اختر البلدية" />
                        </SelectTrigger>
                        <SelectContent >
                          {getCommunes().map((commune) => (
                            <SelectItem key={commune} value={commune}>
                              {commune}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery" className="text-black">اختر نوع التوصيل</Label>
                      <Select value={selectedDelivery} onValueChange={setSelectedDelivery} disabled={isConfirmed}>
                        <SelectTrigger
                          id="delivery"
                          className={validationError && !selectedDelivery ? "border-red-500 text-black" : "text-black"}
                        >
                          <SelectValue placeholder="اختر نوع التوصيل" />
                        </SelectTrigger>
                        <SelectContent >
                          {deliveryTypes.map((delivery) => (
                            <SelectItem key={delivery.id} value={delivery.id}>
                              {delivery.name} - {delivery.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

                  {selectedDelivery && (
                    <div className="pt-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit border-[#4f4ce1]/30 text-[#4f4ce1]"
                      >
                        <Truck className="h-3 w-3 ml-1" />
                        {order.delivery.type}
                      </Badge>
                      <p className="text-gray-500 text-xs mt-1">وقت التوصيل المتوقع: {order.delivery.estimatedTime}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="border-[#4f4ce1]/20 overflow-hidden bg-white">
              <CardHeader className="bg-white rounded-t-lg">
                <CardTitle className="flex items-center text-black">
                  <ShoppingBag className="ml-2 h-5 w-5" />
                  ملخص الطلب
                </CardTitle>
                <CardDescription className="text-gray-700">راجع طلبك قبل التأكيد</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + item.id * 0.1 }}
                      className="flex gap-4 pb-4 border-b"
                    >
                      <div className="flex-shrink-0">
                        
                      <Image 
                        src={cryptoCard} alt="Crypto Card"
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-black">{item.name}</h3>
                        <p className="text-gray-700 text-sm">{item.description}</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-black">الكمية: {item.quantity}</p>
                          <p className="font-medium">{item.price.toLocaleString()} دج</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-black">
                      <span className="text-gray-600">المجموع الفرعي</span>
                      <span>{subtotal.toLocaleString()} دج</span>
                    </div>
                    <div className="flex justify-between text-sm text-black">
                      <span className="text-gray-600">رسوم التوصيل</span>
                      <span>{deliveryFee.toLocaleString()} دج</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>المجموع</span>
                      <span className="text-[#4f4ce1]">{total.toLocaleString()} دج</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <motion.button
                  onClick={handleConfirm}
                  disabled={isConfirmed}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full font-bold py-3 px-6 rounded-lg ${
                    isConfirmed
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#4f4ce1] hover:bg-[#4f4ce1]/90 text-white"
                  }`}
                >
                  {isConfirmed ? "تم تأكيد الطلب" : "تأكيد الطلب"}
                </motion.button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Card Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#4f4ce1] mb-2">🔥 بطاقة فيزا رقمية حقيقية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تعرف على بطاقتنا الرقمية المميزة التي تمنحك حرية التسوق عبر الإنترنت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(79, 76, 225, 0.1)" }}
                className="bg-white p-2 rounded-lg border border-[#4f4ce1]/10 shadow-md overflow-hidden"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`بطاقة فيزا رقمية ${index + 1}`}
                  className="w-full h-64 object-contain rounded"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#4f4ce1] mb-2">✨ مميزات بطاقتنا الرقمية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">بطاقة واحدة تمنحك كل ما تحتاجه للتسوق والدفع عبر الإنترنت</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(79, 76, 225, 0.1)" }}
                className="bg-white p-4 rounded-lg border border-[#4f4ce1]/10 shadow-sm flex items-start gap-3 transition-all duration-300"
              >
                <motion.div
                  className="bg-[#4f4ce1]/10 p-2 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: index * 0.2,
                  }}
                >
                  {feature.icon}
                </motion.div>
                <p className="text-black">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="py-12 bg-[#4f4ce1]/5 rounded-2xl px-6 my-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#4f4ce1] mb-2">🛒 خطوات بسيطة للحصول على بطاقتك:</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-6"
              >
                <div className="bg-[#4f4ce1] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <p className="text-lg text-black">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why We Ask for Photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#4f4ce1] mb-4">🤝 لماذا نطلب صورة الكتيب والطرد؟</h2>
            <p className="text-black mb-6">نحن نطلب هذه الصور للتأكد أنك عميل فعلي معنا، وهذا يساعد على:</p>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#4f4ce1] ml-2 flex-shrink-0 mt-0.5" />
                  <span className="text-black">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={cryptoCard2}
              alt="توضيح لعملية التحقق"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#4f4ce1] mb-2">👀 شاهد شكل البطاقة</h2>
          </div>

          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg mb-6">
            <AnimatePresence mode="wait">
              {cardImages.map(
                (image, index) =>
                  activeImage === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`صورة البطاقة ${index + 1}`}
                        className="w-full h-full object-contain bg-white"
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {cardImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-3 h-3 rounded-full ${activeImage === index ? "bg-[#4f4ce1]" : "bg-[#4f4ce1]/20"}`}
                aria-label={`عرض صورة البطاقة ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center py-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-[#4f4ce1] mb-4">مستعد تبدأ؟ 🤩</h2>
          <p className="text-black mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف العملاء الراضين واستمتع بتجربة تسوق عالمية بدون قيود!
          </p>
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
            <motion.button
              onClick={() => {
                const orderSection = document.getElementById("order-section")
                if (orderSection) {
                  orderSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(79, 76, 225, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#4f4ce1] hover:bg-[#4f4ce1]/90 text-white font-bold py-4 px-8 rounded-xl text-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                اطلب بطاقتك الآن
                <motion.span
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mr-2"
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#4f4ce1] via-purple-500 to-[#4f4ce1]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                style={{ zIndex: 0 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md text-black">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#4f4ce1]">تم تأكيد الطلب!</DialogTitle>
            <DialogDescription className="text-center text-gray-700">تم تقديم طلبك بنجاح.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="relative w-64 h-64 mb-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-[#4f4ce1] to-indigo-500 opacity-75 blur-lg" />
                  <div className="relative bg-white rounded-full p-8">
                    <PartyPopper className="h-16 w-16 text-[#4f4ce1]" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ zIndex: -1 }}
              >
                <svg width="240" height="240" viewBox="0 0 240 240">
                  <defs>
                    <filter id="graffiti" x="-20%" y="-20%" width="140%" height="140%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
                    </filter>
                  </defs>
                  <g filter="url(#graffiti)">
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="#4f4ce1"
                      strokeWidth="8"
                      strokeDasharray="15 10"
                    />
                    <path d="M70,120 C90,90 150,90 170,120" fill="none" stroke="#4f4ce1" strokeWidth="6" />
                    <path d="M80,80 L100,60 L120,80 L140,60 L160,80" fill="none" stroke="#4f4ce1" strokeWidth="4" />
                  </g>
                </svg>
              </motion.div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">شكراً لطلبك!</h3>
            <p className="text-center text-gray-700 mb-4">
              تم تأكيد طلبك رقم #{orderNumber} وجاري معالجته. سوف تتلقى رسالة تأكيد عبر البريد الإلكتروني قريباً.
            </p>
            <div className="w-full max-w-xs p-4 bg-[#4f4ce1]/10 rounded-lg">
              <p className="text-sm text-center font-medium text-black">
                الخطوة التالية: أرسل صورة الكتيب والطرد عبر واتساب
              </p>
            </div>
          </div>
          <DialogFooter>
            <motion.button
              onClick={() => setShowConfirmModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#4f4ce1] text-white py-3 px-4 rounded-lg font-bold"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(79, 76, 225, 0)",
                  "0 0 15px rgba(79, 76, 225, 0.7)",
                  "0 0 0 rgba(79, 76, 225, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              متابعة
            </motion.button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
