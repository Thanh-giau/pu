// aesp-frontend/src/services/aiApi.js
import axios from "axios";

// Tao 1 instance axios voi baseURL la gateway
const API = axios.create({
  baseURL: "http://localhost:5050/api/ai",
});

// Phan tich 1 cau (neu ban con dung o noi khac)
export const analyzeText = async (text) => {
  const res = await API.post("/analyze/text", { text });
  return res.data; // { reply }
};

// Chat nhieu luot voi AI
export const chatWithAi = async (messages) => {
  // messages: [{ role: "user" | "assistant", content: "..." }, ...]
  const res = await API.post("/chat", { messages });
  return res.data; // { reply }
};
