/*
 * =====================================================
 * SOMOS HISPANIDAD — JavaScript del Panel de Admin
 * Archivo: src/admin/admin.js
 *
 * Gestiona la navegación entre paneles del admin.
 * En el futuro incluirá autenticación con Supabase.
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', async function () {
  
  // Referencias UI Auth
  const loginWrapper = document.getElementById('login-wrapper');
  const dashboardWrapper = document.getElementById('dashboard-wrapper');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');
  const btnLogout = document.querySelector('.admin-topbar-actions .admin-btn-outline');
  const adminUserSpan = document.querySelector('.admin-user');

  // ── AUTENTICACIÓN CON SUPABASE ─────────────────────
  async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      // Mostrar dashboard
      loginWrapper.style.display = 'none';
      dashboardWrapper.style.display = 'flex';
      adminUserSpan.textContent = session.user.email;
      // Cargar datos
      loadAllData();
    } else {
      // Mostrar login
      loginWrapper.style.display = 'flex';
      dashboardWrapper.style.display = 'none';
    }
  }

  // Listener del formulario de login
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      loginError.style.display = 'none';

      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      
      if (error) {
        loginError.textContent = error.message === 'Invalid login credentials' ? 'Credenciales incorrectas' : error.message;
        loginError.style.display = 'block';
      } else {
        await checkAuth();
      }
    });
  }

  // Listener para cerrar sesión
  if (btnLogout) {
    btnLogout.addEventListener('click', async function(e) {
      e.preventDefault();
      await supabaseClient.auth.signOut();
      await checkAuth();
    });
  }

  // Verificar estado inicial
  await checkAuth();

  // Escuchar cambios de auth
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
      checkAuth();
    }
  });

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


  // ── CARGA DE DATOS DESDE SUPABASE ──────────────────
  async function loadAllData() {
    await Promise.all([
      loadEvents(),
      loadContents(),
      loadAuthors(),
      loadSupporters(),
      loadMessages()
    ]);
  }

  async function loadEvents() {
    const { data, error } = await supabaseClient.from('events').select('*').order('event_date', { ascending: false });
    const tbody = document.querySelector('#panel-eventos tbody');
    if (error || !data) return tbody.innerHTML = '<tr><td colspan="6">Error cargando eventos</td></tr>';
    if (data.length === 0) return tbody.innerHTML = '<tr><td colspan="6">No hay eventos</td></tr>';
    
    tbody.innerHTML = data.map(ev => {
      const d = new Date(ev.event_date).toLocaleDateString('es-ES');
      const badge = ev.registration_open ? '<span class="admin-badge green">Abierto</span>' : '<span class="admin-badge yellow">Cerrado</span>';
      return `<tr><td>${d}</td><td>${ev.title}</td><td>${ev.event_type}</td><td>${ev.location}</td><td>${badge}</td><td><button class="admin-btn-sm" data-id="${ev.id}">Editar</button> <button class="admin-btn-sm red delete-btn" data-table="events" data-id="${ev.id}">Eliminar</button></td></tr>`;
    }).join('');
  }

  async function loadContents() {
    const { data, error } = await supabaseClient.from('contents').select('*, authors(name)').order('created_at', { ascending: false });
    const tbody = document.querySelector('#panel-contenidos tbody');
    
    if (error) {
      console.error('Error Supabase (Contents):', error);
      return tbody.innerHTML = `<tr><td colspan="5" style="color:red;">Error: ${error.message} (Código: ${error.code})</td></tr>`;
    }
    
    if (!data || data.length === 0) {
      return tbody.innerHTML = '<tr><td colspan="5">No se encontraron contenidos. Asegúrate de que existan en la tabla "contents".</td></tr>';
    }
    
    tbody.innerHTML = data.map(c => {
      const d = new Date(c.created_at).toLocaleDateString('es-ES');
      const autor = c.authors?.name || '-';
      return `<tr><td>${d}</td><td>${c.title}</td><td>${c.content_type}</td><td>${autor}</td><td><button class="admin-btn-sm" data-id="${c.id}">Editar</button> <button class="admin-btn-sm red delete-btn" data-table="contents" data-id="${c.id}">Eliminar</button></td></tr>`;
    }).join('');
  }

  async function loadAuthors() {
    const { data, error } = await supabaseClient.from('authors').select('*').order('name');
    const tbody = document.querySelector('#panel-autores tbody');
    if (error || !data) return tbody.innerHTML = '<tr><td colspan="4">Error cargando autores</td></tr>';
    if (data.length === 0) return tbody.innerHTML = '<tr><td colspan="4">No hay autores</td></tr>';
    
    tbody.innerHTML = data.map(a => {
      return `<tr><td>${a.name}</td><td colspan="2">${a.bio?.substring(0,50)}...</td><td><button class="admin-btn-sm" data-id="${a.id}">Editar</button> <button class="admin-btn-sm red delete-btn" data-table="authors" data-id="${a.id}">Eliminar</button></td></tr>`;
    }).join('');
  }

  async function loadSupporters() {
    const { data, error } = await supabaseClient.from('event_registrations').select('*, events(title)').order('created_at', { ascending: false });
    const tbody = document.querySelector('#panel-simpatizantes tbody');
    if (error || !data) return tbody.innerHTML = '<tr><td colspan="4">Error cargando inscripciones</td></tr>';
    if (data.length === 0) return tbody.innerHTML = '<tr><td colspan="4">No hay inscritos</td></tr>';
    
    tbody.innerHTML = data.map(s => {
      const d = new Date(s.created_at).toLocaleDateString('es-ES');
      return `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.events?.title || '-'}</td><td>${d}</td></tr>`;
    }).join('');
  }

  async function loadMessages() {
    const { data, error } = await supabaseClient.from('contact_messages').select('*').order('created_at', { ascending: false });
    const tbody = document.querySelector('#panel-mensajes tbody');
    if (error || !data) return tbody.innerHTML = '<tr><td colspan="6">Error cargando mensajes</td></tr>';
    if (data.length === 0) return tbody.innerHTML = '<tr><td colspan="6">No hay mensajes</td></tr>';
    
    tbody.innerHTML = data.map(m => {
      const d = new Date(m.created_at).toLocaleDateString('es-ES');
      return `<tr><td>${d}</td><td>${m.name}</td><td>${m.email}</td><td>${m.subject || '-'}</td><td><span class="admin-badge yellow">Nuevo</span></td><td><button class="admin-btn-sm delete-btn" data-table="contact_messages" data-id="${m.id}">Borrar</button></td></tr>`;
    }).join('');
  }

  // ── ELIMINAR ELEMENTOS ───────────────────────────
  document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('delete-btn')) {
      if (!confirm('¿Seguro que deseas eliminar este elemento de forma permanente?')) return;
      const table = e.target.getAttribute('data-table');
      const id = e.target.getAttribute('data-id');
      const fila = e.target.closest('tr');
      if (fila) fila.style.opacity = '0.4';
      
      const { error } = await supabaseClient.from(table).delete().eq('id', id);
      if (error) {
        alert('Error al eliminar: ' + error.message);
        if (fila) fila.style.opacity = '1';
      } else {
        if (fila) fila.remove();
      }
    }
  });

  // ── MODAL NUEVO CONTENIDO ──────────────────────────
  const btnNuevoContenido = document.getElementById('btn-nuevo-contenido');
  const modalContenido = document.getElementById('modal-contenido');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal-contenido');
  const formContenido = document.getElementById('form-nuevo-contenido');

  if (btnNuevoContenido && modalContenido) {
    btnNuevoContenido.addEventListener('click', async () => {
      // Cargar autores en el select
      const selectAutor = document.getElementById('cont-autor');
      const { data } = await supabaseClient.from('authors').select('id, name').order('name');
      if (data) {
        selectAutor.innerHTML = '<option value="">Selecciona un autor (opcional)</option>' + 
          data.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
      }
      modalContenido.style.display = 'flex';
    });

    btnCerrarModal.addEventListener('click', () => {
      modalContenido.style.display = 'none';
      formContenido.reset();
    });

    formContenido.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('cont-titulo').value;
      const content_type = document.getElementById('cont-tipo').value;
      const author_id = document.getElementById('cont-autor').value || null;
      const youtube_url = document.getElementById('cont-url').value;
      const summary = document.getElementById('cont-resumen').value;
      const published = document.getElementById('cont-publicado').checked;

      const btnSubmit = formContenido.querySelector('button[type="submit"]');
      btnSubmit.textContent = 'Guardando...';
      btnSubmit.disabled = true;

      const { error } = await supabaseClient.from('contents').insert([{
        title, content_type, author_id, youtube_url, summary, published
      }]);

      btnSubmit.textContent = 'Guardar Contenido';
      btnSubmit.disabled = false;

      if (error) {
        alert('Error guardando contenido: ' + error.message);
      } else {
        modalContenido.style.display = 'none';
        formContenido.reset();
        loadContents(); // Recargar la tabla
      }
    });
  }

});
