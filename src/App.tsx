import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./app/theme";
// import UploaderBar from './app/components/UploaderBar';
// import SentItemComponent from './app/components/SentItem';
// import type { Attachment, SentItem } from './app/types';
import Page from "./app/Page";

const App: React.FC = () => {
  // const [items, setItems] = useState<ItemType[]>([]);  // store the sent items

  // TODO: handleSend(text, attachments)

  // TODO: handleDelete(ids: any[])

  // TODO: handleExport(ids: any[])
  // - collect payload [{text, attachments: [{name, previewUrl}]}]
  // - create JSON blob and trigger download

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  );
};

export default App;
