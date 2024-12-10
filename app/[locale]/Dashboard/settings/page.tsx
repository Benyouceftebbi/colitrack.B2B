/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EgDvmTsFyZI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
 "use client"

 import { useState } from "react"
 import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
 import { Button } from "@/components/ui/button"
 import Link from "next/link"
 import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
 import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
 import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
 import { Label } from "@/components/ui/label"
 import { Input } from "@/components/ui/input"
 import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
 import { Separator } from "@/components/ui/separator"
 import { Switch } from "@/components/ui/switch"
 
 export default function Component() {
   const [shippingProviders, setShippingProviders] = useState([
     { provider: "fedex", apiKey: "abc123", apiSecret: "def456", webhookUrl: "https://example.com/webhook" },
   ])
   const [partNameMessage, setPartNameMessage] = useState("")
   const [keywords, setKeywords] = useState("")
   const addShippingProvider = () => {
     setShippingProviders([...shippingProviders, { provider: "", apiKey: "", apiSecret: "", webhookUrl: "" }])
   }
   const updateShippingProvider = (index, field, value) => {
     const updatedProviders = [...shippingProviders]
     updatedProviders[index][field] = value
     setShippingProviders(updatedProviders)
   }
   const removeShippingProvider = (index) => {
     const updatedProviders = [...shippingProviders]
     updatedProviders.splice(index, 1)
     setShippingProviders(updatedProviders)
   }
   const updatePartNameMessage = (value) => {
     setPartNameMessage(value)
   }
   const updateKeywords = (value) => {
     setKeywords(value)
   }
   return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
    
       <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
         <div className="grid gap-8">
           <Card>
             <CardHeader>
               <CardTitle>Profile Settings</CardTitle>
               <CardDescription>Update your personal information.</CardDescription>
             </CardHeader>
             <CardContent>
               <form className="grid gap-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="grid gap-2">
                     <Label htmlFor="name">Name</Label>
                     <Input id="name" defaultValue="John Doe" />
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" defaultValue="john@example.com" />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="grid gap-2">
                     <Label htmlFor="company">Company</Label>
                     <Input id="company" defaultValue="Acme Inc." />
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="phone">Phone</Label>
                     <Input id="phone" defaultValue="+1 (555) 555-5555" />
                   </div>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="language">Language</Label>
                   <Select id="language" defaultValue="en">
                     <SelectTrigger className="w-full">
                       <SelectValue placeholder="Select language" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="en">English</SelectItem>
                       <SelectItem value="es">Español</SelectItem>
                       <SelectItem value="fr">Français</SelectItem>
                       <SelectItem value="de">Deutsch</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="keywords">Keywords</Label>
                   <Input
                     id="keywords"
                     value={keywords}
                     onChange={(e) => updateKeywords(e.target.value)}
                     placeholder="Enter keywords"
                   />
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="facebook-account">Facebook Account</Label>
                   <div className="flex items-center gap-2">
                     <Link
                       href="#"
                       className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80"
                       prefetch={false}
                     >
                       <FacebookIcon className="h-5 w-5" />
                       <span className="sr-only">Connect Facebook</span>
                     </Link>
                     <Link
                       href="#"
                       className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80"
                       prefetch={false}
                     >
                       <InstagramIcon className="h-5 w-5" />
                       <span className="sr-only">Connect Instagram</span>
                     </Link>
                     <Link
                       href="#"
                       className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80"
                       prefetch={false}
                     >
                       <PhoneIcon className="h-5 w-5" />
                       <span className="sr-only">Connect WhatsApp</span>
                     </Link>
                   </div>
                 </div>
               </form>
             </CardContent>
           </Card>
           <Card>
             <CardHeader>
               <CardTitle>Shipping Integration</CardTitle>
               <CardDescription>Configure your shipping provider settings.</CardDescription>
               <div className="ml-auto">
                 <Button
                   variant="outline"
                   size="icon"
                   className="rounded-full bg-primary text-primary-foreground hover:bg-primary/80"
                   onClick={addShippingProvider}
                 >
                   <PlusIcon className="h-5 w-5" />
                   <span className="sr-only">Add Shipping Provider</span>
                 </Button>
               </div>
             </CardHeader>
             <CardContent>
               <form className="grid gap-6">
                 {shippingProviders.map((provider, index) => (
                   <div key={index} className="grid gap-6">
                     <Button
                       variant="ghost"
                       size="icon"
                       className="ml-auto bg-primary text-primary-foreground hover:bg-primary/80"
                       onClick={() => removeShippingProvider(index)}
                     >
                       <TrashIcon className="h-5 w-5" />
                       <span className="sr-only">Remove Shipping Provider</span>
                     </Button>
                     <div className="grid grid-cols-2 gap-6">
                       <div className="grid gap-2">
                         <Label htmlFor={`provider-${index}`}>Shipping Provider</Label>
                         <Select
                           id={`provider-${index}`}
                           defaultValue={provider.provider}
                           onValueChange={(e) => updateShippingProvider(index, "provider", e.target.value)}
                         >
                           <SelectTrigger className="w-full">
                             <SelectValue placeholder="Select provider" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="fedex">FedEx</SelectItem>
                             <SelectItem value="ups">UPS</SelectItem>
                             <SelectItem value="usps">USPS</SelectItem>
                             <SelectItem value="dhl">DHL</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       <div className="grid gap-2">
                         <Label htmlFor={`api-key-${index}`}>API Key</Label>
                         <Input
                           id={`api-key-${index}`}
                           defaultValue={provider.apiKey}
                           onChange={(e) => updateShippingProvider(index, "apiKey", e.target.value)}
                         />
                       </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                       <div className="grid gap-2">
                         <Label htmlFor={`api-secret-${index}`}>API Secret</Label>
                         <Input
                           id={`api-secret-${index}`}
                           defaultValue={provider.apiSecret}
                           onChange={(e) => updateShippingProvider(index, "apiSecret", e.target.value)}
                         />
                       </div>
                       <div className="grid gap-2">
                         <Label htmlFor={`webhook-url-${index}`}>Webhook URL</Label>
                         <Input
                           id={`webhook-url-${index}`}
                           defaultValue={provider.webhookUrl}
                           onChange={(e) => updateShippingProvider(index, "webhookUrl", e.target.value)}
                         />
                       </div>
                     </div>
                     {index < shippingProviders.length - 1 && <Separator className="my-4" />}
                   </div>
                 ))}
               </form>
             </CardContent>
           </Card>
           <Card>
             <CardHeader>
               <CardTitle>Other Settings</CardTitle>
               <CardDescription>Manage your account and preferences.</CardDescription>
             </CardHeader>
             <CardContent>
               <form className="grid gap-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="grid gap-2">
                     <Label htmlFor="notifications">Notifications</Label>
                     <Switch id="notifications" defaultChecked />
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="dark-mode">Dark Mode</Label>
                     <Switch id="dark-mode" />
                   </div>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="password">Change Password</Label>
                   <div className="grid grid-cols-2 gap-6">
                     <Input id="password" type="password" placeholder="New password" />
                     <Input id="confirm-password" type="password" placeholder="Confirm password" />
                   </div>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="delete-account">Delete Account</Label>
                   <Button variant="destructive" className="w-full bg-red-500 text-white hover:bg-red-600">
                     Delete Account
                   </Button>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="part-name-message">Part Name Message</Label>
                   <Input
                     id="part-name-message"
                     value={partNameMessage}
                     onChange={(e) => updatePartNameMessage(e.target.value)}
                     placeholder="Enter the message to get the part name"
                   />
                 </div>
               </form>
             </CardContent>
           </Card>
         </div>
       </main>
     </div>
     </div>
   )
 }
 
 function FacebookIcon(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
     </svg>
   )
 }
 
 
 function InstagramIcon(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
     </svg>
   )
 }
 
 
 function PhoneIcon(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
     </svg>
   )
 }
 
 
 function PlusIcon(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M5 12h14" />
       <path d="M12 5v14" />
     </svg>
   )
 }
 
 
 function TrashIcon(props) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M3 6h18" />
       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
     </svg>
   )
 }