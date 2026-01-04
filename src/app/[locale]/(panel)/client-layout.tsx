"use client";

import { Sidebar } from "@/components/custom/sidebar/sidebar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-sidebar">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full">
                {children}
            </main>
            {/* Mobile Sidebar is handled within the Sidebar component itself, but we need to ensure it renders */}
            <div className="md:hidden">
                <Sidebar />
            </div>
        </div>
    )
};

export default ClientLayout;