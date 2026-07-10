import {createClient} from '@supabase/supabase-js';

// For client-side usage in Next.js, environment variables must be prefixed with
// NEXT_PUBLIC_. Rename your .env.local keys accordingly (see README below).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

