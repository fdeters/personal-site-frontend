/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#dbb792",
          200: "#d1a578",
          300: "#c6945e",
          400: "#ba8344",
          500: "#ae722a",
          600: "#a16207",
        },
        dark: {
          100: "#8b8b8b",
          200: "#717171",
          300: "#575757",
          400: "#3f3f3f",
          500: "#282828",
          600: "#121212",
        },
        darkmixed: {
          100: "#93908c",
          200: "#7a7672",
          300: "#625d58",
          400: "#4b4540",
          500: "#352f29",
          600: "#201a14",
        }
      }
    },
  },
  plugins: [],
}

