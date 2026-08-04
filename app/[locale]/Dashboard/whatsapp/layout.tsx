"use client"

import type { ReactNode } from "react"
import { WhatsAppProvider } from "./context/whatsapp-provider"

export default function WhatsAppLayout({ children }: { children: ReactNode }) {
  return (
    <WhatsAppProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </div>
    </WhatsAppProvider>
  )
}
