import React from "react";
import { Box } from "@mui/material";
import UploaderBar from "./components/UploaderBar";
// import SentItemComponent from './components/SentItem';
// import type { IAttachment, ISentItem } from './types';

const App: React.FC = () => {
  // const [items, setItems] = useState<ISentItem[]>([]);

  // TODO: handleSend(text, attachments)

  // TODO: handleDelete(ids: number[])

  // TODO: handleExport(ids: number[])
  // - collect payload [{text, attachments: [{name, previewUrl}]}]
  // - create JSON blob and trigger download

  return (
    <Box>
      Render the page here
      <UploaderBar
        onSend={() => {
          console.log("onSend Triggered");
        }}
      />
      {/* TODO: Bulk actions */}
      {/* TODO: map items to their respective components */}
    </Box>
  );
};

export default App;
