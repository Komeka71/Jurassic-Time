import { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";
import MessageBubble from "./MessageBubble";
import SuggestionChips from "./SuggestionChips";
export default function ChatMessages({
  messages,
  typing,
  suggestions,
  onSuggestionClick,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div
      className="
        h-full
        overflow-y-auto
        p-5
        space-y-5
      "
    >
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          text={msg.text}
        />
      ))}

      {typing && <TypingIndicator />}

      {messages.length === 1 && (
        <SuggestionChips
  suggestions={suggestions}
  onSelect={onSuggestionClick}
/>
      )}

      <div ref={bottomRef} />
    </div>
  );
}