// tailwind.config.js
export default {
    theme: {
        extend: {
            colors: {
                // 색상 객체 대신 문자열로 작성
                "primary-50": "#eef2ff",
                "primary-100": "#e0e7ff",
                "primary-200": "#c7d2fe",
                "primary-300": "#a5b4fc",
                "primary-400": "#818cf8",
                "primary-500": "#6366f1",
                "primary-600": "#4f46e5",
                "primary-700": "#4338ca",
                "primary-800": "#3730a3",
                "primary-900": "#312e81",

                "secondary-50": "#f8fafc",
                "secondary-100": "#f1f5f9",
                "secondary-200": "#e2e8f0",
                "secondary-300": "#cbd5e1",
                "secondary-400": "#94a3b8",
                "secondary-500": "#64748b",
                "secondary-600": "#475569",
                "secondary-700": "#334155",
                "secondary-800": "#1e293b",
                "secondary-900": "#0f172a",

                "accent-300": "#fcd34d",
                "accent-400": "#fbbf24",
                "accent-500": "#f59e0b",
                "accent-600": "#d97706",
            }
        }
    },
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    plugins: [],
}