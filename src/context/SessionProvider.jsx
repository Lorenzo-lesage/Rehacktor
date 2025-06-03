// SessionProvider.jsx
import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { supabase } from "../supabase/supabase-client";

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        setUserProfile(null);
      } else if (session) {
        setSession(session);
        // (opzionale) puoi anche chiamare qui fetchUserProfile(session.user.id)
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        userProfile,
        setUserProfile, // esportiamo questa funzione per usarla in AccountPage
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
