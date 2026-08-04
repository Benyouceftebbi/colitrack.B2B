"use client"

import { ExternalLink, FileText, ImageIcon, Phone, Reply, Video } from "lucide-react"
import type { TemplateComponent } from "../../types"

const find = (components: TemplateComponent[], type: string) => components.find((c) => c.type === type)

/** Replaces {{1}}, {{2}}… with the example values, or a visible placeholder. */
export function fillVariables(text: string, examples?: string[]) {
  return text.replace(/\{\{(\d+)\}\}/g, (_match, index) => {
    const value = examples?.[Number(index) - 1]
    return value ? value : `[variable ${index}]`
  })
}

const HEADER_ICON = {
  IMAGE: ImageIcon,
  VIDEO: Video,
  DOCUMENT: FileText,
  LOCATION: FileText,
}

/** WhatsApp-style bubble so the user sees the template the way a customer will. */
export function TemplatePreview({ components }: { components: TemplateComponent[] }) {
  const header = find(components, "HEADER")
  const body = find(components, "BODY")
  const footer = find(components, "FOOTER")
  const buttons = find(components, "BUTTONS")?.buttons ?? []

  const MediaIcon = header?.format && header.format !== "TEXT" ? HEADER_ICON[header.format] : null

  return (
    <div className="rounded-xl bg-[#e5ddd5] p-4 dark:bg-[#0b141a]">
      <div className="mx-auto max-w-[320px]">
        <div className="relative rounded-lg rounded-tl-none bg-white px-2.5 py-2 shadow-sm dark:bg-[#202c33]">
          {/* tail */}
          <span className="absolute -left-1.5 top-0 h-3 w-3 bg-white [clip-path:polygon(100%_0,0_0,100%_100%)] dark:bg-[#202c33]" />

          {MediaIcon && (
            <div className="mb-2 flex h-28 items-center justify-center rounded-md bg-black/5 dark:bg-white/5">
              <MediaIcon className="h-7 w-7 text-muted-foreground" />
            </div>
          )}

          {header?.format === "TEXT" && header.text && (
            <p className="mb-1 text-sm font-bold text-[#111b21] dark:text-[#e9edef]">
              {fillVariables(header.text, header.example?.header_text)}
            </p>
          )}

          {body?.text ? (
            <p className="whitespace-pre-wrap break-words text-sm leading-snug text-[#111b21] dark:text-[#e9edef]">
              {fillVariables(body.text, body.example?.body_text?.[0])}
            </p>
          ) : (
            <p className="text-sm italic text-muted-foreground">Your message body appears here.</p>
          )}

          {footer?.text && (
            <p className="mt-1.5 text-[11px] text-[#667781] dark:text-[#8696a0]">{footer.text}</p>
          )}

          <div className="mt-1 flex justify-end">
            <span className="text-[10px] text-[#667781] dark:text-[#8696a0]">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        {buttons.length > 0 && (
          <div className="mt-1 space-y-1">
            {buttons.map((btn, i) => (
              <div
                key={`${btn.text}-${i}`}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-sm font-medium text-[#00a5f4] shadow-sm dark:bg-[#202c33]"
              >
                {btn.type === "URL" && <ExternalLink className="h-3.5 w-3.5" />}
                {btn.type === "PHONE_NUMBER" && <Phone className="h-3.5 w-3.5" />}
                {btn.type === "QUICK_REPLY" && <Reply className="h-3.5 w-3.5" />}
                {btn.text || "Button"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
