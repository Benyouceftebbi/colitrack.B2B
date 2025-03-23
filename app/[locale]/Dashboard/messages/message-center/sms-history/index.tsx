"use client"

import { useShop } from "@/app/context/ShopContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useTranslations } from "next-intl"
import { ExcelImportButton } from "./excel-import-button"

export function SMSHistory() {
  const t = useTranslations("messages.table")
  const { shopData } = useShop()

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold glow">{t("recent-messages")}</h3>
        {shopData.deliveryCompany === "NOEST Express" && <ExcelImportButton />}
      </div>
      <DataTable columns={columns} data={shopData.sms} />
    </div>
  )
}
