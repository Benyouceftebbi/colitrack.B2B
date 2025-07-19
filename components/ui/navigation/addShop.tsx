"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Building2, Phone, Store, User, Mail, Lock, Send, Eye, EyeOff } from "lucide-react" // Added Eye, EyeOff icons
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useShop } from "@/app/context/ShopContext"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { LoadingButton } from "../LoadingButton"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  businessType: z.string().min(1, {
    message: "Please select a business type.",
  }),
  customBusinessType: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  senderId: z.string().length(11, {
    message: "Sender ID must be exactly 11 characters.",
  }),
})

export function AddShopModal() {
  const t = useTranslations("navigation")
  const [open, setOpen] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false) // New state for password visibility
  const { shops, setShops, setShopData, shopData } = useShop()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      companyName: "",
      phoneNumber: "",
      businessType: "",
      customBusinessType: "",
      email: "",
      password: "",
      senderId: "",
    },
  })

  const businessType = form.watch("businessType")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const finalBusinessType =
      values.businessType === "other" && values.customBusinessType ? values.customBusinessType : values.businessType

    const newShop = {
      firstName: values.firstName,
      companyName: values.companyName,
      phoneNumber: values.phoneNumber,
      businessType: finalBusinessType,
      sms: [],
      tracking: [],
      smsCampaign: [],
      terms: true,
      email: values.email,
      password: values.password,
      senderId: values.senderId,
      tokens: 0,
    }

    const addShop = httpsCallable(functions, "addShop")
    const response = await addShop({ newShop })
    const newShopWithId = { ...newShop, id: response.data.id }

    const updatedShops = [...shops, newShopWithId]
    setShops(updatedShops)

    setShopData(newShopWithId)

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Store className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">{t("addShop")}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("addNewShop")}</DialogTitle>
          <DialogDescription>{t("enterShopDetails")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("firstName")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-10" placeholder={t("firstNamePlaceholder")} {...field} />
                    </div>
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
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-10" placeholder={t("companyNamePlaceholder")} {...field} />
                    </div>
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
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-10" placeholder={t("phoneNumberPlaceholder")} {...field} />
                    </div>
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
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-10" type="email" placeholder={t("emailPlaceholder")} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-10 pr-10" // Added pr-10 for space for the icon
                        type={showPassword ? "text" : "password"} // Toggle type
                        placeholder={t("passwordPlaceholder")}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
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
              name="senderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("senderId")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Send className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-10" placeholder={t("senderIdPlaceholder")} maxLength={11} {...field} />
                    </div>
                  </FormControl>
                  <span className="text-sm text-muted-foreground">
                    {field.value.length}/{11} {t("charactersLimit")}
                  </span>
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
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectBusinessType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="retail">{t("businessTypes.retail")}</SelectItem>
                      <SelectItem value="ecommerce">{t("businessTypes.ecommerce")}</SelectItem>
                      <SelectItem value="wholesale">{t("businessTypes.wholesale")}</SelectItem>
                      <SelectItem value="manufacturing">{t("businessTypes.manufacturing")}</SelectItem>
                      <SelectItem value="service">{t("businessTypes.service")}</SelectItem>
                      <SelectItem value="other">{t("businessTypes.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {businessType === "other" && (
              <FormField
                control={form.control}
                name="customBusinessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("customBusinessType")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("customBusinessTypePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {t("cancel")}
              </Button>
              <LoadingButton loading={form.formState.isSubmitting} type="submit">
                {t("addShop")}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
