"use client"

import { useState } from "react";
import ChatBotModal from "./ChatBotModal";

export default function ChatModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatBotModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
