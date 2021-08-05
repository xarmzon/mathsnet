module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1100px",
      },
    },
    extend: {
      colors: {
        primary: "#234F8C",
        secondary: "#274368",
        ascent: "#FF922B",
        "primary-100": "#E2EEFF",
        "ascent-light": "#FCB777",
        "ascent-dark": "#5A3008",
        "ascent-100": "#FFD9B5",
        "ascent-200": "#FFAE62",
        color1: "#727375",
        color2: "#EDEDED",
        color3: "#D9DFE7",
        color4: "#E6E2E1",
        color5: "#C7C6BE",
      },
      fontFamily: {
        brand: ["nunito", "helvetica", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
