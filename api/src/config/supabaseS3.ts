import { createClient } from '@supabase/supabase-js';
import { config } from './system'

export const supabase = createClient(
    config().supabaseUrl,
    config().supabaseKey
)