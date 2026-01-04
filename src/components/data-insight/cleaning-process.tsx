"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type StepStatus = "pending" | "running" | "completed" | "error";

export interface CleaningStep {
    id: string;
    message: string;
    status: StepStatus;
    detail?: string;
}

interface CleaningProcessProps {
    steps: CleaningStep[];
    className?: string;
}

export function CleaningProcess({ steps, className }: CleaningProcessProps) {
    if (steps.length === 0) return null;

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                Processing Pipeline
            </div>

            <div className="relative space-y-6 pl-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-violet-500/50 before:to-transparent before:content-['']">
                <AnimatePresence mode="popLayout">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="relative flex items-start gap-4"
                        >
                            {/* Timeline Node */}
                            <div className={cn(
                                "absolute -left-[21px] mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-zinc-950 z-10 transition-colors duration-500",
                                step.status === "completed" ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" :
                                    step.status === "running" ? "border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" :
                                        step.status === "error" ? "border-red-500" :
                                            "border-zinc-700"
                            )}>
                                {step.status === "completed" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                {step.status === "running" && <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />}
                            </div>

                            <div className="flex-1 space-y-2 bg-zinc-900/40 border border-white/5 p-3 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <p
                                        className={cn(
                                            "text-sm font-medium transition-colors",
                                            step.status === "completed" ? "text-emerald-400" :
                                                step.status === "running" ? "text-violet-400" :
                                                    "text-zinc-500"
                                        )}
                                    >
                                        {step.message}
                                    </p>
                                    {step.status === "running" && (
                                        <Loader2 className="w-3 h-3 text-violet-500 animate-spin" />
                                    )}
                                    {step.status === "completed" && (
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    )}
                                </div>

                                {step.detail && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-xs text-zinc-400 font-mono bg-black/30 p-2 rounded border-l-2 border-violet-500/30"
                                    >
                                        {">"} {step.detail}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
