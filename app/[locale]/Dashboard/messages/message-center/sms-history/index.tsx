"use client"

import { useShop } from "@/app/context/ShopContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
interface SenderProps {
    senderId: string | null

}
export function SMSHistory({ senderId }: SenderProps) {
  const t = useTranslations("messages.table")
  const { shopData } = useShop()

  // فلترة الـ SMS حسب الـ senderId
  const filteredSms = useMemo(() => {
    if (!shopData?.sms) return []

    if (!senderId || senderId === "all") {
      return shopData.sms
    }

    // ⚡️ special case: إذا الـ senderId يساوي worldexpress نحذف آخر s
    const normalizedSender =
      senderId === "worldexpress" ? "worldexpres" : senderId

    return shopData.sms.filter(
      (sms: any) => sms.senderId === normalizedSender
    )
  }, [shopData?.sms, senderId])

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold glow">
          {t("recent-sms") || "Recent SMS Messages"}
        </h3>
      </div>

      <DataTable columns={columns} data={filteredSms} />
    </div>
  )
}