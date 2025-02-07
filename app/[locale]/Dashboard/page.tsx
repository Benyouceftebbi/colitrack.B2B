"use client"

import { ArrowDown, ArrowUp,  MessageSquare, HelpCircle, TrendingUp, Star } from 'lucide-react'
import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslations } from 'next-intl';
import Algeria from "@react-map/algeria";
import { useTheme } from 'next-themes'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useShop } from '@/app/context/ShopContext'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import axios from 'axios';

type AlgeriaDataItem = {
  name: string
  value: number
}



const columnHelper = createColumnHelper<AlgeriaDataItem>()

const columns = [
  columnHelper.accessor('name', {
    header: 'State',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('value', {
    header: 'Total SMS',
    cell: info => info.getValue(),
  }),
]


export default function Dashboard() {
  const t = useTranslations('header')
  const [progress, setProgress] = React.useState(13)
  const [showHelp, setShowHelp] = React.useState(false)
  const { theme } = useTheme()
  const {shopData}=useShop()
  const chartData = [
    { month: "January", totalSmsOfOneTapLink: shopData.analytics?.January?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.January?.totalSmsSentInCampaign || 0 },
    { month: "February", totalSmsOfOneTapLink: shopData.analytics?.February?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.February?.totalSmsSentInCampaign || 0 },
    { month: "March", totalSmsOfOneTapLink: shopData.analytics?.March?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.March?.totalSmsSentInCampaign || 0 },
    { month: "April", totalSmsOfOneTapLink: shopData.analytics?.April?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.April?.totalSmsSentInCampaign || 0 },
    { month: "May", totalSmsOfOneTapLink: shopData.analytics?.May?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.May?.totalSmsSentInCampaign || 0 },
    { month: "June", totalSmsOfOneTapLink: shopData.analytics?.June?.totalSmsOfOneTapLink || 0, totalSmsSentInCampaign: shopData.analytics?.June?.totalSmsSentInCampaign || 0 },
  ];
  const chartConfig = {
    desktop: {
      label: "totalSmsOfOneTapLink",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "totalSmsSentInCampaign",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  const algeriaData: AlgeriaDataItem[] = React.useMemo(() => [
    { name: 'Algiers', value: shopData.smsByState?.lagos?.totalNumberOfSms || 0 }, // Added totalNumberOfSms
    { name: 'Oran', value: shopData.smsByState?.abuja?.totalNumberOfSms || 0 }, // Added totalNumberOfSms
    { name: 'Constantine', value:  shopData.smsByState?.portHarcourt?.totalNumberOfSms || 0 }, // Added totalNumberOfSms
  ], [shopData]) // Memoize based on shopData
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  const table = useReactTable({
    data: algeriaData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })
  const totalSmsSent = React.useMemo(() => {
    return Object.keys(shopData.analytics || {}).reduce((acc, month) => {
      return acc + (shopData.analytics[month]?.totalSmsSent || 0);
    }, 0);
  }, []);


  const currentMonth = React.useMemo(() => {
    return new Date().toLocaleString('default', { month: 'long' });
  }, []);

  const lastMonth = React.useMemo(() => {
    return new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' });
  }, []);

  const currentMonthSms = React.useMemo(() => {
    return shopData.analytics?.[currentMonth]?.totalSmsSent || 0;
  }, []);

  const lastMonthSms = React.useMemo(() => {
    return shopData.analytics?.[lastMonth]?.totalSmsSent || 0;
  }, []);

  const percentageChange = React.useMemo(() => {
    return lastMonthSms > 0 
      ? ((currentMonthSms - lastMonthSms) / lastMonthSms) * 100 
      : 0;
  }, []);

  const percentageText = React.useMemo(() => {
    return percentageChange > 0 
      ? `${percentageChange.toFixed(1)}% from last month` 
      : `${Math.abs(percentageChange).toFixed(1)}% decrease from last month`;
  }, []);

  const isChartDataEmpty = chartData.length === 0;
  const isTableDataEmpty = table.getRowModel().rows.length === 0;
  


async function sendSMS(sms, phoneNumber, senderId, smsToken) {
  try {
    const response = await axios.get("/api/send-sms", {
      params: {
        sms,
        phoneNumber,
        senderId,
        smsToken,
      },
    });
    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
  }
}

const fetchTrackingDatas = async () => {

    const trackingRef = collection(db, "/Shops/sabyange/Tracking");
    const q = query(trackingRef, where("lastStatus", "in", ["delivery-failed", "istribution-center","en-route-to-region","ready-for-pickup"])); // Query for specific statuses

    try {
      const querySnapshot = await getDocs(q);
      const trackingData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      trackingData.map(async (track) => {
        const sms = `Cher client, votre colis est en route ! Suivez-le ici :  https://colitrack-v1.vercel.app/fr/t?tr=${track.id}. Merci !`;
        await sendSMS(sms, track.data.contact_phone, "SabyAnge", "0379004fa017baa6016e3f62f388b832");
      });
    } catch (error) {
      console.error("Error fetching tracking data: ", error);
    }
  };
  const fetchTrackingData = async () => {
    const currentUserId = "XW4WLUuX8oXMAfQzyrZ69wnVYMk2"; // Replace with the actual current user ID
    const grifashopUserId = "grifashop"; // User ID to duplicate from

    // Fetch SMS and tracking data from grifashop
    const smsRef = collection(db, `/Shops/${grifashopUserId}/SMS`);
    const trackingRef = collection(db, `/Shops/${grifashopUserId}/Tracking`);

    try {
        const smsSnapshot = await getDocs(smsRef);
        const trackingSnapshot = await getDocs(trackingRef);

        // Duplicate SMS data
        const smsPromises = smsSnapshot.docs.map(docSnap => { 
          const docRef = doc(db, `Shops/${currentUserId}/SMS`, docSnap.id);
          return setDoc(docRef, docSnap.data());
      });
      


        // Wait for all promises to resolve
        await Promise.all([...smsPromises]);

        console.log("SMS and tracking data duplicated successfully.");
    } catch (error) {
        console.error("Error fetching or duplicating tracking data: ", error);
    }
};
const copyECTrackingData = async () => {
  const currentUserId = "XW4WLUuX8oXMAfQzyrZ69wnVYMk2"; // Replace with the actual current user ID
  const grifashopUserId = "grifashop"; // User ID to duplicate from
  // Reference to the Tracking subcollection of grifashop
  const trackingRef = collection(db, `/Shops/${grifashopUserId}/Tracking`);

  try {
      const trackingSnapshot = await getDocs(trackingRef);

      // Filter documents that start with "EC" and copy them to the current user's Tracking subcollection
      const copyPromises = trackingSnapshot.docs
          .filter(doc => doc.id.startsWith("EC")) // Filter documents starting with "EC"
          .map(async doca => {
              const data = doca.data();
              const lastStatus = data.shippmentTrack?.length > 0 ? data.shippmentTrack[data.shippmentTrack.length - 1].status : null; // Get last status

              // Add lastStatus to the document data
              const updatedData = {
                  ...data,
                  lastStatus, // Add lastStatus field
              };

              return setDoc(doc(db, `/Shops/${currentUserId}/Tracking`, doca.id), updatedData);
          });

      // Wait for all copy operations to resolve
      await Promise.all(copyPromises);

      console.log("Documents starting with 'EC' copied successfully with lastStatus.");
  } catch (error) {
      console.error("Error copying EC tracking data: ", error);
  }
};
  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-8">
      <div className="container mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto" onClick={copyECTrackingData}>
            Fetch Tracking Data
          </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">Export Data</Button>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Help"
              onClick={() => setShowHelp(!showHelp)}
            >
              <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>



        <div className="grid gap-2 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
        <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Token Left</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{shopData.tokens}</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={84} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  
                {Math.floor(shopData.tokens/15)}-{Math.floor(shopData.tokens/10)} sms to be sent left
                </span>
              </div>
            </CardContent>
          </Card>
        <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Total Messages</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{totalSmsSent}</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={progress} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
    <span className={`flex items-center ${percentageChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {percentageChange > 0 ? (
            <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
        ) : (
            <ArrowDown className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
        )}
        {percentageText}
    </span>
</div>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Total SMS Sent Today</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{shopData?.smsSentToday|| 0}</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={100} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                  2 new this week
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Return Rate</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{shopData?.returnRate}%</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={42} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                  2.1% from last week
                </span>
              </div>
            </CardContent>
          </Card>


        </div>

        <div className="grid gap-2 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-6">
                <CardTitle className="text-base sm:text-lg md:text-xl">Message Analytics</CardTitle>
              </div>
        <div className="leading-none text-muted-foreground">
          Showing total sms for the last 6 months
        </div>

            </CardHeader>
            <CardContent>
              {!isChartDataEmpty ? (
                <div className="text-center text-gray-500">Not enough data</div>
              ) : (
                <ChartContainer config={chartConfig} className="max-h-[200px] w-full mt-10">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
          <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Algeria Interactive Map</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
          <Algeria
              size={300}
              type="select-single"
              mapColor={theme === "dark" ? "#374151" :undefined}
              hoverColor={theme === "dark" ? "#6B7280" : "#9CA3AF"}
              selectColor={theme === "dark" ? "#9CA3AF" : "#4B5563"}
              strokeColor={theme === "dark" ? "#D1D5DB" : "#1F2937"}
              strokeWidth={1}
              hints={true}
              hintTextColor={theme === "dark" ? "#000000" : "#FFFFFF"}
              hintBackgroundColor={theme === "dark" ? "#D1D5DB" : "#1F2937"}
              hintBorderRadius={3}
/>
          </div>
          <div className="flex-1">
            {!isTableDataEmpty ? (
              <div className="text-center text-gray-500">Not enough data</div>
            ) : (
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id} className="dark:border-gray-700">
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id} className="dark:text-gray-300">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow 
                      key={row.id} 
                      className={"dark:border-gray-700"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="dark:text-gray-300">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
        </div>

        <Card>
          <CardHeader className="p-2 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <CardTitle className="text-base sm:text-lg md:text-xl">Recent Messages</CardTitle>
              <Button variant="link" asChild className="p-0 h-auto text-xs sm:text-sm">
                <Link href="#">View all</Link>
              </Button>
            </div>
            <CardDescription className="text-[10px] sm:text-xs md:text-sm">Track your latest message delivery status</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] sm:text-xs md:text-sm">CUSTOMER</TableHead>
                    <TableHead className="text-[10px] sm:text-xs md:text-sm">TRACKING #</TableHead>
                    <TableHead className="text-[10px] sm:text-xs md:text-sm">STATUS</TableHead>
                    <TableHead className="text-[10px] sm:text-xs md:text-sm">TIME</TableHead>
                    <TableHead className="text-[10px] sm:text-xs md:text-sm">MESSAGE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shopData.smsTracking?.map((tracking) => (
                    <TableRow key={tracking.trackingNumber}>
                      <TableCell className="text-[10px] sm:text-xs md:text-sm font-medium">{tracking.customerName}</TableCell>
                      <TableCell className="text-[10px] sm:text-xs md:text-sm">{tracking.trackingNumber}</TableCell>
                      <TableCell>
                        <Badge variant={tracking.status === 'Delivered' ? 'success' : 'destructive'} className="text-[8px] sm:text-[10px] md:text-xs">{tracking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-[10px] sm:text-xs md:text-sm">{new Date(tracking.time).toLocaleString()}</TableCell>
                      <TableCell className="text-[10px] sm:text-xs md:text-sm max-w-[100px] sm:max-w-[150px] md:max-w-[200px] truncate">{tracking.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

