"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Settings,
    Users,
    MessageSquare,
    Menu,
    X,
    BarChart3
} from "lucide-react";
import { useState } from "react";
import { useCurrentLocale } from "@/locales";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
    const locale = useCurrentLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { resetAccount } = useAuthStore();
    const router = useRouter();

    const logout = () => {
        resetAccount();
        router.push(`/${locale}/login`);
    }

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: `/${locale}/dashboard`,
            color: "text-sky-500",
        },
        {
            label: "Chat",
            icon: MessageSquare,
            href: `/${locale}/chat`,
            color: "text-violet-500",
        },
        {
            label: "Users",
            icon: Users,
            href: `/${locale}/users`,
            color: "text-pink-700",
        },
        {
            label: "Data Insight",
            icon: BarChart3,
            href: `/${locale}/data-insight`,
            color: "text-emerald-500",
        },
        {
            label: "Settings",
            icon: Settings,
            href: `/${locale}/settings`,
            color: "text-gray-500",
        },
    ];

    return (
        <>
            {/* Mobile Trigger */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Sidebar Container */}
            <div
                className={cn(
                    "relative flex flex-col h-full w-72 fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
                    "bg-zinc-950 border-r border-white/5 text-zinc-400",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
            >
                {/* Ambient Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-violet-900/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-fuchsia-900/10 rounded-full blur-[80px]"></div>
                </div>

                <div className="relative flex flex-col h-full px-4 py-6">
                    {/* Logo */}
                    <Link href={`/${locale}/dashboard`} className="flex items-center gap-3 px-2 mb-10 group">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">AI</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white tracking-tight group-hover:text-white/90 transition-colors">
                                Agent
                            </span>
                            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                                Workspace
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex-1 space-y-1">
                        {routes.map((route) => {
                            const isActive = pathname === route.href;
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden",
                                        isActive
                                            ? "text-white bg-white/5 shadow-inner shadow-white/5"
                                            : "hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-r-full shadow-[0_0_12px_rgba(139,92,246,0.5)]" />
                                    )}

                                    <route.icon
                                        className={cn(
                                            "h-5 w-5 transition-colors duration-200",
                                            isActive ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"
                                        )}
                                    />
                                    <span className="font-medium text-sm z-10">{route.label}</span>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile / Footer (Placeholder) */}
                    <div className="flex flex-row items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-zinc-400 group-hover:border-violet-500/50 transition-colors">
                                EW
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Ethan Wang</span>
                                <span className="text-xs text-zinc-600">Pro Plan</span>
                            </div>
                        </div>
                        <div className="text-md text-zinc-600 cursor-pointer hover:text-zinc-400 transition-colors" onClick={logout}>
                            log out
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
