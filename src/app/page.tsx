"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSubmit = async () => {
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setThinking(true);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    setInput("");
    setThinking(false);
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
                // 处理代码块高亮
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
                // 让链接在新窗口打开
                a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" />
              }}
            >
              {m.content}
            </ReactMarkdown>
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
        <button
          onClick={handleSubmit}
          disabled={thinking}
          className="flex flex-row items-center bg-[#0c7fda] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          发送
          {thinking && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </button>
      </div>
    </main>
  );
}