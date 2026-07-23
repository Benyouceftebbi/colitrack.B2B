"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PhonePreview } from "./sms-preview"

// GSM 7-bit character set
const GSM7_CHARS =
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà"

const UNICODE_CHARS = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/i

function analyzeSMS(message: string) {
  if (!message) {
    return {
      encoding: "GSM7",
      segments: 0,
      charactersUsed: 0,
      charactersRemaining: 160,
      smsCount: 0,
    }
  }

  const isUnicode = [...message].some((char) => !GSM7_CHARS.includes(char)) || UNICODE_CHARS.test(message)

  const encoding = isUnicode ? "Unicode" : "GSM7"
  const maxSingleSMS = isUnicode ? 80 : 160
  const maxMultiSMS = isUnicode ? 80 : 160

  const messageLength = message.length

  let segments: number
  let charactersRemaining: number

  if (messageLength === 0) {
    segments = 0
    charactersRemaining = maxSingleSMS
  } else if (messageLength <= maxSingleSMS) {
    segments = 1
    charactersRemaining = maxSingleSMS - messageLength
  } else {
    segments = Math.ceil(messageLength / maxMultiSMS)
    const usedInLastSegment = messageLength % maxMultiSMS
    charactersRemaining = usedInLastSegment === 0 ? 0 : maxMultiSMS - usedInLastSegment
  }

  return {
    encoding,
    segments,
    charactersUsed: messageLength,
    charactersRemaining,
    smsCount: segments,
  }
}

export function SMSAnalyzer() {
  const [message, setMessage] = useState("")

  const analysis = useMemo(() => analyzeSMS(message), [message])

  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Input and Analysis */}
          <div className="space-y-4">
            <div>
              <label htmlFor="sms-message" className="text-sm font-medium mb-2 block">
                Type your SMS message:
              </label>
              <Textarea
                id="sms-message"
                placeholder="Enter your SMS message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Analysis Results */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Encoding:</span>
                <Badge variant={analysis.encoding === "Unicode" ? "destructive" : "default"}>{analysis.encoding}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Characters:</span>
                  <div className="text-muted-foreground">
                    {analysis.charactersUsed} used, {analysis.charactersRemaining} remaining
                  </div>
                </div>

                <div>
                  <span className="font-medium">Segments:</span>
                  <div className="text-muted-foreground">
                    {analysis.segments} segment{analysis.segments !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">SMS Cost:</div>
                <div className="text-lg font-bold">
                  {analysis.smsCount} SMS{analysis.smsCount !== 1 ? " messages" : " message"}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Phone Preview */}
          <div className="flex justify-center">
            <PhonePreview message={message} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
