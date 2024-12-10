"use client"

import { ArrowDown, ArrowUp, ChevronDown, ClipboardCopy, MessageSquare, Users, Activity, Bell, FileText, HelpCircle, Wallet } from 'lucide-react'
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('header')
  const [progress, setProgress] = React.useState(13)
  const [showHelp, setShowHelp] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-8">
      <div className="container mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <div className="flex items-center gap-2">
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
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Total Messages</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">12,543</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={progress} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                  12.3% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">8</h2>
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
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">4.2%</h2>
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

          <Card className="group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5">
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Reached Customers</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">8,432</h2>
                </div>
                <div className="p-1 sm:p-2 md:p-3 bg-primary/10 rounded-full transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary/20">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={84} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                  842 new customers
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-2 sm:gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <CardTitle className="text-base sm:text-lg md:text-xl">Message Analytics</CardTitle>
                <Select defaultValue="7days">
                  <SelectTrigger className="w-full sm:w-[120px] md:w-[140px] text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart visualization will be implemented here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground">Available Tokens</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">1,234,567</h2>
                </div>
                <div className="p-2 sm:p-3 md:p-4 bg-primary/10 rounded-full">
                  <Wallet className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <Progress value={75} className="h-1 sm:h-2" />
              </div>
              <div className="mt-1 sm:mt-2 flex justify-between text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                <span>75% of monthly allocation used</span>
                <span>25% remaining</span>
              </div>
              <div className="mt-3 sm:mt-4 md:mt-6">
                <Button className="w-full text-xs sm:text-sm">Add More Tokens</Button>
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
                  <TableRow>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm font-medium">John Doe</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">TRK123456789</TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[8px] sm:text-[10px] md:text-xs">Delivered</Badge>
                    </TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">{new Date().toLocaleString()}</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm max-w-[100px] sm:max-w-[150px] md:max-w-[200px] truncate">Your package will be delivered today between 2-4 PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm font-medium">Jane Smith</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">TRK987654321</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="text-[8px] sm:text-[10px] md:text-xs">Failed</Badge>
                    </TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">{new Date(Date.now() - 15 * 60000).toLocaleString()}</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm max-w-[100px] sm:max-w-[150px] md:max-w-[200px] truncate">Package delivery attempted. Please confirm your av...</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm font-medium">Mike Johnson</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">TRK456789123</TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[8px] sm:text-[10px] md:text-xs">Delivered</Badge>
                    </TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm">{new Date(Date.now() - 30 * 60000).toLocaleString()}</TableCell>
                    <TableCell className="text-[10px] sm:text-xs md:text-sm max-w-[100px] sm:max-w-[150px] md:max-w-[200px] truncate">Your package has been picked up by our courier</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

