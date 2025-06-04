import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";

export default function useAvatarUrl(path) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    async function downloadAvatar() {
      if (!path) {
        setAvatarUrl(null);
        return;
      }

      try {
        const { data, error } = await supabase.storage.from("avatars").download(path);
        if (error) {
          throw error;
        }
        objectUrl = URL.createObjectURL(data);
        if (isMounted) {
          setAvatarUrl(objectUrl);
        }
      } catch (error) {
        console.error("Errore download avatar:", error.message);
        if (isMounted) {
          setAvatarUrl(null);
        }
      } 
    }

    downloadAvatar();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [path]);

  return { avatarUrl };
}
