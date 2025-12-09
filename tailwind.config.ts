import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Spy Theme Colors
                neon: {
                    green: "#00ff00",
                    red: "#ff0000",
                    blue: "#00ffff",
                    purple: "#ff00ff",
                },
                dark: {
                    900: "#000000",
                    800: "#0a0a0a",
                    700: "#111111",
                    600: "#1a1a1a",
                    500: "#222222",
                },
                matrix: {
                    green: "#0f0",
                    "green-dim": "#0a0",
                },
            },
            fontFamily: {
                mono: ["var(--font-geist-mono)", "Courier New", "monospace"],
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
            },
            animation: {
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "scan-line": "scan-line 8s linear infinite",
                "flicker": "flicker 0.15s infinite",
                "slide-in": "slide-in 0.3s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 5px rgba(0, 255, 0, 0.5), 0 0 10px rgba(0, 255, 0, 0.3)"
                    },
                    "50%": {
                        boxShadow: "0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.5)"
                    },
                },
                "scan-line": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
                "flicker": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
                "slide-in": {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
