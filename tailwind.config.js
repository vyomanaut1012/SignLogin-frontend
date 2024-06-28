/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm:"350px",
        md: "450px",
        lg:"530px"
      }
    },
    
  },
  plugins: [],
}