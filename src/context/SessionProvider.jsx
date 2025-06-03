import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { supabase } from "../supabase/supabase-client";

function SessionProvider({ children }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [session, setSession] = useState(null);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
