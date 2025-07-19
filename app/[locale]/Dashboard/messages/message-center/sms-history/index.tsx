"use client"

import { useShop } from "@/app/context/ShopContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useTranslations } from "next-intl"

export function SMSHistory() {
  const t = useTranslations("messages.table")
  const { shopData } = useShop()

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold glow">{t("recent-sms") || "Recent SMS Messages"}</h3>
        {/* Excel import buttons removed as per new requirements */}
      </div>
      {/* Assuming shopData.sms now holds the SMS history data */}
      <DataTable columns={columns} data={shopData.sms || []} />
    </div>
  )
}
