import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase/supabase-client.js";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        navigate("/");
      } else {
        console.error("No active session found", error);
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default AuthCallback;
