import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, theme, createTheme } = createStitches({
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      overlay: "#00000066",

      surface1: "#FAF9F2",
      surface2: "#F5F4ED",
      surface3: "#ECEBE3",
      surface4: "#DFDDD3",
      surface5: "#D4D2C4",

      dark1: "#706D5C",
      dark2: "#8C8873",

      accent: "#01323399",
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
    fontFamily: "system-ui, sans-serif",
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
