import type { NextRequest } from "next/server";

export type I18nMiddlewareConfig<Locales extends readonly string[]> = {
    locales: Locales;
    defaultLocale: Locales[number];
    urlMappingStrategy: "redirect" | "rewrite" | "rewriteDefault";
    resolveLocaleFromRequest?: (request: NextRequest) => Locales[number] | null;
}