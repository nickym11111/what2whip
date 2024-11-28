import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqlidvlzyphgrbfmmwqt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxbGlkdmx6eXBoZ3JiZm1td3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNTIwNTksImV4cCI6MjA0NzcyODA1OX0.JiGwO8PeQkxDKJaZXC6JJHtZMmlZj0O-Yh-EvrAhFxQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
