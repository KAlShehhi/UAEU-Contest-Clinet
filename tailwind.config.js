/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
      theme: {
          extend: {
              colors:{
                  primary: {
                    DEFAULT: "#383838",
                    100: "#303131",
                    200: "#494949",
                    300: "#696969"
                  },
                  secondary: "#99C35F",
                  textColor: {
                    DEFAULT: "#CFCFCF"
                  },
                  errorRed: {
                    DEFAULT: "#ED4337"
                  },
                  warningOrange: {
                    DEFAULT: "#FF5733"
                  }
              },
              fontFamily: {
                 lBlack: ["Lato-Black", "sans-serif"], 
                 lBlackItalic: ["Lato-BlackItalic", "sans-serif"], 
                 lBold: ["Lato-Bold", "sans-serif"], 
                 lBoldItalic: ["Lato-BoldItalic", "sans-serif"], 
                 lItalic: ["Lato-Italic", "sans-serif"], 
                 lLight: ["Lato-Light", "sans-serif"], 
                 lLightItalic: ["Lato-LightItalic", "sans-serif"], 
                 lRegular: ["Lato-Regular", "sans-serif"], 
                 lThin: ["Lato-Thin", "sans-serif"], 
                 lThinItalic: ["Lato-ThinItalic", "sans-serif"], 
              },
          },
      },
  plugins: [],
};