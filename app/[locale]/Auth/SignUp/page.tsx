"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/app/context/AuthContext"
import { LoadingButton } from "@/components/ui/LoadingButton"
import Link from "next/link"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 digits.",
    }),
    companyName: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    businessType: z.string().min(1, {
      message: "Please select a business type.",
    }),
    otherBusinessType: z.string().optional(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
    promoCode: z.string().optional(),
    tokens: z.number().min(0, {
      message: "Tokens must be at least 0.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Full-screen loading overlay component
export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Redirecting to dashboard...</p>
    </div>
  </div>
)

interface ModalProps {
  title: string
  message: string
  onClose: () => void
  isSuccess?: boolean
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose, isSuccess = false }) => {
  const [testPhoneNumber, setTestPhoneNumber] = useState("")
  const [isSendingSms, setIsSendingSms] = useState(false)
  const [smsSent, setSmsSent] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  // Validate Algerian phone number format
  const isValidAlgerianPhone = (phone: string) => {
    // Must start with 0 followed by 5, 6, or 7, and be 10 digits total
    const algerianPhoneRegex = /^0[5-7][0-9]{8}$/
    return algerianPhoneRegex.test(phone)
  }

  const handleSendTestSms = async () => {
    setPhoneError("")

    if (!testPhoneNumber) {
      setPhoneError("Please enter a phone number")
      return
    }

    if (!isValidAlgerianPhone(testPhoneNumber)) {
      setPhoneError("Please enter a valid Algerian phone number (e.g., 0561234567)")
      return
    }

    setIsSendingSms(true)
    try {
      const signUpSMS = httpsCallable(functions, "signUpSMS")
      const result = await signUpSMS({ phoneNumber: testPhoneNumber })

      if (result.data?.status === "success") {
        setSmsSent(true)
      } else {
        setPhoneError("Failed to send SMS. Please try again.")
      }
    } catch (error) {
      setPhoneError("Failed to send test SMS. Please try again later.")
    } finally {
      setIsSendingSms(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{message}</p>

        {isSuccess && (
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Test SMS Delivery {smsSent && <span className="text-green-600 dark:text-green-400">(Completed)</span>}
              </h3>

              {!smsSent ? (
                <>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    You must send a test message before proceeding to the dashboard.
                  </p>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        value={testPhoneNumber}
                        onChange={(e) => setTestPhoneNumber(e.target.value)}
                        placeholder="Enter Algerian phone number (e.g., 0561234567)"
                        className="border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      />
                      {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                    </div>
                    <Button
                      type="button"
                      onClick={handleSendTestSms}
                      disabled={isSendingSms}
                      className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      {isSendingSms ? "Sending..." : "Send"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Test message sent successfully!</p>
                    <p className="text-sm">Message sent to: {testPhoneNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            disabled={isSuccess && !smsSent}
            className={`${
              isSuccess && !smsSent ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white dark:bg-indigo-500 dark:hover:bg-indigo-600`}
          >
            {isSuccess ? "Go to Dashboard" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SignUp() {
  const t = useTranslations("signin") // Updated translation namespace
  const { signup } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [validatedPromoCode, setValidatedPromoCode] = useState<string | "">("")
  const [tokenAmount, setTokenAmount] = useState(50)
  const [promoApplied, setPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      businessType: "",
      otherBusinessType: "",
      password: "",
      confirmPassword: "",
      terms: false,
      promoCode: "", // Changed from null to empty string
      tokens: 50,
      analytics: {
        January: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        February: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        March: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        April: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        May: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        June: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        July: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        August: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        September: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        October: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        November: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
        December: {
          totalSmsSent: 0,
          totalSmsSentInCampaign: 0,
          returnRate: 0,
          totalSmsOfOneTapLink: 0,
          totalSmsOutOfDelivery: 0,
        },
      },
      smsByState: {
        lagos: {
          totalNumberOfSms: 0,
        },
        abuja: {
          totalNumberOfSms: 0,
        },
        portHarcourt: {
          totalNumberOfSms: 0,
        },
        // ... add other states as needed
      },
      shippedSms: false,
      outForDeliverySms: false,
      readyToBePickedSms: false,
      totalOrders: 0,
      totalOrdersReturned: 0,
    },
  })

  const businessTypes = [
    t("businessTypes.ecommerce"),
    t("businessTypes.retail"),
    t("businessTypes.dropshipping"),
    t("businessTypes.marketplace"),
    t("businessTypes.socialCommerce"),
    t("businessTypes.other"),
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", message: "" })

  // Clean up loading state when component unmounts or route changes
  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await signup(values)
    if (user) {
      console.log("Sign up successful")
      setModalContent({
        title: "Account Created Successfully!",
        message: "Your account has been created. You must send a test SMS before proceeding to the dashboard.",
      })
      setIsModalOpen(true)
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "CompleteRegistration", {
          value: 0,
          currency: "USD",
          content_name: "User Signup",
          email: user.email,
        });
      }
      return
    } else {
      console.error("Sign up error:")
      setModalContent({
        title: "Sign Up Error",
        message: "An error occurred during sign up. Please try again.",
      })
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    if (modalContent.title.includes("Success")) {
      setIsLoading(true)
      // Navigate to dashboard immediately
      setIsModalOpen(false)
      router.push("/dashboard/settings")
    } else {
      setIsModalOpen(false)
    }
  }

  const handleApplyPromoCode = () => {
    const promoCode = form.getValues("promoCode")

    if (promoCode === "NEW10X") {
      setTokenAmount(500)
      setValidatedPromoCode(promoCode)
      form.setValue("tokens", 500)
      setPromoApplied(true)
    } else {
      setTokenAmount(50)
      setValidatedPromoCode("")
      form.setValue("tokens", 50)
      form.setValue("promoCode", "")
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      {isLoading && <LoadingOverlay />}

      <div className="max-w-2xl w-full">
        <Button variant="ghost" onClick={() => router.replace('/')} className="mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" />
          {t("backToSignIn")}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xl">C</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{t("createAccount")}</h1>
            </div>
            <p className="text-indigo-100 mt-2">{t("getStarted")}</p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("firstName")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("phoneNumber")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("companyName")}</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("businessType")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("businessType") === t("businessTypes.other") && (
                    <FormField
                      control={form.control}
                      name="otherBusinessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("pleaseSpecify")}</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("password")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("confirmPassword")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Promo Code Section 
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                    {t("promoCodeSectionTitle")}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 mb-2">
                    {t("promoCodeSectionDescription")}
                  </p>
                  <FormField
                    control={form.control}
                    name="promoCode"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex space-x-2">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("promoCodePlaceholder")}
                              className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
                              disabled={promoApplied}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-300"
                            onClick={handleApplyPromoCode}
                            disabled={promoApplied}
                          >
                            {t("applyPromoCode")}
                          </Button>
                        </div>
                        {promoApplied && (
                          <div className="mt-2">
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {validatedPromoCode
                                ? `${t("promoCodeApplied", { promoCode: validatedPromoCode, tokenAmount: tokenAmount })}`
                                : `${t("defaultBonusApplied", { tokenAmount: tokenAmount })}`}
                            </p>
                            <Button
                              type="button"
                              variant="link"
                              className="text-xs text-indigo-600 p-0 h-auto mt-1"
                              onClick={() => {
                                setPromoApplied(false)
                                form.setValue("promoCode", "")
                              }}
                            >
                              {t("tryDifferentCode")}
                            </Button>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>*/}

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                          {t("termsAgreement")}
                          <Link
                            href="/terms"
                            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            {t("termsLink")}
                          </Link>
                          {t("and")}
                          <Link
                            href="/privacy"
                            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            {t("privacyLink")}
                          </Link>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <LoadingButton
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                  loading={form.formState.isSubmitting}
                >
                  {t("createAccountButton")}
                </LoadingButton>

               
              </form>
            </Form>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            <p className="text-gray-600 dark:text-gray-300">
      {t("alreadyHaveAccount")}
      <button
        onClick={() => router.replace('/')}
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
      >
        {t("signIn")}
      </button>
      </p>
    </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal
            title={modalContent.title}
            message={modalContent.message}
            onClose={handleCloseModal}
            isSuccess={modalContent.title.includes("Success")}
          />
        )}
      </div>
    </div>
  )
}

