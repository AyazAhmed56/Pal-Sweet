import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path

const SyncUserToSupabase = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      const { id, fullName, primaryEmailAddress } = user;
      const email = primaryEmailAddress?.emailAddress;
      // const supabase = await getSupabaseClient();
      // Upsert into Supabase
      const { error } = await supabase.from("users").upsert({
        id: id, // Use Clerk's user ID as Supabase ID
        name: fullName,
        email: email,
      });

      if (error) {
        console.error("Failed to sync user to Supabase:", error);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null; // No UI
};

export default SyncUserToSupabase;
