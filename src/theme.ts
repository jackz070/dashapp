export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  secondary: {
    // light green
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
  },
  primary: {
    // light blue
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
  },
  tertiary: {
    // red
    500: "#ef5301",
  },
  background: {
    light: "#232629",
    main: "#0f0f10",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[400],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[400],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "filled_primary" },
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: ".8rem",
            "&:hover": {
              backgroundColor: tokens.primary[500],
              boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1)",
            },
          },
        },

        {
          props: { variant: "outlined_primary" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid black",
            color: "black",
            fontSize: ".8rem",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1)",
            },
          },
        },
        {
          props: { variant: "outlined_primary", color: "error" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid red",
            color: "red",
            fontSize: ".8rem",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
              boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1)",
            },
          },
        },
      ],
    },
  },
};
