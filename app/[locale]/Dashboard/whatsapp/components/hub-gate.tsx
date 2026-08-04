"use client"

import type { ReactNode } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useWhatsApp } from "../context/whatsapp-provider"
import { ConnectCard } from "./connect-card"

/**
 * Every hub page needs a live connection. This renders the signup card instead
 * of the page when there isn't one, so each page can assume `account` exists.
 */
export function HubGate({ children }: { children: ReactNode }) {
  const { isConnected, accountLoading } = useWhatsApp()

  if (accountLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    )
  }

  if (!isConnected) return <ConnectCard />

  return <>{children}</>
}
