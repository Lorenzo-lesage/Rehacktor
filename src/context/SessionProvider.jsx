import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import useUserProfile from "../hooks/useUserProfile";
import LayoutSkeleton from "../components/skeleton/LayoutSkeleton";

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
      setLoadingSession(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  // Usa la hook qui per fetchare il profilo
  const { data: userProfileData, isLoading: loadingProfile } =
    useUserProfile(session);

  // Qui introduci un useState per userProfile con i dati caricati
  const [userProfile, setUserProfile] = useState(null);

  // Aggiorna userProfile ogni volta che userProfileData cambia
  useEffect(() => {
    if (userProfileData) {
      setUserProfile(userProfileData);
    }
  }, [userProfileData]);

  if (loadingSession || loadingProfile) {
    return <LayoutSkeleton />;
  }

  return (
    <SessionContext.Provider
      value={{ session, userProfile, setUserProfile }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
