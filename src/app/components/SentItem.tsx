import React from "react";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { DeleteOutline, DownloadOutlined } from "@mui/icons-material";
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
    <Box
      sx={{
        display: "inline-block",
        position: "relative",
        p: 2,
        borderRadius: 2,
        backgroundColor: "white",
        border: item.selected
          ? "2px solid rgba(0,0,200,0.2)"
          : "1px solid rgba(0,0,0,0.1)",
        width: "100%",
      }}
    >
      <Checkbox
        checked={item.selected || false}
        onChange={toggleSelect}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 36,
          opacity: item.selected ? 1 : 0.5,
          height: 36,
          padding: 0,
          "& .MuiSvgIcon-root": { fontSize: 32 },
          bgcolor: "background.paper",
          zIndex: 10,
        }}
      />

      {/* Attachments */}
      {item.attachments && item.attachments.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "nowrap",
            mb: 2,
            borderRadius: 1,
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,0.2) transparent",
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 3,
            },
          }}
        >
          {item.attachments.map((attachment) => (
            <Box
              key={attachment.id}
              component="img"
              src={attachment.previewUrl}
              alt={`${attachment.file.name} preview`}
              sx={{
                height: 100,
                borderRadius: 2,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      )}

      {/* Text */}
      <Box sx={{ p: 1, mb: 2, maxWidth: "100%" }}>
        <Typography variant="body1" whiteSpace="pre-wrap">
          {item.text}
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          aria-label="Delete"
          onClick={onDelete}
          size="large"
          color="primary"
          sx={{
            opacity: 0.3,
            transition: "opacity 0.3s, color 0.3s",
            "&:hover": {
              opacity: 1,
              color: "error.main",
            },
          }}
        >
          <DeleteOutline />
        </IconButton>
        <IconButton
          aria-label="Export"
          onClick={onExport}
          size="large"
          color="primary"
          sx={{
            opacity: 0.3,
            transition: "opacity 0.3s",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <DownloadOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SentItem;
