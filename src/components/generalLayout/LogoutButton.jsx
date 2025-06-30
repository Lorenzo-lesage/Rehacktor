import { forwardRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import { showToast } from "../toast/toastHelper";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LogoutButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      showToast("error", "Oops! Something went wrong");
      return;
    }
    showToast("success", "You have been signed out");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    signOut();
  };

  return (
    <>
      <Typography
        variant="body1"
        onClick={handleOpenDialog}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0.3rem 1rem",
          cursor: "pointer",
          borderRadius: 2,
          transition: "all 0.25s ease",
          fontWeight: 600,

          "&:hover": {
            transform: "translateX(4px)",
          },
          "& svg": {
            transition: "all 0.25s ease",
          },
          "&:hover svg": {
            color: theme.palette.primary.main,
            transform: "scale(1.15)",
          },
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
        Logout
      </Typography>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        slots={{ transition: Transition }}
      >
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogoutButton;
