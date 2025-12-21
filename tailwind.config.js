/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
    // ... 其他配置
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'), // [!code ++]
    ],
}