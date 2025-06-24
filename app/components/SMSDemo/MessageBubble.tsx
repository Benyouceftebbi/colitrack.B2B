"use client"

interface MessageBubbleProps {
  isVisible: boolean
  message: string
}

const urlRegex = /(https?:\/\/[^\s]+)/g

export default function MessageBubble({ isVisible, message }: MessageBubbleProps) {
  const renderMessageWithLinks = (text: string) => {
    const parts = text.split(urlRegex)
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      }`}
    >
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-[1.2rem] rounded-tl-md px-4 py-3 max-w-[85%] mb-1 shadow-sm border border-gray-300/50 dark:border-gray-600/50">
        <p className="text-gray-900 dark:text-white text-[15px] leading-relaxed">{renderMessageWithLinks(message)}</p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">Delivered</div>
    </div>
  )
}
