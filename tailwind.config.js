/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        jajanWarning: "rgb(var(--color-jajanWarning) / <alpha-value>)",
        jajanDanger: "rgb(var(--color-jajanDanger) / <alpha-value>)",
        jajanDanger2: "rgb(var(--color-jajanDanger2) / <alpha-value>)",
        jajanDark: "rgb(var(--color-jajanDark) / <alpha-value>)",
        jajanDark2: "rgb(var(--color-jajanDark2) / <alpha-value>)",
      },
    },
  },
  plugins: [nextui()],
};
