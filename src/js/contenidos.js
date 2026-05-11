/*
 * =====================================================
 * SOMOS HISPANIDAD — Datos y lógica de Contenidos
 * Archivo: src/js/contenidos.js
 *
 * Contiene los datos simulados de artículos, vídeos
 * y charlas, y las funciones para mostrarlos.
 * =====================================================
 */

// ── DATOS SIMULADOS DE CONTENIDOS ────────────────────────
const CONTENIDOS_SIMULADOS = [
  {
    id: 1,
    tipo: "Conferencia",
    titulo: "Presentación del libro «Justicia Real en la América Española»",
    autor: "César Pérez Guevara",
    fecha: "21 Abr 2026",
    imagen: "../../assets/images/yt-EZ2i15y-P3Y.jpg",
    descripcion: "Un análisis riguroso del sistema judicial que España desplegó en el Nuevo Mundo, desmintiendo las narrativas que lo reducen a mera opresión.",
    url: "https://youtu.be/EZ2i15y-P3Y",
    etiquetas: ["Justicia", "América", "Imperio"]
  },
  {
    id: 2,
    tipo: "Charla Temática",
    titulo: "El papel de los indígenas en la conquista de América: Mesoamérica",
    autor: "José J. Laorden",
    fecha: "8 Abr 2026",
    imagen: "../../assets/images/yt-afx1w-wiLCg.jpg",
    descripcion: "Revisión histórica del papel activo de los pueblos mesoamericanos como aliados y actores clave en el proceso de conquista del continente.",
    url: "https://youtu.be/afx1w-wiLCg",
    etiquetas: ["Indígenas", "Conquista", "Mesoamérica"]
  },
  {
    id: 3,
    tipo: "Artículo",
    titulo: "Terror Bolivariano — Análisis del revisionismo histórico contemporáneo",
    autor: "Francisco Massó",
    fecha: "18 Mar 2026",
    imagen: null,
    imagen_texto: "TERROR BOLIVARIANO",
    descripcion: "Una mirada crítica al uso político del revisionismo histórico en Venezuela y su impacto en la percepción de la herencia española en América Latina.",
    url: "https://www.somoshispanidad.es/post/terror-bolivariano",
    etiquetas: ["Revisionismo", "Venezuela", "Historia"]
  },
  {
    id: 4,
    tipo: "Artículo",
    titulo: "La lengua como puente: 500 millones de hispanohablantes",
    autor: "Redacción Somos Hispanidad",
    fecha: "2 Mar 2026",
    imagen: null,
    imagen_texto: "LENGUA E IDENTIDAD",
    descripcion: "El español es la segunda lengua más hablada del mundo. Un repaso a cómo la lengua vertebra la identidad hispánica a ambos lados del Atlántico.",
    url: "#",
    etiquetas: ["Lengua", "Identidad", "Cultura"]
  },
  {
    id: 5,
    tipo: "Vídeo",
    titulo: "Los Virreinatos: organización del mundo hispano en América",
    autor: "Somos Hispanidad",
    fecha: "14 Feb 2026",
    imagen: null,
    imagen_texto: "VIRREINATOS",
    descripcion: "Documental corto que recorre la organización territorial y administrativa del Imperio Español en América a través de sus cuatro grandes virreinatos.",
    url: "#",
    etiquetas: ["Virreinatos", "Imperio", "Administración"]
  },
  {
    id: 6,
    tipo: "Charla Temática",
    titulo: "El Barómetro de la Hispanidad: ¿Cómo nos vemos los hispanos?",
    autor: "Equipo Investigador",
    fecha: "20 Ene 2026",
    imagen: "../../assets/images/barometro.jpg",
    descripcion: "Presentación de los resultados preliminares del Barómetro sobre la Hispanidad: datos, percepciones y tendencias en 12 países.",
    url: "#",
    etiquetas: ["Barómetro", "Investigación", "Identidad"]
  }
];

