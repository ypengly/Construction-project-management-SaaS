/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          400: "#5b8def",
          500: "#3466d6",
          600: "#254fae",
          700: "#1c3d87",
          900: "#101f42",
        },
        ink: {
          900: "#12161f",
          700: "#2b3242",
          500: "#5b6478",
          300: "#aab1c1",
        },
      },
    },
  },
  plugins: [],
};
