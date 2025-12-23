"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Download, RotateCcw, ChevronDown, Loader2, ArrowUpDown, ArrowUp, ArrowDown, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import * as XLSX from "xlsx"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useShop } from "@/app/context/ShopContext"

const COMMUNES_DATA = {
  "4c483931929d": { commune: "Blida", wilaya: "Wilaya de Blida" },
  f6795590c1d5: { commune: "Batna", wilaya: "Batna Province" },
  "19b34a8f047c": { commune: "Bouira", wilaya: "Wilaya de Bouira" },
  ec48eb1c976e: { commune: "Chlef", wilaya: "Chlef Province" },
  c5c304eee927: { commune: "Akbou", wilaya: "Wilaya de Béjaïa" },
  "8f0b3312f04f": { commune: "Médéa", wilaya: "Wilaya de Médéa" },
  "821543528897": { commune: "Réghaïa", wilaya: "Algiers Province" },
  "46ada10eb904": { commune: "Biskra", wilaya: "Wilaya de Biskra" },
  "2ccbdfa6b2a3": { commune: "Aïn Defla", wilaya: "Aïn Defla Province" },
  "00ae48ce9924": { commune: "Chéraga", wilaya: "Algiers Province" },
  "97ec547d1ded": { commune: "Hassi Messaoud", wilaya: "Ouargla Province" },
  d60eacd299c0: { commune: "Tipaza", wilaya: "Wilaya de Tipaza" },
  "1557d7ddb3e6": { commune: "Khenchela", wilaya: "Khenchela Province" },
  d7f68e153952: { commune: "Ain Benian", wilaya: "Algiers Province" },
  "81b679d150a2": { commune: "Alger Centre", wilaya: "Wilaya d'Alger" },
  "5554f1697d10": { commune: "Tizi Ouzou", wilaya: "Wilaya de Tizi Ouzou" },
  "4ec7f0f9cb7a": { commune: "El-Harrach", wilaya: "Wilaya d'Alger" },
  "5695e0e66637": { commune: "Les Eucalyptus", wilaya: "Algiers Province" },
  af4542467eef: { commune: "Kouba", wilaya: "Wilaya d'Alger" },
  b740ae45f9f1: { commune: "Boufarik", wilaya: "Blida Province" },
  "142cb8a7c481": { commune: "Bordj El Bahri", wilaya: "Wilaya d'Alger" },
  "262a84552c55": { commune: "Bordj Bou Arreridj", wilaya: "Bordj Bou Arréridj Province" },
  "3a90275e7644": { commune: "Bab El Oued", wilaya: "Wilaya d'Alger" },
  bfa1b4fa4103: { commune: "Béjaïa", wilaya: "Béjaïa Province" },
  "4102030c4379": { commune: "Dellys", wilaya: "Boumerdès Province" },
  "854c28f79abb": { commune: "Tissemsilt", wilaya: "Wilaya de Tissemsilt" },
  "8ba390838423": { commune: "Bordj Menaïel", wilaya: "Wilaya de Boumerdès" },
  "3ef72f83dac0": { commune: "Mecheria", wilaya: "Naâma Province" },
  "25abe5c367a4": { commune: "Draria", wilaya: "Wilaya d'Alger" },
  cb86857f45d8: { commune: "Tlemcen", wilaya: "Tlemcen Province" },
  b75900b0ffcf: { commune: "Aïn Oussara", wilaya: "Wilaya de Djelfa" },
  f65f60d94ffa: { commune: "In Salah", wilaya: "Tamanrasset Province" },
  d8316f03098e: { commune: "Bou Saada", wilaya: "M'Sila Province" },
  a4f19c7d2e8b: { commune: "M'Sila", wilaya: "M'Sila Province" },
  "13a18c5f5315": { commune: "Boumerdès", wilaya: "Wilaya de Boumerdès" },
  "1b00572d9347": { commune: "El Bouni", wilaya: "Annaba Province" },
  "70cedf029932": { commune: "Setif", wilaya: "Sétif Province" },
  "6eb8365bdc9e": { commune: "Djelfa", wilaya: "Djelfa Province" },
  c5352abaeb84: { commune: "Azazga", wilaya: "Wilaya de Tizi Ouzou" },
  "1420a51d404d": { commune: "Ouargla", wilaya: "Ouargla Province" },
  f13b260df497: { commune: "El Eulma", wilaya: "Wilaya de Sétif" },
  "9451328e753c": { commune: "Hadjout", wilaya: "Wilaya de Tipaza" },
  d0afcd1b2dc8: { commune: "Ouled Djellal", wilaya: "Wilaya de Biskra" },
  "583e6adde459": { commune: "Relizane", wilaya: "Wilaya de Relizane" },
  "0fd6bd5f73ed": { commune: "Aïn Témouchent", wilaya: "Aïn Témouchent Province" },
  "1ff6ce5990fe": { commune: "Tiaret", wilaya: "Tiaret Province" },
  "0be5674ad869": { commune: "Aïn Oulmene", wilaya: "Sétif Province" },
  f53a1d9c0b7e: { commune: "Aïn Azel", wilaya: "Sétif Province" },
  "0c7e5b9a13fd": { commune: "Béchar", wilaya: "Béchar" },
  "82bb9656f7d3": { commune: "Tamanrasset", wilaya: "Tamanrasset Province" },
  "0fb8b2fabdd0": { commune: "Saïda", wilaya: "Saïda Province" },
  aca974132816: { commune: "El Oued", wilaya: "El Oued Province" },
  "451781f31312": { commune: "Mascara", wilaya: "Mascara Province" },
  beafcae44ef4: { commune: "Oran Centre", wilaya: "Wilaya d'Oran" },
  "027e2f3afc1c": { commune: "Annaba", wilaya: "Annaba Province" },
  "80289172ea85": { commune: "Ghardaia", wilaya: "Ghardaia Province" },
  "6e990392a288": { commune: "Oran Maraval", wilaya: "Wilaya d'Oran" },
  be3b7f7600b9: { commune: "El M'Ghair", wilaya: "El Oued Province" },
  fa42019b40af: { commune: "Oued Rhiou", wilaya: "Relizane Province" },
  "2c2060af33f4": { commune: "Oum el Bouaghi", wilaya: "Wilaya d'Oum El Bouaghi" },
  "765f1c83819e": { commune: "Bir El Djir", wilaya: "Oran Province" },
  "9b2d6e40c8a1": { commune: "Gambetta", wilaya: "Oran Province" },
  a7f9020e843a: { commune: "Adrar", wilaya: "Adrar Province" },
  "478a0907cbd3": { commune: "Mostaganem", wilaya: "Wilaya de Mostaganem" },
  c77aa2ed74b8: { commune: "commissaria", wilaya: "Constantine Province" },
  a5b3f6340d21: { commune: "Laghouat", wilaya: "Laghouat Province" },
  f8c9057a6121: { commune: "Mila", wilaya: "Wilaya de Mila" },
  babb9b1ca4a0: { commune: "Guelma", wilaya: "Wilaya de Guelma" },
  fe42f3628749: { commune: "Mecheria", wilaya: "Naâma Province" },
  "176b518b6545": { commune: "Oued Smar", wilaya: "Wilaya d'Alger" },
  "19b5e048b9f1": { commune: "Touggourt", wilaya: "Ouargla Province" },
  a9c7443a03ef: { commune: "Jijel", wilaya: "Jijel Province" },
  "5c8cd257d2db": { commune: "Sidi Bel Abbès", wilaya: "Wilaya de Sidi Bel Abbès" },
  f56500592213: { commune: "Maghnia", wilaya: "Tlemcen Province" },
  "03d575dd1eb6": { commune: "Chelghoum Laïd", wilaya: "Mila Province" },
  "7218ac904f6a": { commune: "Souk-Ahras", wilaya: "Wilaya de Souk Ahras" },
  "0738069dff3d": { commune: "Skikda", wilaya: "Wilaya de Skikda" },
  "70b5f70de0ec": { commune: "El Tarf", wilaya: "Wilaya d'El Tarf" },
  "20b73625d37c": { commune: "El Bayadh", wilaya: "El Bayadh Province" },
  "347350fa7393": { commune: "Sig", wilaya: "Wilaya de Mascara" },
  "6edf601ea457": { commune: "Koléa", wilaya: "Wilaya de Blida" },
  cee141ee4748: { commune: "Tebessa", wilaya: "Tébessa Province" },
  "7b81b225cb49": { commune: "El Khroub", wilaya: "Wilaya de Constantine" },
}

