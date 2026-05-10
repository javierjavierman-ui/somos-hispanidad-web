/*
 * =====================================================
 * SOMOS HISPANIDAD — Datos y lógica de Eventos
 * Archivo: src/js/eventos.js
 *
 * Contiene los datos simulados de eventos y las
 * funciones para mostrarlos en la página eventos.html.
 * En el futuro, los datos vendrán de Supabase.
 * =====================================================
 */

// ── DATOS SIMULADOS DE EVENTOS ────────────────────────────
// Cuando Supabase esté conectado, estos datos se reemplazarán
// por la función getEventos() del archivo supabaseClient.js

const EVENTOS_SIMULADOS = [
  {
    id: 1,
    titulo: "Visita guiada al Monasterio del Escorial con comida de hermandad",
    fecha: "2026-06-20",
    dia: "20",
    mes: "Jun",
    anio: "2026",
    lugar: "Real Monasterio de San Lorenzo de El Escorial, Madrid",
    tipo: "Visita Cultural",
    descripcion: "Una jornada especial en uno de los monumentos más emblemáticos del imperio español. Incluye visita guiada y comida de hermandad con los socios.",
    url_inscripcion: "https://www.somoshispanidad.es/detalles-y-registro/visita-guiada-al-monasterio-del-escorial-con-comida-de-hermandad",
    estado: "abierto"
  },
  {
    id: 2,
    titulo: "Conferencia: La España Olvidada — Legado jurídico en América",
    fecha: "2026-07-15",
    dia: "15",
    mes: "Jul",
    anio: "2026",
    lugar: "Madrid, España (sede por confirmar)",
    tipo: "Conferencia",
    descripcion: "Análisis profundo del sistema jurídico que España implantó en América, sus raíces romanas y su influencia en los ordenamientos modernos hispanoamericanos.",
    url_inscripcion: "#contacto",
    estado: "abierto"
  },
  {
    id: 3,
    titulo: "Ciclo Indígenas — El Papel en la Conquista: Perú y el Caribe",
    fecha: "2026-09-10",
    dia: "10",
    mes: "Sep",
    anio: "2026",
    lugar: "Online · Plataforma Zoom",
    tipo: "Charla Online",
    descripcion: "Segunda entrega del ciclo sobre el papel activo de los pueblos originarios durante la conquista. Ponente: Dr. José J. Laorden.",
    url_inscripcion: "#contacto",
    estado: "proximo"
  },
  {
    id: 4,
    titulo: "Presentación del Barómetro sobre la Hispanidad 2026",
    fecha: "2026-10-12",
    dia: "12",
    mes: "Oct",
    anio: "2026",
    lugar: "Madrid, España",
    tipo: "Presentación",
    descripcion: "Presentación pública de los resultados del Barómetro anual sobre la percepción de la Hispanidad en el mundo hispano. Día de la Hispanidad.",
    url_inscripcion: "#contacto",
    estado: "proximo"
  }
];


// ── FUNCIÓN: RENDERIZAR TARJETAS DE EVENTOS ───────────────
/**
 * Genera y muestra las tarjetas de eventos en el contenedor indicado.
 * @param {string} contenedorId - El id del elemento HTML donde se insertarán
 * @param {number} limite - Cuántos eventos mostrar (0 = todos)
 */
function renderizarEventos(contenedorId, limite = 0) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  // En el futuro: const eventos = await getEventos();
  const eventos = EVENTOS_SIMULADOS;
  const lista = limite > 0 ? eventos.slice(0, limite) : eventos;

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="body-text">No hay eventos próximos en este momento. Vuelve pronto.</p>';
    return;
  }

  contenedor.innerHTML = lista.map(ev => `
    <div class="evento-card reveal">
      <div class="evento-date">
        <div class="evento-day">${ev.dia}</div>
        <div class="evento-month">${ev.mes} · ${ev.anio}</div>
      </div>
      <div class="evento-info">
        <p class="evento-tipo">${ev.tipo}</p>
        <h3 class="evento-title">${ev.titulo}</h3>
        <p class="evento-loc">📍 ${ev.lugar}</p>
        <p style="font-family:'Cormorant Garamond',serif; font-size:1rem; color:var(--ink-soft); margin-bottom:16px; line-height:1.7;">${ev.descripcion}</p>
        <a href="${ev.url_inscripcion}" class="btn-primary" style="font-size:0.7rem; padding:10px 22px;" ${ev.url_inscripcion.startsWith('http') ? 'target="_blank"' : ''}>
          Inscribirse
        </a>
      </div>
    </div>
  `).join('');

  // Activar animación reveal en los elementos recién creados
  activarReveal();
}


// ── FUNCIÓN: FORMULARIO DE INSCRIPCIÓN ────────────────────
/**
 * Gestiona el formulario de inscripción a un evento.
 * De momento muestra un mensaje; en el futuro enviará datos a Supabase.
 */
function initFormularioInscripcion() {
  const form = document.getElementById('form-inscripcion');
  if (!form) return;

  // Rellenar el selector de eventos disponibles
  const selectEvento = document.getElementById('select-evento');
  if (selectEvento) {
    EVENTOS_SIMULADOS.forEach(ev => {
      const option = document.createElement('option');
      option.value = ev.id;
      option.textContent = `${ev.dia} ${ev.mes} · ${ev.titulo}`;
      selectEvento.appendChild(option);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('insc-nombre')?.value;
    const email = document.getElementById('insc-email')?.value;
    const evento = document.getElementById('select-evento')?.value;

    if (!nombre || !email || !evento) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    // ── AQUÍ irá en el futuro: registrarSimpatizante(nombre, email, evento);

    const exito = document.getElementById('inscripcion-exito');
    if (exito) {
      exito.style.display = 'block';
      form.style.display = 'none';
    }
  });
}


// ── INICIALIZAR AL CARGAR LA PÁGINA ──────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Renderizar en la página de eventos completa
  if (document.getElementById('lista-eventos')) {
    renderizarEventos('lista-eventos');
    initFormularioInscripcion();
  }

  // Renderizar solo 2 en la página de inicio (preview)
  if (document.getElementById('eventos-preview')) {
    renderizarEventos('eventos-preview', 2);
  }
});
