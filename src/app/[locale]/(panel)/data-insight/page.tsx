"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/data-insight/chat-interface";
import {
    CleaningProcess,
    CleaningStep,
} from "@/components/data-insight/cleaning-process";
import { ChartView, ChartData } from "@/components/data-insight/chart-view";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for demonstration
const MOCK_DATA: ChartData[] = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
];

export default function DataInsightPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [steps, setSteps] = useState<CleaningStep[]>([]);
    const [chartData, setChartData] = useState<ChartData[] | null>(null);
    const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");

    const handleSend = async (query: string) => {
        setIsAnalyzing(true);
        setSteps([]);
        setChartData(null);

        // Simulate analysis process
        const newSteps: CleaningStep[] = [
            {
                id: "1",
                message: "Parsing natural language query...",
                status: "running",
            },
        ];
        setSteps([...newSteps]);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        newSteps[0].status = "completed";
        newSteps.push({
            id: "2",
            message: "Fetching raw data from sales_records...",
            status: "running",
        });
        setSteps([...newSteps]);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        newSteps[1].status = "completed";
        newSteps.push({
            id: "3",
            message: "Detecting data anomalies...",
            status: "running",
        });
        setSteps([...newSteps]);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        newSteps[2].status = "completed";
        newSteps[2].detail = "Found 3 missing values in 'region' column. Imputed with mode.";
        newSteps.push({
            id: "4",
            message: "Generating visualization...",
            status: "running",
        });
        setSteps([...newSteps]);

        await new Promise((resolve) => setTimeout(resolve, 800));

        newSteps[3].status = "completed";
        setSteps([...newSteps]);

        // Determine chart type based on query (simple mock logic)
        if (query.toLowerCase().includes("bar")) {
            setChartType("bar");
        } else if (query.toLowerCase().includes("growth") || query.toLowerCase().includes("trend")) {
            setChartType("area");
        } else {
            setChartType("line");
        }

        setChartData(MOCK_DATA);
        setIsAnalyzing(false);
    };

    return (
        <div className="h-[calc(100vh)] flex flex-col md:flex-row bg-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="w-full md:w-[400px] flex flex-col border-r border-white/5 bg-zinc-950/50 backdrop-blur-sm relative z-10">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        Data Insight
                    </h1>
                    <p className="text-zinc-500 text-xs mt-1 font-medium tracking-wide uppercase">
                        AI-Powered Analytics
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    <CleaningProcess steps={steps} />
                </div>

                <div className="p-6 border-t border-white/5 bg-zinc-950/80 backdrop-blur-xl">
                    <ChatInterface onSend={handleSend} isAnalyzing={isAnalyzing} />
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-8 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                <AnimatePresence mode="wait">
                    {chartData ? (
                        <ChartView
                            key="chart"
                            data={chartData}
                            type={chartType}
                            title="Sales Trend Analysis"
                            description="Comprehensive breakdown of monthly performance metrics."
                            className="w-full max-w-4xl relative z-10"
                        />
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="text-center relative z-10"
                        >
                            <div className="w-24 h-24 bg-zinc-900/50 rounded-3xl border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/10 backdrop-blur-xl group">
                                <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl group-hover:scale-110 transition-transform duration-500"></div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                                Ready to Analyze
                            </h3>
                            <p className="text-zinc-400 max-w-md mx-auto text-lg font-light leading-relaxed">
                                Connect your data sources or simply ask questions to generate deep insights instantly.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
