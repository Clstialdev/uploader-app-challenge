import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ff9350",
    },
    background: {
      default: "#efedec",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: "rgba(0, 0, 0, 0.5)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.7)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
