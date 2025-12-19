import { useState } from "react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    // Giả lập phản hồi
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Cảm ơn bạn! Tôi đang xử lý yêu cầu..." },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white shadow-xl w-80 h-96 rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">AI Chatbot</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t flex p-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-600 text-white px-4 ml-2 rounded-lg hover:bg-blue-700"
              onClick={sendMessage}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
}
