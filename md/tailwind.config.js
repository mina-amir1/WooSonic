// const colors = require('tailwindcss/colors')

module.exports = {
  // mode: "jit",
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      primary: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      slate: {
        200: "#e2e8f0",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      blue: {
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      red: {
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      green: {
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      yellow: {
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
      },
      orange: {
        500: "#f97316",
      },
      purple: {
        500: "#a855f7",
      },
      pink: {
        500: "#ec4899",
      },
      golden: {
        500: "#ec4899",
      },
      "of-white": {
        500: "#FAF9F6",
      },
      olive: {
        500: "#808000",
      },
      navy: {
        500: "#000080",
      },
    },
    extend: {
      fontDisplay: {
        sans: "swap", // Use 'swap', 'block', 'fallback', or 'optional'
      },
    },
    // maxWidth: {
    //   '1/4': '25%',
    //   '1/2': '50%',
    //   '3/4': '75%',
    //   '90': '90%',
    //  },
    //  maxHeight: {
    //   '1/4': '25%',
    //   '1/2': '50%',
    //   '3/4': '75%',
    //   '90': '90%',
    //  },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  future: {
    unstable_tailwind: true,
  },
  daisyui: {
    darkTheme: false,
  },
};
