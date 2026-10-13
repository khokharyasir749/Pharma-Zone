import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#084236", // Deep Forest Green
          dark: "#052e25",
          mint: "#EAF3EE",
          surface: "#F6F8F6",
          emerald: "#059669",
          accent: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(8, 66, 54, 0.05), 0 2px 6px -1px rgba(8, 66, 54, 0.03)",
        "card-hover": "0 12px 30px -4px rgba(8, 66, 54, 0.12), 0 4px 12px -2px rgba(8, 66, 54, 0.06)",
        badge: "0 2px 8px rgba(16, 185, 129, 0.15)",
        floating: "0 20px 40px -15px rgba(5, 46, 37, 0.25)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
