import { Box, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import type { IAttachment } from "../types";

const AttachmentThumbnail = ({
  attachment,
  onRemove,
}: {
  attachment: IAttachment;
  onRemove: (id: string) => void;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: 100,
        minWidth: 100,
        width: 100,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: 3,
        m: 1,
        "&:hover .overlay": {
          opacity: 1,
          pointerEvents: "auto",
        },
        "&:hover": {
          animation: `shake-smooth 0.5s infinite`,
        },
      }}
    >
      <img
        src={attachment.previewUrl}
        alt={`${attachment.file.name} - preview`}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: 8,
        }}
      />

      {/* Overlay */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      >
        <IconButton
          aria-label="remove attachment"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(attachment.id);
          }}
          sx={{
            color: "error.main",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { bgcolor: "error.light" },
            animation: "shake 0.5s infinite",
            fontSize: 28,
          }}
        >
          <CloseRounded fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AttachmentThumbnail;
