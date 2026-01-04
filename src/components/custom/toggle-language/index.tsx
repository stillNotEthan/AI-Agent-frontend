"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LANGUAGES,
    useChangeLocale,
    useCurrentLocale,
    useScopedI18n,
} from "@/locales";
import { Languages, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const ToggleLanguage = () => {
    const t = useScopedI18n("config.language");
    const changeLanguage = useChangeLocale({
        preserveSearchParams: true,
    });
    const language = useCurrentLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center size-9 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                    <Languages className="size-5" />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-40 bg-slate-900/80 backdrop-blur-xl border-white/10 p-1.5 shadow-2xl"
            >
                <AnimatePresence mode="wait">
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                            key={lang}
                            onClick={() => changeLanguage(lang)}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
                                language === lang
                                    ? "bg-indigo-600/20 text-indigo-400 font-medium"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <span className="text-sm">{t(lang)}</span>
                            {language === lang && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <Check className="size-4" />
                                </motion.div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </AnimatePresence>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
