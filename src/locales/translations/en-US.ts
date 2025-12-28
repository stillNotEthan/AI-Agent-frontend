import { chat_TL } from "./app/chat";

export default {
    config: {
        language: {
            label: "Language",
            en: "English",
            zh: "中文",
            sc: "简体中文"
        }
    },
    pages: {
        chat: chat_TL.en
    }
} as const;