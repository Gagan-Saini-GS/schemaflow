/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Black: "#1e1e1e",
        White: "#F0F3F6",
        Gray: "#E5E4E2",
        DarkGray: "#2E3532",
        Red: "#FF0000",
        DarkBlue: "#022F40",
        Light: "#E8F0FF",
        Blue: "#3083DC",
      },
    },
  },
  plugins: [],
};
