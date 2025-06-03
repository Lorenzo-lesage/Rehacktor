import { useEffect, useState } from "react";
import supabase from "../../supabase/supabase-client";
import { Box, IconButton, Avatar, CircularProgress } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { showToast } from "../../components/toast/toastHelper.jsx";

function AvatarAccount({ url, size, onUpload, firstName, lastName }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    console.log("Avatar URL received:", url);
    if (typeof url === "string" && url.length > 0) {
      downloadImage(url);
    } else {
      setAvatarUrl(null);
      setLoadingImage(false);
    }
  }, [url]);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const downloadImage = async (path) => {
    setLoadingImage(true);
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
      setAvatarUrl(null);
    }
    setLoadingImage(false);
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setUploading(false);
    }
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {avatarUrl ? (
        <Box sx={{ position: "relative", width: size, height: size }}>
          <Avatar
            alt="Avatar"
            src={avatarUrl}
            sx={{
              width: size,
              height: size,
              boxShadow: "3px 3px 8px black",
            }}
          />
          {loadingImage && (
            <CircularProgress
              size={size}
              thickness={1}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: `-${size / 2}px`,
                marginLeft: `-${size / 2}px`,
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
      ) : (
        <Box sx={{ position: "relative", width: size, height: size }}>
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "grey.400",
              fontSize: size / 3,
            }}
          >
            {firstName?.[0]?.toUpperCase()}
            {lastName?.[0]?.toUpperCase()}
          </Avatar>
          {loadingImage && (
            <CircularProgress
              size={size / 2}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: `-${size / 4}px`,
                marginLeft: `-${size / 4}px`,
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
      )}

      <Box width={size}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          disabled={uploading}
        >
          <PhotoCamera />
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AvatarAccount;
