import { useState } from "react";
import { Grid, Typography, Button, Alert, Snackbar } from "@mui/material";
import ClipboardJS from "clipboard";

export default function Clipboard(props) {
  const { name, link, title, side } = props;
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyClick = () => {
    const clipboard = new ClipboardJS(".copy-button", {
      text: () => link,
    });

    clipboard.on("success", () => {
      clipboard.destroy();
      setSnackbarOpen(true);
    });

    clipboard.on("error", () => {
      clipboard.destroy();
      alert("Error al copiar al portapapeles. Intenta nuevamente.");
    });

    clipboard.onClick({ delegate: true });
  };

  return (
    <Grid container sx={!side && { maxWidth: "100%", width: "100%" }}>
      <Grid
        item
        sx={
          side
            ? {
                display: "flex",
                flexDirection: side ? "row" : "column",
                justifyContent: "center",
                alignItems: side ? "center" : "flex-start",
                mb: 2,
              }
            : {
                display: "flex",
                flexDirection: side ? "row" : "column",
                justifyContent: "center",
                alignItems: side ? "center" : "flex-start",
                mb: 2,
                maxWidth: "100%",
                width: "100%",
              }
        }
      >
        <Typography fontSize={16} fontWeight={"bold"} sx={{ mr: 1 }}>
          {name}
        </Typography>
        <Button
          className="copy-button"
          variant="contained"
          onClick={handleCopyClick}
          sx={!side && { maxWidth: "100%", width: "100%" }}
        >
          <Typography fontSize={10}>{title || "link"}</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success" variant="filled">
            Copiado al portapapeles
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
