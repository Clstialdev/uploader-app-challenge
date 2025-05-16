import React from "react";
import { Box } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DownloadIcon from "@mui/icons-material/Download";
// import ImageIcon from "@mui/icons-material/Image";
import type { IAttachment, ISentItem } from "../types";

interface Props {
  item: IAttachment;
  onUpdate: (id: number, changes: Partial<ISentItem>) => void;
  onDelete: () => void;
  onExport: () => void;
}

const SentItem: React.FC<Props> = ({ item, onUpdate, onDelete, onExport }) => {
  // TODO: toggleSelect

  return (
    <Box>
      {/* <img
        key={attachment.id}
        src={attachment.previewUrl}
        alt={`${attachment.file.name} - preview`}
        height={200}
        onClick={() => removeAttachment(attachment.id)}
      /> */}
      {/* Checkbox for selection */}
      {/* Delete and Export icons */}
      {/* Sent text */}
      {/* Sent attachments if any*/}
    </Box>
  );
};

export default SentItem;
