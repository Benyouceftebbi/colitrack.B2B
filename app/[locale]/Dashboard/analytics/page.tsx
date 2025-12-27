"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Download, RotateCcw, ChevronDown, Loader2, AlertCircle, Search } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import * as XLSX from "xlsx"
import STATIONS_DATA from "@/lib/stations.json"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useShop } from "@/app/context/ShopContext"

const STATIONS = Object.values(STATIONS_DATA)
  .map((station: any) => ({ name: station.name }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"))

interface SMSData {
  station: string
  smsCount: number
}

export default function SMSFilterPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedStations, setSelectedStations] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [tableData, setTableData] = useState<SMSData[]>([])
  const [isStationDropdownOpen, setIsStationDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const {shopData}=useShop()

  const handleStationToggle = (stationName: string) => {
    setSelectedStations((prev) =>
      prev.includes(stationName) ? prev.filter((s) => s !== stationName) : [...prev, stationName],
    )
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStations([])
      setIsAllSelected(false)
    } else {
      setSelectedStations(STATIONS.map((s) => s.name))
      setIsAllSelected(true)
    }
  }

  const handleSearch = async () => {
    setError("")

    if (selectedStations.length === 0) {
      setError("Veuillez sélectionner au moins une station")
      return
    }

    if (!startDate) {
      setError("Veuillez sélectionner une date de début")
      return
    }

    if (!endDate) {
      setError("Veuillez sélectionner une date de fin")
      return
    }

    if (startDate > endDate) {
      setError("La date de début doit être antérieure à la date de fin")
      return
    }

    const today = new Date()
    today.setHours(23, 59, 59, 999)
    if (startDate > today || endDate > today) {
      setError("Les dates ne peuvent pas être dans le futur")
      return
    }

    setIsLoading(true)

    try {
      const smsTotalsByStation = httpsCallable(functions, "smsTotalsByOffice");

      // 2) Call it
      const res = await smsTotalsByStation({
        clientId: shopData.id,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        dateField: "date",   
        stations: selectedStations,
      });
      
      // 3) Read output
      const { stations} = res.data as any;
      const transformedData: SMSData[] = Object.values(stations || {})
      .map((s: any) => ({
        station: s.name,
        smsCount: Number(s.totalSms) || 0,
      }))
      .sort((a, b) => b.smsCount - a.smsCount);

      setTableData(transformedData)
    } catch (error) {
      console.error("[v0] Error fetching SMS data:", error)
      setError("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setSelectedStations([])
    setIsAllSelected(false)
    setTableData([])
    setError("")
    setSearchTerm("")
  }
  const totalSMS = tableData.reduce((sum, item) => sum + item.smsCount, 0)
  const handleExportToExcel = () => {
    if (tableData.length === 0) return;
  
    const exportData = tableData.map((row) => ({
      Station: row.station,
      "Nombre de SMS": row.smsCount,
      Pourcentage: `${((row.smsCount / totalSMS) * 100).toFixed(2)}%`,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportData, { origin: "A2" }); // 👈 start at row 2
  
    // 👇 Add merged top row (A1:C1)
    XLSX.utils.sheet_add_aoa(worksheet, [[`Total SMS envoyés : ${totalSMS}`]], { origin: "A1" });
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }]; // merge A1..C1
  
    // optional: make it look nicer (column widths)
    worksheet["!cols"] = [{ wch: 35 }, { wch: 15 }, { wch: 15 }];
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport SMS");
  
    const fileName = `rapport_sms_${format(new Date(), "yyyy-MM-dd")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };


  const filteredTableData = tableData.filter((row) => row.station.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Tableau de Bord SMS</h1>
          <p className="text-muted-foreground">Filtrer et analyser la distribution des SMS par station</p>
        </div>

        <Card className="border-border bg-card p-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date de début</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus locale={fr} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date de fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus locale={fr} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Stations</label>
                <Popover open={isStationDropdownOpen} onOpenChange={setIsStationDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between font-normal bg-transparent">
                      <span className={cn(!selectedStations.length && "text-muted-foreground")}>
                        {isAllSelected
                          ? "Toutes les stations sélectionnées"
                          : selectedStations.length > 0
                            ? `${selectedStations.length} sélectionnée${selectedStations.length > 1 ? "s" : ""}`
                            : "Sélectionner des stations"}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="max-h-80 overflow-auto">
                      <div className="border-b border-border p-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={handleSelectAll} />
                          <label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Tout sélectionner
                          </label>
                        </div>
                      </div>
                      <div className="p-2">
                        {STATIONS.map((station) => (
                          <div
                            key={station.name}
                            className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
                          >
                            <Checkbox
                              id={station.name}
                              checked={selectedStations.includes(station.name)}
                              onCheckedChange={() => handleStationToggle(station.name)}
                            />
                            <label
                              htmlFor={station.name}
                              className="flex-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {station.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSearch} size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  "Appliquer les filtres"
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" disabled={isLoading}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
              {tableData.length > 0 && (
                <Button onClick={handleExportToExcel} variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter vers Excel
                </Button>
              )}
            </div>
          </div>
        </Card>

        {tableData.length > 0 && (
          <Card className="border-border bg-card">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Rapport de distribution SMS</h2>
                  <p className="text-sm text-muted-foreground">
                    {startDate && endDate
                      ? `${format(startDate, "PPP", { locale: fr })} - ${format(endDate, "PPP", { locale: fr })}`
                      : "Toutes les dates"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Rechercher une station..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total SMS envoyés</p>
                    <p className="text-2xl font-semibold text-foreground">{totalSMS.toLocaleString("fr-FR")}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Station</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Nombre de SMS</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Pourcentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData.length > 0 ? (
                      filteredTableData.map((row, index) => (
                        <tr
                          key={row.station}
                          className={cn(
                            "border-b border-border transition-colors hover:bg-muted/50",
                            index === filteredTableData.length - 1 && "border-b-0",
                          )}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{row.station}</td>
                          <td className="px-4 py-3 text-right text-sm text-foreground">
                            {row.smsCount.toLocaleString("fr-FR")}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                            {((row.smsCount / totalSMS) * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                          Aucune station trouvée correspondant à "{searchTerm}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {tableData.length === 0 && !isLoading && (
          <Card className="border-border bg-card p-12">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <CalendarIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground">Aucune donnée à afficher</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez vos filtres et cliquez sur "Appliquer les filtres" pour visualiser les analyses SMS
              </p>
            </div>
          </Card>
        )}

        {isLoading && (
          <Card className="border-border bg-card p-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Chargement des données SMS...</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
