/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FFA116",
        border: "#E5E7EB",
        muted: "#6B7280",
        secondary: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#111827",
            a: { color: "#FFA116" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              background: "#F3F4F6",
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
