import React, { useState } from "react";
import { chatWithAi } from "../../services/aiApi";

const SpeakingPractice = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào, tôi là AI hỗ trợ luyện nói tiếng Anh. Bạn hãy bắt đầu bằng việc giới thiệu bản thân nhé!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const newHistory = [...messages, userMessage];

    setMessages(newHistory);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const data = await chatWithAi(newHistory);
      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };
      setMessages([...newHistory, aiMessage]);
    } catch (err) {
      console.error("Lỗi gọi chat AI:", err);
      setError("Không gọi được AI, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <h1>Luyện nói Tiếng Anh với AI</h1>
      <p>
        Chat với AI để luyện nói. AI sẽ sửa lỗi và đưa gợi ý tự nhiên hơn, giống
        cách bạn đang nói chuyện với mình.
      </p>

      <div className="learner-card learner-chat">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                msg.role === "user" ? "user" : "ai"
              }`}
            >
              <div className="chat-bubble-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble ai">
              <div className="chat-bubble-content chat-typing">
                AI đang trả lời...
              </div>
            </div>
          )}
        </div>

        {error && <p className="chat-error">{error}</p>}

        <div className="chat-input-row">
          <textarea
            placeholder="Viết câu tiếng Anh của bạn ở đây..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </div>

        <div className="chat-hint">
          <p>Gợi ý: thử hỏi AI bằng các câu hỏi như</p>
           <ul>
             <li>"Can you correct my sentence and explain my mistakes?"</li>
             <li>"Please give me a more natural way to say this."</li>
             <li>"Ask me follow up questions about my hobby."</li>
           </ul>
         </div>
      </div>
    </div>
  );
};

export default SpeakingPractice;
