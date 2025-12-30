"use client";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
} from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartViewProps {
    data: ChartData[];
    type: "line" | "bar" | "area";
    title?: string;
    description?: string;
    className?: string;
}

export function ChartView({
    data,
    type,
    title,
    description,
    className,
}: ChartViewProps) {
    if (!data || data.length === 0) return null;

    const renderChart = () => {
        const commonProps = {
            data,
            margin: { top: 20, right: 30, left: 0, bottom: 0 },
        };

        switch (type) {
            case "bar":
                return (
                    <BarChart {...commonProps}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: "#ffffff05" }}
                            contentStyle={{
                                backgroundColor: "#09090b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        <Bar
                            dataKey="value"
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                            name="Sales"
                            animationDuration={1500}
                        />
                    </BarChart>
                );
            case "area":
                return (
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="areaStroke" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#09090b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="url(#areaStroke)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#areaGradient)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                );
            default:
                return (
                    <LineChart {...commonProps}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#09090b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
                            dot={{ fill: "#09090b", stroke: "#8b5cf6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 8, fill: "#fff", stroke: "#ec4899", strokeWidth: 2 }}
                            filter="url(#glow)"
                            animationDuration={2000}
                        />
                    </LineChart>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group",
                className
            )}
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/20 transition-colors duration-700"></div>

            <div className="relative z-10 mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                {description && (
                    <p className="text-sm text-zinc-400 mt-1 font-light">{description}</p>
                )}
            </div>
            <div className="h-[400px] w-full relative z-10">{renderChart()}</div>
        </motion.div>
    );
}
