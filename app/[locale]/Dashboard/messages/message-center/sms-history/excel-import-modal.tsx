"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileSpreadsheet, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useShop } from "@/app/context/ShopContext"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"

interface ExcelImportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExcelImportModal({ isOpen, onClose }: ExcelImportModalProps) {
  const t = useTranslations("messages.import")
  const { shopData, setShopData } = useShop()

  const [file, setFile] = useState<File | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [selectedColumn, setSelectedColumn] = useState<string>("")
  const [trackingCount, setTrackingCount] = useState<number>(0)
  const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [jsonData, setJsonData] = useState<any[]>([])

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFile(file)
      parseExcel(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  })

  // Parse Excel file to get columns
  const parseExcel = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet)

        if (parsedData.length === 0) {
          setErrorMessage(t("empty-file") || "The file appears to be empty")
          setImportStatus("error")
          return
        }

        // Extract column headers
        const firstRow = parsedData[0]
        const headers = Object.keys(firstRow)

        setColumns(headers)
        setJsonData(parsedData)
        setImportStatus("idle")
        setErrorMessage("")

        // Auto-select column if it contains "track" in the name
        const trackingColumn = headers.find((header) => header.toLowerCase().includes("track"))
        if (trackingColumn) {
          setSelectedColumn(trackingColumn)
          updateTrackingCount(parsedData, trackingColumn)
        } else if (headers.length > 0) {
          setSelectedColumn(headers[0])
          updateTrackingCount(parsedData, headers[0])
        }
      } catch (error) {
        console.error("Error parsing Excel file:", error)
        setErrorMessage(t("parse-error") || "Failed to parse the file. Please ensure it's a valid Excel file.")
        setImportStatus("error")
      }
    }

    reader.onerror = () => {
      setErrorMessage(t("read-error") || "Failed to read the file")
      setImportStatus("error")
    }

    reader.readAsBinaryString(file)
  }

  // Update tracking count when column selection changes
  const updateTrackingCount = (data: any[], columnName: string) => {
    const trackingIds = data.map((row) => row[columnName]).filter((id) => id !== undefined && id !== null && id !== "")

    setTrackingCount(trackingIds.length)
  }

  // Handle column selection change
  const handleColumnChange = (columnName: string) => {
    setSelectedColumn(columnName)
    updateTrackingCount(jsonData, columnName)
  }

  // Handle import
  const handleImport = async () => {
    if (!file || !selectedColumn) {
      setErrorMessage(t("select-column") || "Please select a column containing tracking IDs")
      setImportStatus("error")
      return
    }

    setImportStatus("loading")

    try {
      // Extract tracking IDs from the selected column
      const trackingIds = jsonData
        .map((row) => row[selectedColumn])
        .filter((id) => id !== undefined && id !== null && id !== "")

      if (trackingIds.length === 0) {
        setErrorMessage(t("no-tracking-ids") || "No tracking IDs found in the selected column")
        setImportStatus("error")
        return
      }

      console.log("Imported tracking IDs:", trackingIds)

      // Here you would typically send these tracking IDs to your backend
      // For now, we'll just simulate success

      toast({
        title: t("import-success") || "Import Successful",
        description: `${trackingIds.length} tracking IDs imported successfully`,
      })

      setImportStatus("success")

      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
        resetState()
      }, 2000)
    } catch (error) {
      console.error("Error importing tracking IDs:", error)
      setErrorMessage(t("import-error") || "Failed to import tracking IDs")
      setImportStatus("error")
    }
  }

  // Reset state when closing the modal
  const resetState = () => {
    setFile(null)
    setColumns([])
    setSelectedColumn("")
    setTrackingCount(0)
    setJsonData([])
    setImportStatus("idle")
    setErrorMessage("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          resetState()
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("import-tracking") || "Import Tracking IDs"}</DialogTitle>
          <DialogDescription>
            {t("import-description") || "Upload an Excel file containing tracking IDs to import"}
          </DialogDescription>
        </DialogHeader>

        {importStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("error") || "Error"}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {importStatus === "success" && (
          <Alert className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>{t("success") || "Success"}</AlertTitle>
            <AlertDescription>{t("import-success-message") || "Tracking IDs imported successfully"}</AlertDescription>
          </Alert>
        )}

        {!file && importStatus !== "success" && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            }`}
          >
            <input {...getInputProps()} />
            <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive
                ? t("drop-file") || "Drop the Excel file here..."
                : t("drag-or-click") || "Drag and drop an Excel file here, or click to select"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("supported-formats") || "Supports .xlsx, .xls, and .csv files"}
            </p>
          </div>
        )}

        {file && importStatus !== "success" && (
          <>
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFile(null)
                  setColumns([])
                  setSelectedColumn("")
                  setTrackingCount(0)
                  setJsonData([])
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {columns.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="column-select">
                    {t("select-tracking-column") || "Select column containing tracking IDs"}
                  </Label>
                  <Select value={selectedColumn} onValueChange={handleColumnChange}>
                    <SelectTrigger id="column-select">
                      <SelectValue placeholder={t("select-column") || "Select a column"} />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedColumn && (
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("tracking-ids-found") || "Tracking IDs found:"}</span>
                      <span className="text-sm font-bold">{trackingCount}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={importStatus === "loading"}>
            {t("cancel") || "Cancel"}
          </Button>
          {file && importStatus !== "success" && (
            <Button
              onClick={handleImport}
              disabled={!selectedColumn || trackingCount === 0 || importStatus === "loading"}
              className="ml-2"
            >
              {importStatus === "loading" ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("importing") || "Importing..."}
                </span>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {t("import") || "Import"}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

