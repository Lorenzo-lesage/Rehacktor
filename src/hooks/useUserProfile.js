import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase-client";

function useUserProfile(session) {
  return useQuery({
    queryKey: ["userProfile", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!session?.user,
    staleTime: 5 * 60 * 1000,
  });
}

export default useUserProfile;