const COMMUNES = Object.keys(COMMUNES_DATA)
  .map((id) => ({ name: COMMUNES_DATA[id as keyof typeof COMMUNES_DATA].commune }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"))

interface SMSData {
  commune: string
  smsCount: number
}

export default function SMSAnalyticsDashboard() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [tableData, setTableData] = useState<SMSData[]>([])
  const [isCommuneDropdownOpen, setIsCommuneDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<"commune" | "smsCount" | "percentage" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const {shopData}=useShop()

  const handleCommuneToggle = (communeName: string) => {
    setSelectedCommunes((prev) =>
      prev.includes(communeName) ? prev.filter((c) => c !== communeName) : [...prev, communeName],
    )
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCommunes([])
      setIsAllSelected(false)
    } else {
      setSelectedCommunes(COMMUNES.map((c) => c.name))
      setIsAllSelected(true)
    }
  }

  const handleSearch = async () => {
    setError("")

    if (selectedCommunes.length === 0) {
      setError("Veuillez sélectionner au moins une commune")
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
        const fn = httpsCallable(functions, "smsTotalsByOffice");

        const res = await fn({
          clientId: shopData.id, // or omit to use auth.uid
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          communes: selectedCommunes,
          dateField: "date",
        });

      const data = res.data
      const transformedData: SMSData[] = Object.values(data.offices || {})
      .map((office: any) => ({
        commune: office.commune,
        smsCount: Number(office.totalSms) || 0,
      }))
      .sort((a, b) => b.smsCount - a.smsCount);
    
    setTableData(transformedData);
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
    setSelectedCommunes([])
    setIsAllSelected(false)
    setTableData([])
    setError(null)
    setSortField(null)
    setSortDirection("asc")
  }

  const handleSort = (field: "commune" | "smsCount" | "percentage") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedTableData = [...tableData].sort((a, b) => {
    if (!sortField) return 0

    let aValue: number | string
    let bValue: number | string

    if (sortField === "commune") {
      aValue = a.commune.toLowerCase()
      bValue = b.commune.toLowerCase()
    } else if (sortField === "smsCount") {
      aValue = a.smsCount
      bValue = b.smsCount
    } else {
      aValue = (a.smsCount / totalSMS) * 100
      bValue = (b.smsCount / totalSMS) * 100
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const renderSortIcon = (field: "commune" | "smsCount" | "percentage") => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  const handleExportToExcel = () => {
    if (tableData.length === 0) return

    const exportData = tableData.map((row) => ({
      Commune: row.commune,
      "Nombre de SMS": row.smsCount,
      Pourcentage: `${((row.smsCount / totalSMS) * 100).toFixed(2)}%`,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport SMS")

    const fileName = `rapport_sms_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  const totalSMS = tableData.reduce((sum, item) => sum + item.smsCount, 0)

  return (
<div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Tableau de Bord SMS</h1>
          <p className="text-muted-foreground">Filtrer et analyser la distribution des SMS par commune</p>
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
                <label className="text-sm font-medium text-foreground">Communes</label>
                <Popover open={isCommuneDropdownOpen} onOpenChange={setIsCommuneDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between font-normal bg-transparent">
                      <span className={cn(!selectedCommunes.length && "text-muted-foreground")}>
                        {isAllSelected
                          ? "Toutes les communes sélectionnées"
                          : selectedCommunes.length > 0
                            ? `${selectedCommunes.length} sélectionnée${selectedCommunes.length > 1 ? "s" : ""}`
                            : "Sélectionner des communes"}
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
                        {COMMUNES.map((commune) => (
                          <div
                            key={commune.name}
                            className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
                          >
                            <Checkbox
                              id={commune.name}
                              checked={selectedCommunes.includes(commune.name)}
                              onCheckedChange={() => handleCommuneToggle(commune.name)}
                            />
                            <label
                              htmlFor={commune.name}
                              className="flex-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {commune.name}
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
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total SMS envoyés</p>
                  <p className="text-2xl font-semibold text-foreground">{totalSMS.toLocaleString("fr-FR")}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Commune</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Nombre de SMS</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Pourcentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr
                        key={row.commune}
                        className={cn(
                          "border-b border-border transition-colors hover:bg-muted/50",
                          index === tableData.length - 1 && "border-b-0",
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{row.commune}</td>
                        <td className="px-4 py-3 text-right text-sm text-foreground">
                          {row.smsCount.toLocaleString("fr-FR")}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                          {((row.smsCount / totalSMS) * 100).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
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
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-foreground">Chargement des données...</h3>
              <p className="text-sm text-muted-foreground">
                Veuillez patienter pendant que nous récupérons les informations SMS
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
