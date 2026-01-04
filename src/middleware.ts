import { deleteCookie } from "cookies-next";
import { type NextRequest, NextResponse } from "next/server";
import { LANGUAGES, LanguageDetector } from "./locales";
import { createI18nMiddleware, noLocalePrefix } from "./middlewares";
import { AUTH_COOKIES_KEY } from "./store/authStore";

const IGNORE_AUTH_PATHS = [
    "/",
    "/login"
]

const I18nMiddleware = createI18nMiddleware({
    locales: LANGUAGES,
    defaultLocale: LANGUAGES[0],
    urlMappingStrategy: "rewrite",
    resolveLocaleFromRequest: (req) => {
        const language = req.headers.get("accept-language")?.split(",")[0];
        if (!language) return LANGUAGES[0];

        const detectedLanguage = LanguageDetector(language);
        return detectedLanguage ?? LANGUAGES[0];
    },
});

function isIgnoredAuthPath(pathname: string): boolean {
    return IGNORE_AUTH_PATHS.includes(pathname);
}

function redirectTo(url: string, request: NextRequest): NextResponse {
    return NextResponse.redirect(new URL(url, request.url));
}

function handleAuthRedirect(
    request: NextRequest,
    token: string | undefined,
): NextResponse | undefined {
    const pathname = request.nextUrl.pathname;

    if (pathname.includes("/api")) return undefined;

    const pathnameWithoutLocale = noLocalePrefix(LANGUAGES, pathname)
        ? pathname
        : `/${pathname.split("/", 3)?.[2]}`;

    // Redirect root path based on auth status
    if (pathnameWithoutLocale === "/") {
        if (token) {
            return redirectTo("/dashboard", request);
        } else {
            return redirectTo("/login", request);
        }
    }

    // Redirect to dashboard if already on login page with valid token
    if (isIgnoredAuthPath(pathnameWithoutLocale) && token) {
        return redirectTo("/dashboard", request);
    }

    // Redirect to login if accessing protected route without token
    if (!isIgnoredAuthPath(pathnameWithoutLocale) && !token) {
        const res = redirectTo("/login", request);
        deleteCookie(AUTH_COOKIES_KEY, { res, req: request });
        return res;
    }

    return undefined;
}

export function middleware(request: NextRequest) {
    console.log("123")
    const pathname = request.nextUrl.pathname;

    const pathnameWithoutLocale = noLocalePrefix(LANGUAGES, pathname)
        ? pathname
        : `/${pathname.split("/", 3)?.[2]}`;
    if (pathnameWithoutLocale.startsWith("/e")) {
        return I18nMiddleware(request);
    }

    const token = request.cookies.get(AUTH_COOKIES_KEY)?.value;
    const authRedirect = handleAuthRedirect(request, token);

    if (authRedirect) {
        return authRedirect;
    }

    return I18nMiddleware(request);
}


export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}

