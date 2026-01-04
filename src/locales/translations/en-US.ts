import { chat_TL } from "./app/chat";
import { auth_TL } from "./app/auth";

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
        chat: chat_TL.en,
        auth: auth_TL.en
    }
} as const;