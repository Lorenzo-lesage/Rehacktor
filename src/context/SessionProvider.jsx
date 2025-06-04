import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "./SessionContext";

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);

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
        if (!session) {
          setUserProfile(null);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    setLoadingProfile(true);

    supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) {
          setUserProfile(data);
        }
        setLoadingProfile(false);
      });
  }, [session]);

  if (loadingSession || loadingProfile) {
    return null; // O qui puoi mettere uno skeleton o spinner
  }

  return (
    <SessionContext.Provider
      value={{ session, userProfile, setUserProfile, loadingSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}


export default SessionProvider;
