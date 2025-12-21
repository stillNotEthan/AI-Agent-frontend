"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { StreamingResponse } from "@/api/chat/types";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [thinking, setThinking] = useState(false);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);
    setInput("");
    setStatus("Connecting...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null");

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;

          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6);

            try {
              const data: StreamingResponse = JSON.parse(jsonStr);

              switch (data.type) {
                case "status":
                  setStatus(data.content);
                  break;
                case "answer":
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg.role === "assistant") {
                      lastMsg.content += data.content;
                    }
                    return newMessages;
                  });
                  break;
                case "error":
                  console.error("Stream error:", data.content);
                  setMessages(prev => [...prev, { role: "assistant", content: `\n\nError: ${data.content}` }]);
                  break;
                case "end":
                  setThinking(false);
                  setStatus("");
                  break;
              }
            } catch (e) {
              console.error("Failed to parse JSON chunk:", line, e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Failed to connect to the server." }]);
    } finally {
      setThinking(false);
      setStatus("");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">AI 研究助手</h1>
      <div className="space-y-4 mb-8 h-[500px] overflow-y-auto border p-4 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-blue-600" : "text-gray-800"}>
            <strong>{m.role === "user" ? "你: " : "Agent: "}</strong>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md my-2"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-200 px-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
                a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" />
              }}
            >
              {m.content}
            </ReactMarkdown>
          </div>
        ))}
        {thinking && status && (
          <div className="text-gray-500 italic text-sm animate-pulse">
            {status}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="问我任何事..."
          onKeyDown={(e) => e.key === 'Enter' && !thinking && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={thinking}
          className="flex flex-row items-center bg-[#0c7fda] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {thinking ? "思考中..." : "发送"}
          {thinking && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </button>
      </div>
    </main>
  );
}