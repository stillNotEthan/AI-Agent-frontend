type WORKBENCH = "local" | "dev" | "prod";

export const getAPIURL = () => {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
}