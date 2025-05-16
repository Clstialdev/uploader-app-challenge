import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import UploaderBar from "./components/UploaderBar";
import SentItem from "./components/SentItem";
import type { IAttachment, ISentItem } from "./types";
import { nanoid } from "nanoid";

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

  // Note: This file is getting long, maybe creating a utils file for these functions would be best
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

  return (
    <Box>
      Render the page here
      <UploaderBar onSend={handleSend} />
      {/* TODO: Bulk actions */}
      {getSelectedItemIds().length > 0 ? (
        <Box>
          <Button onClick={() => handleExport(getSelectedItemIds())}>
            Export
          </Button>
          <Button onClick={() => handleDelete(getSelectedItemIds())}>
            Delete
          </Button>
        </Box>
      ) : null}
      {/* TODO: map items to their respective components */}
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
  );
};

export default App;
