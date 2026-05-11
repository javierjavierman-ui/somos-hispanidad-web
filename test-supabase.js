const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://fzftntxrkagnvchhwehn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZnRudHhya2FnbnZjaGh3ZWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NzQyMzEsImV4cCI6MjA5NDA1MDIzMX0.AEdBRj7UE8HV5T7ENUNB0PpvzW5CsXJTUIp9w6HqvIQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTest() {
  console.log('Testing connection to Supabase...');
  
  // Test 1: Insert into contact_messages
  const { error: err1 } = await supabase.from('contact_messages').insert([
    { name: 'Antigravity Test', email: 'test@antigravity.ai', subject: 'Prueba de conexión', message: 'Este es un mensaje de prueba automático para verificar que las políticas RLS y la inserción funcionan correctamente.' }
  ]);
  
  if (err1) {
    console.error('Test 1 Failed:', err1.message);
  } else {
    console.log('Test 1 Passed: Successfully inserted contact message.');
  }
  
  // Test 2: Read from events
  const { data, error: err2 } = await supabase.from('events').select('id, title').limit(1);
  if (err2) {
    console.error('Test 2 Failed:', err2.message);
  } else {
    console.log('Test 2 Passed: Successfully read from events. Found:', data);
  }
}

runTest();
