import ClientLayout from "./client-layout";

export const metadata = {
    title: "Chat",
    description: "Chat with AI",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ClientLayout>{children}</ClientLayout>;
}

