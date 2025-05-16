import React from "react";
import { Box, Button, Checkbox } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DownloadIcon from "@mui/icons-material/Download";
// import ImageIcon from "@mui/icons-material/Image";
import type { ISentItem } from "../types";

interface Props {
  item: ISentItem;
  onUpdate: (id: string, changes: Partial<ISentItem>) => void;
  onDelete: () => void;
  onExport: () => void;
}

const SentItem: React.FC<Props> = ({ item, onUpdate, onDelete, onExport }) => {
  const toggleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(item.id, { selected: event.currentTarget.checked });
  };

  return (
    <Box>
      {/* Checkbox for selection */}
      <Checkbox onChange={toggleSelect} />
      {/* Delete and Export icons */}
      <Button onClick={onDelete}>Delete</Button>
      <Button onClick={onExport}>Export</Button>
      {/* Sent text */}
      {item.text}
      {/* Sent attachments if any*/}
      {item.attachments &&
        item.attachments.length > 0 &&
        item.attachments.map((attachment) => (
          <img
            key={attachment.id}
            src={attachment.previewUrl}
            alt={`${attachment.file.name} - preview`}
            height={200}
          />
        ))}
    </Box>
  );
};

export default SentItem;
