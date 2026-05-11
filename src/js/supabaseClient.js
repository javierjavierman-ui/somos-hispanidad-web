/*
 * =====================================================
 * SOMOS HISPANIDAD — Cliente Supabase
 * Archivo: src/js/supabaseClient.js
 *
 * Conexión ACTIVA con Supabase.
 * =====================================================
 */

// ── Credenciales de Supabase ──────────────────────────────
const SUPABASE_URL = 'https://fzftntxrkagnvchhwehn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZnRudHhya2FnbnZjaGh3ZWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NzQyMzEsImV4cCI6MjA5NDA1MDIzMX0.AEdBRj7UE8HV5T7ENUNB0PpvzW5CsXJTUIp9w6HqvIQ';

// ── Inicializar el cliente Supabase ────────────────────────
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase conectado:', SUPABASE_URL);


// ── Funciones de lectura (GET) ────────────────────────────

/**
 * Obtener todos los eventos de la tabla "eventos"
 * Ordenados por fecha ascendente.
 * Si la tabla no tiene datos, usa los simulados como fallback.
 */
async function getEventos() {
  try {
    const { data, error } = await supabaseClient
      .from('eventos')
      .select('*')
      .order('fecha', { ascending: true });

    if (error) {
      console.warn('⚠ Error Supabase (eventos):', error.message, '→ Usando datos simulados.');
      return typeof EVENTOS_SIMULADOS !== 'undefined' ? EVENTOS_SIMULADOS : [];
    }

    if (data && data.length > 0) {
      // Formatear campos de fecha para compatibilidad con el renderizador
      return data.map(ev => {
        const d = new Date(ev.fecha);
        const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        return {
          ...ev,
          dia: String(d.getDate()).padStart(2, '0'),
          mes: meses[d.getMonth()],
          anio: String(d.getFullYear())
        };
      });
    }

    // Si la tabla existe pero está vacía, usar datos simulados
    console.info('ℹ Tabla "eventos" vacía. Usando datos simulados.');
    return typeof EVENTOS_SIMULADOS !== 'undefined' ? EVENTOS_SIMULADOS : [];
  } catch (err) {
    console.warn('⚠ Supabase no disponible (eventos):', err.message);
    return typeof EVENTOS_SIMULADOS !== 'undefined' ? EVENTOS_SIMULADOS : [];
  }
}

/**
 * Obtener todos los contenidos de la tabla "contenidos"
 * Ordenados por fecha de publicación descendente
 */
async function getContenidos() {
  try {
    const { data, error } = await supabaseClient
      .from('contenidos')
      .select('*')
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      console.warn('⚠ Error Supabase (contenidos):', error.message, '→ Usando datos simulados.');
      return typeof CONTENIDOS_SIMULADOS !== 'undefined' ? CONTENIDOS_SIMULADOS : [];
    }

    if (data && data.length > 0) {
      // Formatear fecha para compatibilidad con el renderizador
      return data.map(c => ({
        ...c,
        fecha: c.fecha_publicacion
          ? new Date(c.fecha_publicacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          : '',
        imagen: c.imagen || null
      }));
    }

    console.info('ℹ Tabla "contenidos" vacía. Usando datos simulados.');
    return typeof CONTENIDOS_SIMULADOS !== 'undefined' ? CONTENIDOS_SIMULADOS : [];
  } catch (err) {
    console.warn('⚠ Supabase no disponible (contenidos):', err.message);
    return typeof CONTENIDOS_SIMULADOS !== 'undefined' ? CONTENIDOS_SIMULADOS : [];
  }
}

/**
 * Obtener todos los autores de la tabla "autores"
 */
async function getAutores() {
  // Tabla "autores" aún no creada, usar datos simulados
  console.info('ℹ Usando autores simulados.');
  return typeof AUTORES_SIMULADOS !== 'undefined' ? AUTORES_SIMULADOS : [];
}


// ── Funciones de escritura (INSERT) ───────────────────────

/**
 * Guardar un mensaje de contacto en la tabla "mensajes"
 */
async function guardarMensaje(nombre, email, asunto, mensaje) {
  try {
    const { data, error } = await supabaseClient
      .from('mensajes')
      .insert([{ nombre, email, asunto, mensaje, fecha: new Date().toISOString() }]);

    if (error) {
      console.error('❌ Error al guardar mensaje:', error.message);
      return false;
    }
    console.log('✅ Mensaje guardado en Supabase.');
    return true;
  } catch (err) {
    console.error('❌ Supabase no disponible:', err.message);
    return false;
  }
}

/**
 * Registrar a un simpatizante/suscriptor en la tabla "simpatizantes"
 */
async function registrarSimpatizante(nombre, email, evento_id) {
  try {
    const { data, error } = await supabaseClient
      .from('simpatizantes')
      .insert([{ nombre, email, evento_id, fecha_registro: new Date().toISOString() }]);

    if (error) {
      console.error('❌ Error al registrar simpatizante:', error.message);
      return false;
    }
    console.log('✅ Simpatizante registrado en Supabase.');
    return true;
  } catch (err) {
    console.error('❌ Supabase no disponible:', err.message);
    return false;
  }
}
