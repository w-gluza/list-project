import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, theme, createTheme } = createStitches({
  theme: {
    fonts: {
      primary: '"DM Sans Variable", "DM Sans", sans-serif',
      secondary: '"Passion One", sans-serif', // replace Champ
    },

    colors: {
      white: "#FFFFFF",
      black: "#000000",

      surface1: "#FAF9F2",
      surface2: "#F5F4ED",
      surface3: "#ECEBE3",
      surface4: "#DFDDD3",
      surface5: "#D4D2C4",

      dark1: "#706D5C",

      accent: "#01323399",
      danger: "#E14B4B", // Made out based on other hex colors
      deepGreen60: "#013233",
    },

    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
    },

    fontWeights: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
    },

    radii: {
      "radius-sm": "4px",
      "radius-md": "8px",
      "radius-lg": "16px",
      "radius-xl": "20px",
      "radius-full": "9999px",
    },
  },
});

export const globalStyles = globalCss({
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "$primary",
    fontWeight: "$regular",
    backgroundColor: "$surface1",
    color: "$dark1",
  },
  "ul, ol": {
    listStyle: "none",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
    display: "inline-block",
  },
  "input, textarea, button, select": {
    background: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
    color: "inherit",
  },
  img: {
    maxWidth: "100%",
    display: "block",
  },
  "button, a": {
    cursor: "pointer",
  },

  "input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button":
    {
      appearance: "none",
      margin: 0,
    },

  "input[type=number]": {
    MozAppearance: "textfield",
  },
});
