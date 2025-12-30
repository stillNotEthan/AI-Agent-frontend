"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useScopedI18n } from "@/locales";
import { StreamingResponse } from "@/api/chat/types";
import { cn } from "@/lib/utils";
import { Send, Bot, User } from "lucide-react";

export default function Client() {
    const t = useScopedI18n("pages.chat");
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
        <div className="h-[calc(100vh)] w-full bg-black relative overflow-hidden flex flex-col">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full p-4 md:p-8">
                <div className="flex-none mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
                    <p className="text-zinc-400 text-sm">Powered by advanced AI models</p>
                </div>

                <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 opacity-50">
                            <Bot className="w-16 h-16" />
                            <p>Start a conversation...</p>
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <div key={i} className={cn("flex gap-4", m.role === "user" ? "justify-end" : "justify-start")}>
                            {m.role !== "user" && (
                                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-none border border-white/10">
                                    <Bot className="w-5 h-5 text-zinc-400" />
                                </div>
                            )}
                            <div className={cn(
                                "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg",
                                m.role === "user"
                                    ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-sm"
                                    : "bg-zinc-900/80 border border-white/10 text-zinc-200 backdrop-blur-sm rounded-tl-sm"
                            )}>
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
                                                    className="rounded-lg my-2 border border-white/10 !bg-zinc-950"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={cn("px-1.5 py-0.5 rounded font-mono text-xs", m.role === "user" ? "bg-white/20" : "bg-zinc-800 text-zinc-300")} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:decoration-white/100 transition-all" />
                                    }}
                                >
                                    {m.content}
                                </ReactMarkdown>
                            </div>
                            {m.role === "user" && (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center flex-none shadow-lg shadow-violet-500/20">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    {thinking && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-none border border-white/10">
                                <Bot className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="bg-zinc-900/80 border border-white/10 text-zinc-400 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm italic">{status || t("thinking")}...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-none relative">
                    <div className="relative flex items-center">
                        <input
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-lg backdrop-blur-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("placeholder")}
                            onKeyDown={(e) => e.key === 'Enter' && !thinking && handleSubmit()}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={thinking || !input.trim()}
                            className="absolute right-2 p-2 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
                        >
                            {thinking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}