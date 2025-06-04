import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import { showToast } from "../../components/toast/toastHelper";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router";
import AvatarAccount from "../../components/generalLayout/AvatarAccount";

function AccountPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { session, setUserProfile } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
        setLoading(false);
      }
    };

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Method to update profile
   * @param {*} event
   */
  const updateProfile = async () => {
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      showToast("error", {
        message: "Error updating profile",
        description: error.message,
      });
      console.warn(error);
    } else {
      showToast("success", "Profile updated successfully!");

      // ✅ aggiorna il contesto globale
      setUserProfile(updates);

      navigate("/");
    }

    setLoading(false);
  };

  /**
   * Method to handle avatar upload
   * @param {string} filePath
   */
  const handleAvatarUpload = (filePath) => {
    // ⛔ NON aggiorniamo più il DB qui
    // ✅ aggiorniamo solo lo stato locale
    setAvatarUrl(filePath);
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box className="container" maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h3" gutterBottom align="center">
        {first_name?.toUpperCase()} {last_name?.toUpperCase()}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Profile Settings
      </Typography>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile();
        }}
        className="form-widget"
      >
        <AvatarAccount
          url={avatar_url}
          size={150}
          onUpload={handleAvatarUpload}
          firstName={first_name}
          lastName={last_name}
        />

        <Stack spacing={3}>
          {/* Email - readonly */}
          <TextField
            id="email"
            type="email"
            label="Email"
            value={session?.user.email}
            disabled
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Username */}
          <TextField
            label="Username"
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* First Name */}
          <TextField
            label="First Name"
            id="first_name"
            type="text"
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Last Name */}
          <TextField
            label="Last Name"
            id="last_name"
            type="text"
            value={last_name || ""}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Submit button */}
          <Stack direction="row">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="small"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default AccountPage;
