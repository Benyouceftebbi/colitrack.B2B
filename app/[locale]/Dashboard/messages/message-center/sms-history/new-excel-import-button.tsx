"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { NEWExcelImportModal } from "./new-excel-import-modal"
import { useTranslations } from "next-intl"

export function NEWExcelImportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations("messages.import")

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="bg-background/50 border-white/10 hover:bg-white/5"
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        {t("import-tracking") || "Import Tracking IDs"}
      </Button>

      <NEWExcelImportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
