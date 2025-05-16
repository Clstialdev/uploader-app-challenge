import type { IAttachment } from "../types";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Input, styled } from "@mui/material";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SendIcon from "@mui/icons-material/Send";
import { CloudCircleOutlined } from "@mui/icons-material";
import { nanoid } from "nanoid";

interface Props {
  onSend: (text: string, attachments: IAttachment[]) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploaderBar: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<IAttachment[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null): void {
    if (!files || files.length < 1) {
      return;
    }

    const attachments = Array.from(files).map((file) => ({
      id: nanoid(),
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...attachments]);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      // Call your file handler here
      handleFiles(files);
      e.dataTransfer.clearData();
    }
  };

  function onFileChange(files: FileList | null) {
    handleFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  }

  // TODO: onSend -> invoke onSend(text, attachments), reset text & attachments

  // Cleanup for the image previewUrls
  useEffect(() => {
    return () => {
      attachments.forEach((att) => {
        if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
      });
    };
  }, [attachments]);

  return (
    <Box>
      <Box
        component="section"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: dragOver ? "2px dashed #1976d2" : "2px dashed transparent",
          borderRadius: 1,
          padding: 1,
        }}
      >
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </Box>
      <Button>Send Button</Button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudCircleOutlined />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => onFileChange(event.target.files)}
          multiple
        />
      </Button>
      {/* Optional: Render drag-overlay when dragOver is true */}
      {attachments.map((attachment) => (
        <img
          key={attachment.id}
          src={attachment.previewUrl}
          alt={`${attachment.file.name} - preview`}
          height={200}
          onClick={() => removeAttachment(attachment.id)}
        />
      ))}
    </Box>
  );
};

export default UploaderBar;
