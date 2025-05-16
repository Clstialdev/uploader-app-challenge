import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./app/theme";
import Page from "./app/Page";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  );
};

export default App;
