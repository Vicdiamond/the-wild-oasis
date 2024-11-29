import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://cvfqyeolwtiggkqpfarq.supabase.co'

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZnF5ZW9sd3RpZ2drcXBmYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NTk0MDYsImV4cCI6MjA0NjAzNTQwNn0.sZJAfL3oR_934v-YtJEjuHbhY40ceylhWiY7YesNCY4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
