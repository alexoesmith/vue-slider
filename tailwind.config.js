/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1.2rem",
    },
    extend: {
      colors: {
        accent: "#00ebc7",
      },
    },
  },

  plugins: [],
};
