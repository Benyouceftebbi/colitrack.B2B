"use client"

import { useShop } from "@/app/context/ShopContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useTranslations } from "next-intl"
import { ExcelImportButton } from "./excel-import-button"

// Sample parcel data with message types
const sampleParcelData = [
  {
    id: "p1",
    trackingId: "TRK12345678",
    phoneNumber: "+1234567890",
    status: "in-transit",
    location: "Distribution Center",
    messageTypes: ["Real-Time Tracking"],
    lastStatus: "shipped",
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
  {
    id: "p2",
    trackingId: "TRK87654321",
    phoneNumber: "+1987654321",
    status: "at-domicile",
    location: "Residential Address",
    messageTypes: ["Real-Time Tracking", "Delivery Alert"],
    lastStatus: "delivered",
    createdAt: new Date(Date.now() - 3600000 * 12),
  },
  {
    id: "p3",
    trackingId: "TRK11223344",
    phoneNumber: "+1122334455",
    status: "stop-desk",
    location: "Pickup Point",
    messageTypes: ["Real-Time Tracking", "Pickup Notification"],
    lastStatus: "shipped",
    createdAt: new Date(Date.now() - 3600000 * 48),
  },
  {
    id: "p4",
    trackingId: "TRK55667788",
    phoneNumber: "+1556677889",
    status: "in-transit",
    location: "Sorting Facility",
    messageTypes: ["Real-Time Tracking"],
    lastStatus: "shipped",
    createdAt: new Date(Date.now() - 3600000 * 36),
  },
  {
    id: "p5",
    trackingId: "TRK99887766",
    phoneNumber: "+1998877665",
    status: "at-domicile",
    location: "Business Address",
    messageTypes: ["Real-Time Tracking", "Delivery Alert"],
    lastStatus: "delivered",
    createdAt: new Date(Date.now() - 3600000 * 6),
  },
  {
    id: "p6",
    trackingId: "TRK44332211",
    phoneNumber: "+1443322110",
    status: "stop-desk",
    location: "Local Post Office",
    messageTypes: ["Real-Time Tracking", "Pickup Notification"],
    lastStatus: "shipped",
    createdAt: new Date(Date.now() - 3600000 * 72),
  },
]

export function SMSHistory() {
  const t = useTranslations("messages.table")
  const { shopData } = useShop()

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold glow">{t("recent-parcels") || "Recent Parcels"}</h3>
        {shopData.deliveryCompany === "NOEST Express" && <ExcelImportButton />}
      </div>
      <DataTable columns={columns} data={shopData.tracking} />
    </div>
  )
}

