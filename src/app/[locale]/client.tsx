import { I18nProviderClient } from "@/locales/client";
import type { RootLayoutProps } from "./layout";
import { ToggleLanguage } from "@/component/custom/toggle-language";

export const LayoutClient = async ({
    children,
    params
}: RootLayoutProps) => {
    const { locale } = await params;
    return (
        <I18nProviderClient locale={locale}>
            <div className="fixed top-0 right-0 z-50">
                <ToggleLanguage />
            </div>
            {children}
        </I18nProviderClient>
    )
}