// components/chat/MessageBubble.jsx

import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({
  role,
  text,
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div
          className="
            w-9
            h-9
            rounded-full
            bg-emerald-500/10
            border
            border-emerald-500/20
            flex
            items-center
            justify-center
            shrink-0
            mt-1
          "
        >
          <Sparkles
            size={16}
            className="text-emerald-400"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`
          ${
            isUser
              ? "max-w-[72%] bg-emerald-500 text-black rounded-br-md"
              : "max-w-[78%] bg-[#13191B] border border-white/5 text-gray-100 rounded-bl-md"
          }

          px-4
          py-3
          rounded-2xl
          shadow-sm
        `}
      >
       <ReactMarkdown
  components={{
    p: ({ children }) => (
      <p className="mb-4 last:mb-0">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-emerald-300">
        {children}
      </em>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-2">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-2">
        {children}
      </ol>
    ),

    li: ({ children }) => <li>{children}</li>,
  }}
>
  {text || ""}
</ReactMarkdown>
      </div>
    </div>
  );
}