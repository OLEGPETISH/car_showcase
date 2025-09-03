/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-100': '#1c1c1c',       // Пример цвета
        'primary-blue': '#0055ff',     // Пример
        'primary-blue-100': '#cce0ff', // Пример
        'light-white': 'rgba(255,255,255,0.7)', // Пример
        'hero-bg': 'url("/path/to/image.png")',  // Пример фонового изображения
      },
    },
  },
  plugins: [],
}
