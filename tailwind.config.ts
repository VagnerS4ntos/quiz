import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "1rem",
      center: true,
    },
    extend: {
      colors: {
        "custom-green": "rgb(22 163 74)",
        "custom-red": "rgb(255 50 50)",
        "custom-aqua": "#0FF",
      },
      height: {
        custom: "89px",
      },
      minHeight: {
        custom: "89px",
      },
      width: {
        custom: "150px",
      },
    },
  },
  plugins: [],
};
export default config;