// ── DATOS SIMULADOS DE AUTORES ────────────────────────────
const AUTORES_SIMULADOS = [
  {
    id: 1,
    nombre: "César Pérez Guevara",
    cargo: "Historiador y Escritor",
    especialidad: "Sistema jurídico colonial español",
    bio: "Especialista en la historia del derecho en la América colonial. Autor de «Justicia Real en la América Española».",
    imagen: null
  },
  {
    id: 2,
    nombre: "José J. Laorden",
    cargo: "Conferenciante e Investigador",
    especialidad: "Conquista de América y pueblos indígenas",
    bio: "Investigador independiente especializado en el estudio de las alianzas entre pueblos indígenas y españoles durante la conquista.",
    imagen: null
  },
  {
    id: 3,
    nombre: "Francisco Massó",
    cargo: "Analista político y escritor",
    especialidad: "Revisionismo histórico y geopolítica hispana",
    bio: "Analista y ensayista especializado en el estudio del revisionismo histórico y la narrativa política en Iberoamérica.",
    imagen: null
  },
  {
    id: 4,
    nombre: "Redacción Somos Hispanidad",
    cargo: "Equipo Editorial",
    especialidad: "Divulgación histórica y cultural",
    bio: "El equipo de redacción de Somos Hispanidad está formado por historiadores, periodistas y colaboradores comprometidos con la divulgación de la verdad histórica.",
    imagen: null
  }
];


// ── FUNCIÓN: RENDERIZAR TARJETAS DE CONTENIDO ─────────────
/**
 * Genera tarjetas de contenido en el contenedor indicado.
 * @param {string} contenedorId - Id del elemento HTML
 * @param {number} limite - Cuántos mostrar (0 = todos)
 * @param {string} filtroTipo - Filtrar por tipo ("Artículo", "Vídeo", etc.) o vacío para todos
 */
async function renderizarContenidos(contenedorId, limite = 0, filtroTipo = '') {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  let lista = await getContenidos();

  if (filtroTipo) {
    lista = lista.filter(c => c.tipo === filtroTipo);
  }

  if (limite > 0) {
    lista = lista.slice(0, limite);
  }

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="body-text">No hay contenidos disponibles en este momento.</p>';
    return;
  }

  contenedor.innerHTML = lista.map(c => `
    <article class="post-card reveal">
      ${c.imagen
        ? `<img src="${c.imagen}" alt="${c.titulo}" class="post-thumb" loading="lazy">`
        : `<div class="post-thumb-placeholder">${c.imagen_texto || c.tipo.toUpperCase()}</div>`
      }
      <div class="post-body">
        <p class="post-meta">${c.fecha} · ${c.tipo} · ${c.autor}</p>
        <h3 class="post-title">${c.titulo}</h3>
        <p style="font-family:'Cormorant Garamond',serif; font-size:0.95rem; color:var(--ink-soft); line-height:1.7; margin-bottom:16px;">${c.descripcion}</p>
        <a href="${c.url}" class="post-link" ${c.url.startsWith('http') ? 'target="_blank"' : ''}>
          ${c.tipo === 'Artículo' ? 'Leer artículo' : c.tipo === 'Vídeo' ? 'Ver vídeo' : 'Ver contenido'} →
        </a>
      </div>
    </article>
  `).join('');

  activarReveal();
}


// ── FUNCIÓN: RENDERIZAR AUTORES ───────────────────────────
async function renderizarAutores(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const autores = await getAutores();

  contenedor.innerHTML = autores.map(a => `
    <div class="post-card reveal">
      <div class="post-thumb-placeholder" style="aspect-ratio:1/1;">
        ${a.imagen
          ? `<img src="${a.imagen}" alt="${a.nombre}" style="width:100%;height:100%;object-fit:cover;">`
          : '<span style="font-size:2rem;">👤</span>'
        }
      </div>
      <div class="post-body">
        <p class="post-meta">${a.especialidad}</p>
        <h3 class="post-title">${a.nombre}</h3>
        <p style="font-family:'Lato',serif; font-size:0.75rem; color:var(--gold); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px;">${a.cargo}</p>
        <p style="font-family:'Cormorant Garamond',serif; font-size:1rem; color:var(--ink-soft); line-height:1.7;">${a.bio}</p>
      </div>
    </div>
  `).join('');

  activarReveal();
}


// ── FUNCIÓN: FILTROS DE CONTENIDO ─────────────────────────
function initFiltros() {
  const botones = document.querySelectorAll('[data-filtro]');
  botones.forEach(btn => {
    btn.addEventListener('click', function() {
      botones.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const tipo = this.getAttribute('data-filtro');
      renderizarContenidos('lista-contenidos', 0, tipo === 'todos' ? '' : tipo);
    });
  });
}


// ── INICIALIZAR AL CARGAR LA PÁGINA ──────────────────────
document.addEventListener('DOMContentLoaded', async function() {
  if (document.getElementById('lista-contenidos')) {
    await renderizarContenidos('lista-contenidos');
    initFiltros();
  }

  if (document.getElementById('lista-autores')) {
    await renderizarAutores('lista-autores');
  }

  // Preview en inicio: solo 3 contenidos
  if (document.getElementById('contenidos-preview')) {
    await renderizarContenidos('contenidos-preview', 3);
  }
});
