import type { IAttachment } from "../types";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, styled, TextField } from "@mui/material";
import { SendRounded, FileUploadOutlined } from "@mui/icons-material";
import { nanoid } from "nanoid";
import DragOverlayToast from "./DragOverlayToast";
import AttachmentThumbnail from "./AttachmentThumbnail";

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
  const [showDragModal, setShowDragModal] = useState(false);
  const [textError, setTextError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = React.useRef<number | null>(null);

  function handleFiles(files: FileList | null): void {
    if (!files || files.length < 1) {
      return;
    }

    // Additional check
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    const attachments = imageFiles.map((file) => ({
      id: nanoid(),
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...attachments]);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
    setShowDragModal(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    timeoutRef.current = window.setTimeout(() => {
      setShowDragModal(false);
      timeoutRef.current = null;
    }, 2000);
  };

  const handleToastFinish = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowDragModal(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setTimeout(() => {
      setShowDragModal(false);
    }, 2000);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
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

  function handleSendItem() {
    if (text.trim() === "") {
      setTextError(true);
      return;
    }
    setTextError(false);

    onSend(text, attachments);
    setText("");
    setAttachments([]);
  }

  // Cleanup for the image previewUrls
  useEffect(() => {
    return () => {
      attachments.forEach((att) => {
        if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
      });
    };
  }, [attachments]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        component="section"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          backgroundColor: "white",
          borderRadius: "14px",
          border: dragOver
            ? "2px dashed #1976d2"
            : textError
            ? "2px solid red"
            : "2px dashed transparent",
          position: "relative",
        }}
      >
        {/* Attachments, Text Field and Buttons*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Attachments */}
          <Box
            display="flex"
            gap={1}
            maxWidth="100%"
            sx={{
              overflowX: "auto",
              flexWrap: "nowrap",
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
            {attachments.map((attachment) => (
              <AttachmentThumbnail
                key={attachment.id}
                attachment={attachment}
                onRemove={removeAttachment}
              />
            ))}
          </Box>
          {/* Text Field */}
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              pr: 6,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                boxShadow: "none",
              },
            }}
            multiline
            minRows={3}
            maxRows={6}
            placeholder="What would you like help with today?"
            fullWidth
            error={textError}
            helperText={
              textError ? "Please enter some text before sending." : ""
            }
          />
          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              sx={{ opacity: 0.5 }}
            >
              <FileUploadOutlined />
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => onFileChange(event.target.files)}
                accept="image/*"
                multiple
              />
            </Button>
            <Button
              onClick={handleSendItem}
              role={undefined}
              variant="contained"
            >
              <SendRounded />
            </Button>
          </Box>
        </Box>
        {dragOver ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
              zIndex: 10,
              userSelect: "none",
            }}
          >
            <FileUploadOutlined sx={{ fontSize: 42 }} />
          </Box>
        ) : null}
      </Box>

      {showDragModal ? (
        <DragOverlayToast
          message="Bonus Unlocked: Drag & Drop! +10G"
          onFinish={handleToastFinish}
        />
      ) : null}
    </Box>
  );
};

export default UploaderBar;
