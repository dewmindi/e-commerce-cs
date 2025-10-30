
// // components/ChatWidget.tsx

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';

// // Define message types
// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
// }

// const N8N_PROXY_ROUTE = '/api/chat'; // <-- This points to your secure proxy file

// export default function ChatBotModal() {
//     const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(scrollToBottom, [messages, isOpen]);

//     const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage }),
//       });
//       const data = await res.json();

//       setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Button (Icon should be imported/used with Tailwind/CSS) */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="fixed bottom-5 right-5 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-[1000] hover:bg-blue-700"
//       >
//         <i className="fas fa-comment-alt"></i>
//       </button>

//       {/* Chat Widget Container */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-5 w-[350px] h-[450px] bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col z-[999]">
          
//           {/* Header */}
//           <div className="bg-blue-600 text-white p-4 text-lg font-medium rounded-t-xl flex justify-between items-center">
//             CS Graphic Meta Assistant
//             <button onClick={() => setIsOpen(false)} className="text-xl font-bold">&times;</button>
//           </div>

//           {/* Messages */}
//           <div id="chat-messages" className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-2">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`max-w-[80%] p-3 rounded-xl text-sm leading-snug ${
//                   msg.sender === 'user'
//                     ? 'bg-blue-100 self-end ml-auto rounded-br-md'
//                     : 'bg-white border border-gray-200 self-start mr-auto rounded-bl-md'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {isLoading && (
//               <div className="max-w-[80%] p-3 rounded-xl text-sm leading-snug bg-white border border-gray-200 self-start mr-auto rounded-bl-md">
//                 Assistant is typing...
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-3 border-t border-gray-200 flex space-x-2">
//             <input
//               type="text"
//               className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//             />
//             <button
//               onClick={sendMessage}
//               className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
//                 isLoading || !input.trim()
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-green-600 hover:bg-green-700'
//               }`}
//               disabled={isLoading || !input.trim()}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatBotModal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const formatBotMessage = (text: string) => {
    if (!text) return '';
    
    // Replace line breaks with <br/>
    let formatted = text.replace(/\n/g, '<br/>');

    // Convert Markdown-style package bullets to <ul><li>
    formatted = formatted.replace(/\* \*\*(.+?)\(\$([0-9.]+)\):\*\*/g, (_match, p1, p2) => {
      return `<ul><li><strong>${p1} ($${p2}):</strong>`;
    });

    // Close <li> with following newlines or next bullet
    formatted = formatted.replace(/<br\/>\s*\*/g, '</li><li>');

    // Ensure any remaining <ul> are closed
    if (formatted.includes('<ul>') && !formatted.includes('</li>')) {
      formatted += '</li></ul>';
    } else if (formatted.includes('<li>') && !formatted.includes('</ul>')) {
      formatted += '</li></ul>';
    }

    return formatted;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const formattedText = formatBotMessage(data.response);

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: formattedText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now() + 2, sender: 'bot', text: 'Oops! Something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-[#bc8e0d] text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-[1000] hover:bg-[#efcd69fc] p-4  transition-transform hover:scale-110 animate-bounce"
      >
                <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h6m-6 4h10M5 20l2.586-2.586A2 2 0 019 17h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v15z"
          />
        </svg>
        <i className="fas fa-comment-alt"></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[450px] bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col z-[999]">
          <div className="bg-[#bc8e0d] text-white p-4 text-lg font-medium rounded-t-xl flex justify-between items-center">
            CS Graphic Meta Assistant
            <button onClick={() => setIsOpen(false)} className="text-xl font-bold">
              &times;
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-3 rounded-xl text-sm leading-snug ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 self-end ml-auto rounded-br-md'
                    : 'bg-white border border-gray-200 self-start mr-auto rounded-bl-md'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[80%] p-3 rounded-xl text-sm leading-snug bg-white border border-gray-200 self-start mr-auto rounded-bl-md">
                Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 flex space-x-2">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
                isLoading || !input.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
