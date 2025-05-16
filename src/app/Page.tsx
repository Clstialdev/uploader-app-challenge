import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import UploaderBar from "./components/UploaderBar";
import SentItem from "./components/SentItem";
import type { IAttachment, ISentItem } from "./types";
import { nanoid } from "nanoid";
import { DownloadOutlined, DeleteOutlineRounded } from "@mui/icons-material";

const App: React.FC = () => {
  const [sentItems, setSentItems] = useState<ISentItem[]>([]);

  function handleSend(text: string, attachments: IAttachment[]) {
    const sentItem: ISentItem = {
      id: nanoid(),
      text: text,
      selected: false,
      attachments: attachments,
    };
    setSentItems((prev) => [...prev, sentItem]);
  }

  function handleDelete(ids: string[]) {
    setSentItems((prev) => prev.filter((item) => !ids.includes(item.id)));
  }

  function handleDeleteItem(id: string) {
    setSentItems((prev) => prev.filter((item) => id !== item.id));
  }

  function getSelectedItemIds(): string[] {
    return sentItems.filter((item) => item.selected).map((item) => item.id);
  }

  function handleExport(ids: string[]) {
    const itemsToExport = sentItems.filter((item) => ids.includes(item.id));

    const payload = itemsToExport.map(({ text, attachments }) => ({
      text,
      attachments:
        attachments?.map(({ file, previewUrl }) => ({
          name: file.name,
          previewUrl,
        })) ?? [],
    }));

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `export_${timestamp}.json`;
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
  }

  function handleUpdate(id: string, changes: Partial<ISentItem>) {
    setSentItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
            }
          : item
      )
    );
  }

  const hasItems = sentItems.length > 0;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: { xs: 2, sm: 4, md: 6 },
        bgcolor: "#f0f0f0",
        boxSizing: "border-box",
      }}
    >
      {!hasItems ? (
        // Centered Sphere GIF + message
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            textAlign: "center",
          }}
        >
          {/* Sphere GIF */}
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: "transparent",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src="/sphere.gif"
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                display: "block",
                mixBlendMode: "difference",
                filter:
                  "brightness(1) saturate(100%) sepia(1) hue-rotate(180deg) saturate(2)",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            mb={2}
          >
            How Can I Help You Today?
          </Typography>
        </Box>
      ) : (
        <>
          {/* Selected items and bulk actions */}
          <Box
            sx={{
              height: 60,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 2,
              px: 2,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              {getSelectedItemIds().length > 0 ? (
                <Typography fontWeight="bold">{`Selected ${
                  getSelectedItemIds().length
                } items`}</Typography>
              ) : null}
              <Button
                onClick={() => handleExport(getSelectedItemIds())}
                color="primary"
                variant="contained"
                sx={{ opacity: 0.8 }}
                aria-label="Export"
                disabled={getSelectedItemIds().length < 1}
              >
                <DownloadOutlined />
              </Button>
              <Button
                onClick={() => handleDelete(getSelectedItemIds())}
                color="error"
                sx={{ opacity: 0.8 }}
                variant="contained"
                aria-label="Delete"
                disabled={getSelectedItemIds().length < 1}
              >
                <DeleteOutlineRounded />
              </Button>
            </Box>
          </Box>

          {/* Scrollable container */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              bgcolor: "white",
              borderRadius: 3,
              p: 3,
              boxShadow: 1,
              maxWidth: "100%",
              gap: 2,
            }}
          >
            {sentItems.map((item) => (
              <SentItem
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onDelete={() => handleDeleteItem(item.id)}
                onExport={() => handleExport([item.id])}
              />
            ))}
          </Box>
        </>
      )}
      {/* UploaderBar */}
      <Box sx={{ mt: 2, width: "100%", maxWidth: "100%" }}>
        <UploaderBar onSend={handleSend} />
      </Box>
    </Box>
  );
};

export default App;
