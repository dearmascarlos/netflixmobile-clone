import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://hwwerzhvegdfrezrzthb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d2Vyemh2ZWdkZnJlenJ6dGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMTIyMTYsImV4cCI6MTk5ODU4ODIxNn0.wbUOTOw8ASThMLf5qZPTkJo0F5HWXHDBdQPP4pYObRA';
export const supabase = createClient(supabaseUrl, supabaseKey);
