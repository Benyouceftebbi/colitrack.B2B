"use client";

import { useAuth } from "@/app/context/AuthContext";

import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isAuthenticated} = useAuth();
  const locale=useLocale()

  
  if (!isAuthenticated) return redirect({href: "/Auth/SignIn",locale:locale});
  return ( 
    

      <div>

        {children}
      </div>

  );
}
