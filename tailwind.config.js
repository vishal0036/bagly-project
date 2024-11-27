/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f4f4f4', 
        'gray':'#888',
        'lightgray':'#e8e8e8',
        'darkgray':'#717171',
        'bs-border-color':'#dee2e6',
      },
    },
  },
  plugins: [
    
  ],
}

