/*
 * =====================================================
 * SOMOS HISPANIDAD — JavaScript del Panel de Admin
 * Archivo: src/admin/admin.js
 *
 * Gestiona la navegación entre paneles del admin.
 * En el futuro incluirá autenticación con Supabase.
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── NAVEGACIÓN ENTRE PANELES ──────────────────────
  const navLinks = document.querySelectorAll('.admin-nav-link[data-panel]');
  const panels   = document.querySelectorAll('.admin-panel');
  const panelTitle = document.getElementById('panel-title');

  const titulos = {
    eventos: 'Gestión de Eventos',
    contenidos: 'Gestión de Contenidos',
    autores: 'Gestión de Autores',
    simpatizantes: 'Simpatizantes',
    mensajes: 'Mensajes Recibidos'
  };

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const panelId = this.getAttribute('data-panel');

      // Actualizar clases activas del menú
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // Mostrar el panel correspondiente
      panels.forEach(p => p.classList.remove('active'));
      const panelEl = document.getElementById('panel-' + panelId);
      if (panelEl) panelEl.classList.add('active');

      // Actualizar el título del topbar
      if (panelTitle && titulos[panelId]) {
        panelTitle.textContent = titulos[panelId];
      }
    });
  });


  // ── BOTONES DE ACCIÓN (simulados) ────────────────
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('admin-btn-sm') && e.target.textContent.trim() === 'Eliminar') {
      if (!confirm('¿Seguro que deseas eliminar este elemento?')) return;
      const fila = e.target.closest('tr');
      if (fila) fila.style.opacity = '0.4';
      // En el futuro: llamada a Supabase para eliminar
    }
  });


  // ── FUTURO: AUTENTICACIÓN CON SUPABASE ───────────
  /*
  async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
      window.location.href = 'login.html';
    }
  }
  checkAuth();
  */

});
