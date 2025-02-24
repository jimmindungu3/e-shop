/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // fontFamily: {
      //   roboto: ["Roboto", "manrope"],
      // },
      colors: {
        brandOrange: "#FF6600",
      },
    },
  },
  plugins: [],
};
