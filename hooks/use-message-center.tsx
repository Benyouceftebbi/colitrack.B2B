"use client"
import * as React from "react"

export function useMessageCenter() {
  const [token, setToken] = React.useState<string | null>(null)
  const [senderId, setSenderId] = React.useState<string | null>(null)
  const [selectedTemplates, setSelectedTemplates] = React.useState<string[]>([])
  const [previewTemplate, setPreviewTemplate] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchTokenAndSenderId = async () => {
      // Simulate API call
      setToken("example_token")
      setSenderId("SENDER123")
    }
    fetchTokenAndSenderId()
  }, [])

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  return {
    token,
    senderId,
    selectedTemplates,
    toggleTemplate,
    previewTemplate,
    setPreviewTemplate
  }
}