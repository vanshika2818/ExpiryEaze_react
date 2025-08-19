// These would normally come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Note: We're not creating the client here anymore
// Instead, we'll use the createClient function from utils/supabase/server.ts for server components
// and utils/supabase/client.ts for client components
