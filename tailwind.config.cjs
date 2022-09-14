/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        galaxy: 'url("/background-galaxy.png")',
        "duo-gradient":
          "linear-gradient(89.86deg, #9572FC 1.08%, #43E7AD 42.94%, #E1D55D 98.57%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(8, 8, 8, 0.9) 64.08%)",
      },
    },
  },
  plugins: [],
};
