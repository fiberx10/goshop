module.exports = {
  content: ["./src/**/*.{html,jsx,js,css}"],
  theme: {
    extend: {
      animation: {
        movecolor: "movecolor 5s ease-in infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
      },
      keyframes: {
        movecolor: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg) translateX(50px)",
          },
          "50%": {
            transform: "rotate(3deg) translateX(0px)",
          },
        },
      },
    },
    fontFamily: {
      bungee: ["Bungee", "cursive"],
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
};
