/** @type {import("tailwindcss").Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": { "max": "576px" },
        "sm": "576px",
        "md": "768px",
        "lg": "992px",
        "xl": "1200px",
        "2xl": "1400px",
      },
      container: {
        "center": true,
        "padding": "0.5rem",
      },
      fontFamily: {
        "sans": ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
});