// import { createClient } from "@supabase/supabase-js";
// import { useAuth } from "@clerk/clerk-react"; // or "@clerk/nextjs" if using Next.js

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);
// let supabase;

// export const getSupabaseClient = async () => {
// const { getToken } = useAuth(); // Clerk hook
// const token = await getToken(); // JWT token

// if (!supabase) {
// supabase = createClient(supabaseUrl, supabaseKey);
// };
// {
// global: {
// headers: {
// Authorization: `Bearer ${token}`,
// },
// },
// });
// }

// return supabase;
// };

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
