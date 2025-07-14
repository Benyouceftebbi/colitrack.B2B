"use client"

import { redirect } from "@/i18n/routing";

export default function App() {


  return (
    redirect({
      href: "/Auth/SignIn",
      locale: "en", // or "fr", etc.
    })
  )
}
