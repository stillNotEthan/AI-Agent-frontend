import { getScopedI18n } from "@/locales/server";
import { headers } from "next/headers";
import { LayoutClient } from "./client";
import "../globals.css";

export interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>
}

const Layout = (props: RootLayoutProps) => {
    return <LayoutClient {...props} />
}

export default Layout;