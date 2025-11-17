import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#1e90ff",
                base: "#111a22",
                card: "#18222d",
                borderSoft: "#2c3a46",
            }
        },
    },
    plugins: [],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};

export default config;