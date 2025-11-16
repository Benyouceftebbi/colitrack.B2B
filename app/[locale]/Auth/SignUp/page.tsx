"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
  Building2,
  Mail,
  Phone,
  Lock,
  User,
  TrendingUp,
} from "lucide-react"
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
import { PrivacyPolicy } from "./components/privacy-policy"
import { TermsConditions } from "./components/terms-conditions"
import { useSearchParams } from "next/navigation"

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
    dailyOrderVolume: z.coerce.number().int().min(1, { message: "Please enter your average daily orders (min 1)." }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
    senderId: z.string().optional(),
    tokens: z.number().min(0, {
      message: "Tokens must be at least 0.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] flex items-center justify-center">
    <div className="bg-card rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-border">
      <div className="relative">
        <svg
          className="animate-spin h-12 w-12 text-primary"
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
      </div>
      <p className="text-foreground text-lg font-semibold mt-6">Redirecting to dashboard...</p>
      <p className="text-muted-foreground text-sm mt-2">Setting up your account</p>
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

  const isValidAlgerianPhone = (phone: string) => {
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
      setSmsSent(true)
    } catch (error) {
      setPhoneError("Failed to send test SMS. Please try again later.")
    } finally {
      setIsSendingSms(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-50 p-4">
      <div className="bg-card rounded-2xl p-8 shadow-2xl max-w-lg w-full border border-border animate-slide-in">
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              isSuccess ? "bg-emerald-500/10" : "bg-red-500/10"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
              <span className="text-red-500 text-2xl">⚠️</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{message}</p>
          </div>
        </div>

        {isSuccess && (
          <div className="mt-6 space-y-4">
            <div className="bg-muted/50 border border-border p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Test SMS Delivery {smsSent && <span className="text-emerald-500">(Completed)</span>}
                </h3>
              </div>

              {!smsSent ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send a test message to verify SMS functionality before accessing your dashboard.
                  </p>
                  <div className="space-y-3">
                    <Input
                      value={testPhoneNumber}
                      onChange={(e) => setTestPhoneNumber(e.target.value)}
                      placeholder="0561234567"
                      className="bg-background"
                    />
                    {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}
                    <Button
                      type="button"
                      onClick={handleSendTestSms}
                      disabled={isSendingSms}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSendingSms ? "Sending..." : "Send Test SMS"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Test message sent successfully!</p>
                    <p className="text-sm mt-1">Message sent to: {testPhoneNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3 justify-end">
          <Button
            onClick={onClose}
            disabled={isSuccess && !smsSent}
            className={`px-6 ${
              isSuccess && !smsSent
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            {isSuccess ? "Go to Dashboard" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SignUp() {
  const t = useTranslations("signin")
  const { signup } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validatedPromoCode, setValidatedPromoCode] = useState<string | "">("")
  const [tokenAmount, setTokenAmount] = useState(50)
  const [promoApplied, setPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      businessType: "",
      otherBusinessType: "",
      dailyOrderVolume: 10,
      password: "",
      confirmPassword: "",
      terms: false,
      senderId: "",
      tokens: 50,
      // ... existing analytics defaults ...
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


  const [modalContent, setModalContent] = useState({ title: "", message: "" })

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
      router.push("/Dashboard")
      return
    } else {
      console.error("Sign up error:")
      setModalContent({
        title: "Sign Up Error",
        message: "An error occurred during sign up. Please try again.",
      })

    }
  }



  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      {isLoading && <LoadingOverlay />}

      <div className="max-w-4xl w-full">
        <Button variant="ghost" onClick={() => router.replace("/")} className="mb-6 group hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" />
          {t("backToSignIn")}
        </Button>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="border-b border-border bg-muted/30 px-8 py-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t("createAccount")}</h1>
                <p className="text-muted-foreground mt-1">{t("getStarted")}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                      <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            <User className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("firstName")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background border-input h-11" />
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
                          <FormLabel className="text-foreground font-medium">
                            <Mail className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("email")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-background border-input h-11"
                              onChange={(e) => field.onChange(e.target.value.toLowerCase())}
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
                          <FormLabel className="text-foreground font-medium">
                            <Phone className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("phoneNumber")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="bg-background border-input h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Business Details</h2>
                      <p className="text-sm text-muted-foreground">Information about your company</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            <Building2 className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("companyName")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background border-input h-11" />
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
                          <FormLabel className="text-foreground font-medium">{t("businessType")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-input h-11">
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
                            <FormLabel className="text-foreground font-medium">{t("pleaseSpecify")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-background border-input h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="dailyOrderVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            <TrendingUp className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("daily-order-volume")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              step={1}
                              inputMode="numeric"
                              placeholder="e.g. 35"
                              className="bg-background border-input h-11"
                              value={Number.isNaN(field.value as any) ? "" : field.value}
                              onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Security</h2>
                      <p className="text-sm text-muted-foreground">Create a secure password</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            <Lock className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("password")}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="bg-background border-input h-11 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
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
                          <FormLabel className="text-foreground font-medium">
                            <Lock className="w-4 h-4 inline mr-2 text-muted-foreground" />
                            {t("confirmPassword")}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                className="bg-background border-input h-11 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-6 rounded-xl">
  <div className="flex items-center gap-2 mb-4">
    <Sparkles className="w-5 h-5 text-primary" />
    <h3 className="text-base font-semibold text-foreground">
      {t("senderIdSectionTitle")}
    </h3>
  </div>

  <FormField
    control={form.control}
    name="senderId"
    render={({ field }) => (
      <FormItem>
        <div className="flex gap-3">
          <FormControl>
            <Input
              {...field}
              placeholder={t("senderIdPlaceholder")}
              className="bg-background border-input h-11 flex-1"
              maxLength={11}
              onChange={(e) => {
                const raw = e.target.value;

                // remove accents
                const noAccents = raw
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                // keep only A–Z letters, no spaces / digits / symbols
                const onlyLetters = noAccents.replace(/[^A-Za-z]/g, "");

                // max 11 chars, uppercased
                const finalValue = onlyLetters.slice(0, 11)

                field.onChange(finalValue);
              }}
            />
          </FormControl>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {t("senderIdHelperText", {
            max: 11,
          }) || "Maximum 11 lettres, sans accents (A–Z)."}
        </p>

        <FormMessage />
      </FormItem>
    )}
  />
</div>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-muted/30 p-4 rounded-lg border border-border">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-foreground leading-relaxed">
                          {t("termsAgreement")}{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowTerms(true)
                            }}
                            className="text-primary hover:underline font-medium"
                          >
                            {t("termsLink")}
                          </button>{" "}
                          {t("and")}{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowPrivacyPolicy(true)
                            }}
                            className="text-primary hover:underline font-medium"
                          >
                            {t("privacyLink")}
                          </button>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <LoadingButton
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                  loading={form.formState.isSubmitting}
                >
                  {t("createAccountButton")}
                </LoadingButton>
              </form>
            </Form>

            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                {t("alreadyHaveAccount")}{" "}
                <button onClick={() => router.replace("/")} className="text-primary hover:underline font-medium">
                  {t("signIn")}
                </button>
              </p>
            </div>
          </div>
        </div>

        <PrivacyPolicy open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy} />
        <TermsConditions open={showTerms} onOpenChange={setShowTerms} />
      </div>
    </div>
  )
}
