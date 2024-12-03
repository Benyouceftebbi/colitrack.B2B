import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from '../context/theme-provider';
import { AuthProvider } from '../context/AuthContext';
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Colitrack - Smart SMS and AI Automation for E-commerce',
  description: 'Automate SMS notifications, connect with customers in real-time, and streamline your operations effortlessly.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "fr" | "ar" }>;
}) {
  const locale = await params;
  // Ensure `locale` is valid
  if (!locale || !routing.locales.includes(locale.locale)) {
    notFound(); // Redirect to 404 if invalid
  }

  // Fetch messages asynchronously
  const messages = await getMessages(locale);

  return (
    <html lang={locale.locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale.locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider></ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
