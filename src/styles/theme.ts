import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, gray, black } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    header: PaletteColor;
    border: PaletteColor;
  }
  interface PaletteOptions {
    header?: PaletteColorOptions;
    border?: PaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400],
    },
    header: {
      main: blue[400],
      light: gray[200],
      contrastText: gray[500],
    },
    border: {
      main: gray[300],
    },
  },

  typography: {
    h1: {
      fontSize: "30px",
      lineHeight: "160%",
    },
    h2: {
      fontSize: "24px",
      lineHeight: "160%",
    },
    h3: {
      fontSize: "20px",
      lineHeight: "160%",
    },
    h4: {
      fontSize: "16px",
      lineHeight: "160%",
    },
    h5: {
      fontSize: "14px",
      lineHeight: "140%",
    },
    h6: {
      fontSize: "12px",
      lineHeight: "140%",
    },
    subtitle1: {
      fontSize: "10px",
      lineHeight: "140%",
    },
    subtitle2: {
      fontSize: "18px",
      lineHeight: "160%",
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*": {
            boxSizing: "border-box",
            margin: "0",
            padding: "0",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: blue[400],
        },
      },
    },
  },
});

export { theme };
