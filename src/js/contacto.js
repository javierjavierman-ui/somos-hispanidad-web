/*
 * =====================================================
 * SOMOS HISPANIDAD — Formulario de Contacto
 * Archivo: src/js/contacto.js
 *
 * Gestiona el formulario de contacto.
 * Conectado a Supabase: guarda mensajes en la tabla "mensajes".
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form-contacto');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre  = document.getElementById('contacto-nombre')?.value.trim();
    const email   = document.getElementById('contacto-email')?.value.trim();
    const asunto  = document.getElementById('contacto-asunto')?.value.trim();
    const mensaje = document.getElementById('contacto-mensaje')?.value.trim();

    // Validación básica
    if (!nombre || !email || !mensaje) {
      mostrarError('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    if (!validarEmail(email)) {
      mostrarError('El correo electrónico no tiene un formato válido.');
      return;
    }

    // Deshabilitar botón mientras se envía
    const btnSubmit = form.querySelector('button[type="submit"]');
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Enviando...';
    }

    // Enviar a Supabase
    const enviado = await guardarMensaje(nombre, email, asunto || 'Sin asunto', mensaje);

    if (enviado) {
      mostrarExito();
    } else {
      mostrarError('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a contacto@somoshispanidad.es.');
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar mensaje';
      }
    }
  });


  // ── Mostrar mensaje de éxito ──────────────────────────
  function mostrarExito() {
    form.style.display = 'none';
    const exito = document.getElementById('contacto-exito');
    if (exito) exito.style.display = 'block';
  }

  // ── Mostrar mensaje de error ──────────────────────────
  function mostrarError(msg) {
    let errorEl = document.getElementById('contacto-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.id = 'contacto-error';
      errorEl.className = 'supabase-notice';
      form.prepend(errorEl);
    }
    errorEl.innerHTML = `<strong>⚠ Atención:</strong> ${msg}`;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Validar formato de email ──────────────────────────
  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
