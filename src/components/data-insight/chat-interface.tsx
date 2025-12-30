"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
    onSend: (query: string) => void;
    isAnalyzing: boolean;
    className?: string;
}

export function ChatInterface({ onSend, isAnalyzing, className }: ChatInterfaceProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isAnalyzing) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-xl"
                >
                    <div className="pl-3 text-purple-400">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your data..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 px-2 py-2"
                        disabled={isAnalyzing}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isAnalyzing}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
            <div className="flex gap-2 text-xs text-zinc-500 px-2">
                <span>Try:</span>
                <button
                    onClick={() => setInput("Analyze Q3 sales drop")}
                    className="hover:text-purple-400 transition-colors"
                >
                    &quot;Analyze Q3 sales drop&quot;
                </button>
                <span>•</span>
                <button
                    onClick={() => setInput("Show user growth by region")}
                    className="hover:text-purple-400 transition-colors"
                >
                    &quot;Show user growth by region&quot;
                </button>
            </div>
        </div>
    );
}
