import { createClient } from '@supabase/supabase-js'

// 🔹 Get these from your Supabase Project Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey,
//     {
//     auth: {
//       // Enable automatic token refresh
//       autoRefreshToken: true,
//       // Persist session
//       persistSession: true,
//       // Detect session in URL (for OAuth)
//       detectSessionInUrl: true,
//       // Storage key prefix
//       storageKey: 'supabase.auth.token',
//       // Custom storage (optional - use sessionStorage instead)
//       storage: window.sessionStorage
//     }
//   }
)
