"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);

  const handleSubmit = async () => {
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    setInput("");
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">AI 研究助手</h1>
      <div className="space-y-4 mb-8 h-[500px] overflow-y-auto border p-4 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-blue-600" : "text-gray-800"}>
            <strong>{m.role === "user" ? "你: " : "Agent: "}</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="问我任何事..."
        />
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">发送</button>
      </div>
    </main>
  );
}