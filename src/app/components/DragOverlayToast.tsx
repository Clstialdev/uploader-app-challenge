import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Typography } from "@mui/material";

interface DragOverlayToastProps {
  message?: string;
  duration?: number;
  onFinish?: () => void;
}

const DragOverlayToast: React.FC<DragOverlayToastProps> = ({
  message = "Lorem Ipsum?",
  duration = 2000,
  onFinish,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "slideUp") {
      onFinish?.();
    }
  };

  const portalRoot = document.getElementById("drag-overlay-toast-portal");
  if (!portalRoot || !visible) return null;

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        px: 3,
        py: 1.5,
        borderRadius: 2,
        boxShadow: 3,
        fontWeight: "bold",
        fontSize: 18,
        userSelect: "none",
        animation: `
        slideDown 300ms ease forwards,
        slideUp 300ms ease forwards 1700ms
      `,
        zIndex: 1500,
      }}
      className="drag-overlay-toast"
      onAnimationEnd={handleAnimationEnd}
    >
      <Typography>{message}</Typography>
    </Box>,
    portalRoot
  );
};

export default DragOverlayToast;
