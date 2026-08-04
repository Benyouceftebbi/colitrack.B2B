"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useToast } from "@/hooks/use-toast"
import { useWhatsApp } from "../context/whatsapp-provider"
import type { TemplateDraft, WhatsAppTemplate } from "../types"

/**
 * Templates are read live from the Graph API on every mount (and on demand).
 * Status and quality are decided by Meta and can change minutes after a send,
 * so a cached copy would routinely be wrong on exactly the field users check.
 */
export function useWhatsAppTemplates() {
  const { clientId, isConnected } = useWhatsApp()
  const { toast } = useToast()

  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mutating, setMutating] = useState(false)
  const reqRef = useRef(0)

  const call = useCallback(
    async (name: string, payload: Record<string, any> = {}) => {
      if (!clientId) throw new Error("No shop selected.")
      const fn = httpsCallable(functions, name)
      const res: any = await fn({ clientId, ...payload })
      if (!res?.data?.success) {
        throw new Error(res?.data?.message || res?.data?.reason || "The request failed.")
      }
      return res.data
    },
    [clientId],
  )

  const fetchTemplates = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      if (!clientId || !isConnected) {
        setTemplates([])
        setLoading(false)
        return
      }

      const tag = ++reqRef.current
      if (!opts.silent) setLoading(true)
      setError(null)

      try {
        const data = await call("whatsappListTemplates", {})
        if (tag !== reqRef.current) return // a newer request already landed

        setTemplates(
          (data.templates || []).map((t: any) => ({
            id: t.id,
            name: t.name,
            language: t.language,
            status: t.status,
            category: t.category,
            rejectedReason: t.rejected_reason && t.rejected_reason !== "NONE" ? t.rejected_reason : undefined,
            quality: t.quality_score?.score
              ? String(t.quality_score.score).toUpperCase()
              : (t.quality ?? "UNKNOWN"),
            components: t.components || [],
            createdAt: t.createdAt ? new Date(t.createdAt) : null,
            updatedAt: t.updatedAt ? new Date(t.updatedAt) : null,
          })),
        )
      } catch (err: any) {
        if (tag !== reqRef.current) return
        console.error("[whatsapp] template fetch failed:", err)
        setError(err.message || "Could not load templates from Meta.")
      } finally {
        if (tag === reqRef.current) setLoading(false)
      }
    },
    [call, clientId, isConnected],
  )

  useEffect(() => {
    void fetchTemplates()
  }, [fetchTemplates])

  const createTemplate = useCallback(
    async (draft: TemplateDraft) => {
      setMutating(true)
      try {
        await call("whatsappCreateTemplate", { template: draft })
        toast({
          title: "Template submitted",
          description: "Meta usually reviews new templates within a few minutes to 24 hours.",
        })
        await fetchTemplates({ silent: true })
        return true
      } catch (err: any) {
        toast({ title: "Could not create template", description: err.message, variant: "destructive" })
        return false
      } finally {
        setMutating(false)
      }
    },
    [call, fetchTemplates, toast],
  )

  /**
   * Meta only allows editing the components of an APPROVED or REJECTED template,
   * and never its name or language. Editing sends it back to PENDING.
   */
  const updateTemplate = useCallback(
    async (templateId: string, draft: Pick<TemplateDraft, "category" | "components">) => {
      setMutating(true)
      try {
        await call("whatsappUpdateTemplate", { templateId, template: draft })
        toast({ title: "Template updated", description: "It goes back to Meta for review." })
        await fetchTemplates({ silent: true })
        return true
      } catch (err: any) {
        toast({ title: "Could not update template", description: err.message, variant: "destructive" })
        return false
      } finally {
        setMutating(false)
      }
    },
    [call, fetchTemplates, toast],
  )

  const deleteTemplate = useCallback(
    async (template: WhatsAppTemplate) => {
      setMutating(true)
      try {
        await call("whatsappDeleteTemplate", { name: template.name, templateId: template.id })
        toast({ title: "Template deleted", description: `"${template.name}" was removed from your WABA.` })
        await fetchTemplates({ silent: true })
        return true
      } catch (err: any) {
        toast({ title: "Could not delete template", description: err.message, variant: "destructive" })
        return false
      } finally {
        setMutating(false)
      }
    },
    [call, fetchTemplates, toast],
  )

  return {
    templates,
    loading,
    error,
    mutating,
    refetch: fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  }
}
