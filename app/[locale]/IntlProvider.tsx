"use client";

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import type { ReactNode } from "react";
import { onMessageError, getMessageFallback } from "@/i18n/messageErrors";

/**
 * Client wrapper around NextIntlClientProvider so we can attach the shared
 * onError / getMessageFallback handlers. These are functions and cannot be
 * passed directly from the (server) layout to a client component, so they are
 * defined here on the client boundary instead.
 */
export default function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={onMessageError}
      getMessageFallback={getMessageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
}
