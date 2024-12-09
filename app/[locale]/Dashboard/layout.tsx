"use client";

import { useAuth } from "@/app/context/AuthContext";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { AppSidebar } from "@/components/ui/navigation/app-sidebar"
import { Separator } from "@/components/ui/separator";
import {usePathname} from "@/i18n/routing";

import React from "react";
import TopHeader from "@/components/ui/navigation/TopHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isAuthenticated} = useAuth();
  const locale = useLocale();

  const pathSegments = usePathname().split('/').filter(Boolean); // Update this line

  if (!isAuthenticated) {
    return redirect({ href: "/Auth/SignIn", locale: locale });
  }
  return ( 
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const href = '/' + pathSegments.slice(0, index + 1).join('/');
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={href}>
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <TopHeader/>
          </div>
        </header>
      <main>

        {children}
      </main>
      </SidebarInset>
      </SidebarProvider>

  );
}
