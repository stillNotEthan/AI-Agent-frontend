export {
    useI18n,
    useScopedI18n,
    useChangeLocale,
    useCurrentLocale,
} from "./client";
import { enUS, zhCN } from "date-fns/locale";

export const LANGUAGES = ["en", "sc"] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LOCALE = {
    en: enUS,
    sc: zhCN,
} as const;

const DEFAULT_LANGUAGE = {
    en: ["en-US", "en-GB"],
    sc: ["zh-CN"],
};

export const LanguageDetector = (lang: string) => {
    const math = Object.entries(DEFAULT_LANGUAGE).find(([_, value]) =>
        value.includes(lang),
    );
    if (!math) return undefined;
    return math[0] as Language;
};
