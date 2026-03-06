// src/pages/learner/SpeakingPractice.jsx
import React, { useState, useRef, useEffect } from "react";
import { chatWithAi } from "../../services/aiApi";
import { Mic, Send, Bot, User, Sparkles, Lightbulb } from "lucide-react";
import "./styles/learner-speaking.css";

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
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      setMessages([...newHistory, { role: "assistant", content: data.reply }]);
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

  const hints = [
    "Can you correct my sentence and explain my mistakes?",
    "Please give me a more natural way to say this.",
    "Ask me follow up questions about my hobby.",
  ];

  return (
    <div className="sp-page">
      {/* Header */}
      <div className="sp-header">
        <Mic size={28} style={{ color: "#818cf8" }} />
        <div>
          <h1 className="sp-title">Luyện nói Tiếng Anh với AI</h1>
          <p className="sp-subtitle">
            Chat với AI để luyện nói — AI sẽ sửa lỗi và đưa gợi ý tự nhiên hơn.
          </p>
        </div>
      </div>

      {/* Chat Card */}
      <div className="sp-chat-card">
        <div className="sp-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`sp-bubble ${msg.role === "user" ? "user" : "ai"}`}>
              <div className="sp-avatar">
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="sp-bubble-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="sp-bubble ai">
              <div className="sp-avatar"><Bot size={16} /></div>
              <div className="sp-bubble-content sp-typing">
                <span className="sp-dot" /><span className="sp-dot" /><span className="sp-dot" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {error && <div className="sp-error">{error}</div>}

        <div className="sp-input-row">
          <textarea
            placeholder="Viết câu tiếng Anh của bạn ở đây..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="sp-send-btn">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Hints */}
      <div className="sp-hints-card">
        <div className="sp-hints-title">
          <Lightbulb size={16} style={{ color: "#fbbf24" }} /> Gợi ý thử hỏi AI
        </div>
        <div className="sp-hints-row">
          {hints.map((h, i) => (
            <button key={i} className="sp-hint" onClick={() => setInput(h)}>
              <Sparkles size={12} /> {h}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
};

export default SpeakingPractice;
