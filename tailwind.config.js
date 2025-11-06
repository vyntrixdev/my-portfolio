module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}', // Adjust this to your project structure
    './public/index.html', // Include your main HTML file if applicable
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
