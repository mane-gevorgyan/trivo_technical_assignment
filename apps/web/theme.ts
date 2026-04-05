"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#558dd5",
      light: "#9abfef",
      contrastText: "#fff",
    },
  },
});

export default theme;
