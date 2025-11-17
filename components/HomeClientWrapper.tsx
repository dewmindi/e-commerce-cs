"use client";

import { useEffect, useState } from "react";
import ChatBotModal from "@/components/ChatBotModal";
import FrequentlyQuestion from "./FrequentlyQuestion";

export default function HomeClientWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);


  return (
    <>
    <FrequentlyQuestion/>
      <ChatBotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
