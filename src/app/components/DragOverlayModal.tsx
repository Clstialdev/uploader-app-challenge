import React from "react";
import ReactDOM from "react-dom";
import { Box, Typography } from "@mui/material";

interface DragOverlayModalProps {
  onClose: () => void;
}

const DragOverlayModal: React.FC<DragOverlayModalProps> = ({ onClose }) => {
  const portalRoot = document.getElementById("drag-overlay-modal-portal");
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <Box
      onDragLeave={onClose}
      onDrop={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.5)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 24,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <Typography>Drop files here to upload</Typography>
    </Box>,
    portalRoot
  );
};

export default DragOverlayModal;
