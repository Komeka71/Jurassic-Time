// components/chat/ChatInput.jsx

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatInput({
  onSend,
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const value = text.trim();

    if (!value) return;

    onSend?.(value);

    setText("");
  };

  return (
    <div
      className="
        border-t
        border-emerald-500/20

        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3

          rounded-2xl

          bg-[#12191a]

          border
          border-emerald-500/20

          px-4
          py-3

          focus-within:border-emerald-400

          transition
        "
      >
        <input
          type="text"
          value={text}
          placeholder="Ask Paleo anything..."
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="
            flex-1

            bg-transparent
pb-5
            outline-none

            text-white

            placeholder:text-gray-500
          "
        />

        <button
          onClick={handleSend}
          className="
            w-10
            h-10

            rounded-full

            bg-emerald-500

            text-black

            flex
            items-center
            justify-center

            hover:scale-105

            transition
          "
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}