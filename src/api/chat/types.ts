export type StreamingResponse = {
    type: "status" | "answer" | "error" | "end";
    content: string;
    tool?: string;
};
