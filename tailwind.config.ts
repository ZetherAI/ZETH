import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "425px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: "#090709",
        light: "#fcf8fe",
        //"brand-1": "#490161",
        "brand-1": "#086ba5",
        "brand-2": "#ed3e09",
        "brand-3": "#36afd0",
        "brand-4": "#55f1fc"
        //"brand-4": "#a13a9e",
      },
      backgroundImage: {
        //"LYRA-lg": "url('/images/bg-LYRA.jpg')",
        "LYRA-lg": "url('/images/aeth_banner1.jpg')",
        //"LYRA-sm": "url('/images/portrait.png')",
        "LYRA-sm": "url('/images/aeth_banner1.jpg')",
        pfp: "url('/images/aeth_pfp2.jpg')",
        pattern: "url('/images/bg.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
