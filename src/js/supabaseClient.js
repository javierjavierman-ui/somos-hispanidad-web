/*
 * =====================================================
 * SOMOS HISPANIDAD — Cliente Supabase
 * Archivo: src/js/supabaseClient.js
 *
 * Este archivo prepara la conexión con Supabase.
 * Actualmente NO está conectado. Cuando llegue el momento,
 * solo tendrás que rellenar las constantes de abajo
 * y descomentar las líneas indicadas.
 * =====================================================
 */

// ── PASO 1: Credenciales de Supabase ──────────────────────
// Cuando tengas tu proyecto Supabase creado, copia aquí:
// - SUPABASE_URL: lo encontrarás en Settings > API > Project URL
// - SUPABASE_ANON_KEY: Settings > API > anon/public key
// ¡NUNCA subas claves reales a GitHub sin protegerlas!

const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';      // <-- reemplaza esto
const SUPABASE_ANON_KEY = 'TU-CLAVE-ANONIMA-PUBLICA';       // <-- reemplaza esto


// ── PASO 2: Inicializar el cliente Supabase ────────────────
// Para activar, descomenta las líneas siguientes e incluye
// la librería CDN en tu HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

/*
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
*/


// ── PASO 3: Funciones de lectura (GET) ────────────────────
// Ejemplos de cómo leer datos de Supabase en el futuro.

/**
 * Obtener todos los eventos de la tabla "eventos"
 * Ordenados por fecha ascendente
 */
async function getEventos() {
  // Descomentar cuando Supabase esté activo:
  /*
  const { data, error } = await supabaseClient
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: true });

  if (error) {
    console.error('Error al obtener eventos:', error.message);
    return [];
  }
  return data;
  */

  // Por ahora devuelve los datos simulados del archivo eventos.js
  console.warn('Supabase aún no conectado. Usando datos simulados.');
  return typeof EVENTOS_SIMULADOS !== 'undefined' ? EVENTOS_SIMULADOS : [];
}

/**
 * Obtener todos los contenidos de la tabla "contenidos"
 * Ordenados por fecha de publicación descendente
 */
async function getContenidos() {
  /*
  const { data, error } = await supabaseClient
    .from('contenidos')
    .select('*')
    .order('fecha_publicacion', { ascending: false });

  if (error) {
    console.error('Error al obtener contenidos:', error.message);
    return [];
  }
  return data;
  */

  console.warn('Supabase aún no conectado. Usando datos simulados.');
  return typeof CONTENIDOS_SIMULADOS !== 'undefined' ? CONTENIDOS_SIMULADOS : [];
}

/**
 * Obtener todos los autores de la tabla "autores"
 */
async function getAutores() {
  /*
  const { data, error } = await supabaseClient
    .from('autores')
    .select('*')
    .order('apellido', { ascending: true });

  if (error) {
    console.error('Error al obtener autores:', error.message);
    return [];
  }
  return data;
  */

  console.warn('Supabase aún no conectado. Usando datos simulados.');
  return typeof AUTORES_SIMULADOS !== 'undefined' ? AUTORES_SIMULADOS : [];
}


// ── PASO 4: Funciones de escritura (INSERT) ───────────────

/**
 * Guardar un mensaje de contacto en la tabla "mensajes"
 */
async function guardarMensaje(nombre, email, asunto, mensaje) {
  /*
  const { data, error } = await supabaseClient
    .from('mensajes')
    .insert([{ nombre, email, asunto, mensaje, fecha: new Date().toISOString() }]);

  if (error) {
    console.error('Error al guardar mensaje:', error.message);
    return false;
  }
  return true;
  */

  console.warn('Supabase aún no conectado. Mensaje no guardado en base de datos.');
  return false;
}

/**
 * Registrar a un simpatizante/suscriptor en la tabla "simpatizantes"
 */
async function registrarSimpatizante(nombre, email, evento_id) {
  /*
  const { data, error } = await supabaseClient
    .from('simpatizantes')
    .insert([{ nombre, email, evento_id, fecha_registro: new Date().toISOString() }]);

  if (error) {
    console.error('Error al registrar simpatizante:', error.message);
    return false;
  }
  return true;
  */

  console.warn('Supabase aún no conectado. Registro no guardado en base de datos.');
  return false;
}


// ── EXPORTAR FUNCIONES ────────────────────────────────────
// Si en el futuro se usa un bundler (Vite, Webpack), descomenta:
// export { getEventos, getContenidos, getAutores, guardarMensaje, registrarSimpatizante };
