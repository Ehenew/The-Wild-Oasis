import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hxupjduozxdsycipkgth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dXBqZHVvenhkc3ljaXBrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzIwNzAsImV4cCI6MjA1Nzk0ODA3MH0.aE84EyzIGuGuPZcbiCpjXpFFMzrqxHDHvzoWUf5vNxo';

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase; 