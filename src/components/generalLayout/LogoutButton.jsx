import { forwardRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import { showToast } from "../../utils/snackbarUtils";
import LogoutIcon from "@mui/icons-material/Logout";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LogoutButton({ open, setOpen }) {
  /*
  |--------------------------------------------------------
  | Data
  |--------------------------------------------------------
 */

  const [openLogout, setOpLogouten] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenDialog = () => setOpLogouten(true);
  const handleCloseDialog = () => setOpLogouten(false);

  /*
  |--------------------------------------------------------
  | Methods
  |--------------------------------------------------------
 */

  const signOut = async () => {
    setOpen(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      showToast("error", "Oops! Something went wrong");
      return;
    }
    showToast("default", "You have been signed out");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    setOpLogouten(false);
    signOut();
  };

  /*
  |--------------------------------------------------------
  | Return
  |--------------------------------------------------------
 */

  return (
    <>
      <Box
        variant="body1"
        onClick={handleOpenDialog}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0.3rem 1rem",
          cursor: "pointer",
          borderRadius: 2,
          transition: "all 0.25s ease",
          fontWeight: 600,
          gap: 1,
          "&:hover": {
            transform: "translateX(4px)",
          },
          "& svg": {
            transition: "all 0.25s ease",
            fontSize: "2rem",
          },
          "&:hover svg": {
            backgroundColor: theme.palette.background.iconHover,
          },
        }}
      >
        <LogoutIcon
          fontSize="small"
          sx={{
            fontSize: "2rem",
            padding: "0.3rem",
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.background.icon,
            borderRadius: 1,
            transition: "all 0.25s ease",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            display: {
              xs: "block",
              lg: open ? "block" : "none",
            },
            ":hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Logout
        </Typography>
      </Box>

      <Dialog
        open={openLogout}
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
