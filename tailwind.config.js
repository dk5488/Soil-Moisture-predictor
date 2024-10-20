module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Adjust based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        alert: '#ff0000', 
      },
    },
  },
  plugins: [],
};
