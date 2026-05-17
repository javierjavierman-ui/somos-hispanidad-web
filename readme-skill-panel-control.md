# 🖥️ Skill: Panel de Control con Supabase

> Skill reutilizable para generar un panel de administración completo en cualquier proyecto web con Supabase.
> Aprendida y extraída del desarrollo del **Panel de Control de Somos Hispanidad** (mayo 2026).

---

## ¿Qué hace esta skill?

Cuando la invocas, el asistente genera automáticamente un **panel de administración privado y funcional**, listo para integrarse en cualquier web que use Supabase como backend. No requiere frameworks: funciona con HTML, CSS y Vanilla JS.

---

## Ficheros que genera

| Fichero | Descripción |
|---|---|
| `src/admin/admin.html` | Estructura completa: login + dashboard con sidebar y paneles |
| `src/admin/admin.js` | Lógica: autenticación, CRUD, navegación, marketing |
| `supabase-schema.sql` | Esquema SQL idempotente con RLS y campo `published` |

---

## Funcionalidades incluidas

### 🔐 Autenticación
- Pantalla de login con Supabase Auth (email + contraseña)
- Dashboard oculto hasta que el usuario se autentica
- Cierre de sesión desde el topbar

### 📋 CRUD por tabla
- Tabla de registros con botones **Editar** y **Eliminar**
- Modal de formulario para crear o editar registros
- Campo **Visible/Oculto** (columna `published`) con badge visual
- Recarga automática de la tabla tras cada operación

### 👁️ Control de visibilidad
- Cada registro tiene un toggle de visibilidad (`published`)
- La web pública solo muestra registros con `published = true`
- Controlado a nivel de base de datos con Row Level Security (RLS)

### 📧 Módulo de Marketing (EmailJS)
- Redactor de campaña: asunto, cuerpo y firma
- **Paso 1:** Envío de email de prueba a dirección específica (obligatorio antes del masivo)
- **Paso 2:** Envío masivo a todos los simpatizantes activos con confirmación
- Protección anti-spam: pausa de 300ms entre envíos
- Indicador de estado del servicio EmailJS en tiempo real

---

## Cómo activar la skill

En cualquier conversación con el asistente, escribe:

> *"Ejecuta el skill Panel de Control para [nombre del proyecto]"*

El asistente te pedirá los siguientes datos:
1. Nombre del proyecto
2. URL y Anon Key de Supabase
3. Tablas que quieres gestionar (ej: contenidos, eventos, autores...)
4. Campos personalizados por tabla
5. ¿Incluir módulo de Marketing? → Si sí: Service ID, Template ID y Public Key de EmailJS

---

## Cómo se integra en una web existente

### 1. Añade los ficheros al proyecto
```
src/admin/admin.html
src/admin/admin.js
```

### 2. Ejecuta el SQL en Supabase
Ve a **SQL Editor** en tu proyecto de Supabase y ejecuta el contenido de `supabase-schema.sql`.

### 3. Asegúrate de que EmailJS está cargado antes del JS del panel
```html
<!-- En admin.html, justo antes de admin.js -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
  (function(){ emailjs.init({ publicKey: 'TU_PUBLIC_KEY' }); })();
</script>
<script src="admin.js"></script>
```

### 4. Verifica las rutas relativas
```html
<!-- En admin.html -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="../js/supabaseClient.js"></script>  <!-- Ajustar ruta si es necesario -->
```

---

## Errores frecuentes (y cómo evitarlos)

| Error | Solución |
|---|---|
| Tabla vacía en el panel | Verificar que existe `<tbody>` en el HTML y que el selector JS lo encuentra |
| EmailJS no funciona | Asegurarse de que el SDK se carga ANTES del script del panel |
| Registros no aparecen en la web pública | Ejecutar el SQL de RLS y comprobar que `published = true` |
| Modal no se abre al editar | Verificar que los botones tienen `data-id` y `data-table` correctos |

---

## Lecciones aprendidas (origen de la skill)

Esta skill fue creada a partir del desarrollo iterativo del panel de control de **Somos Hispanidad**, donde se resolvieron los siguientes problemas reales:

- Un `<tbody>` faltante impedía que el JS encontrara la tabla → **siempre verificar el DOM**
- Las políticas de RLS en Supabase deben incluir `DROP POLICY IF EXISTS` para ser idempotentes
- EmailJS debe inicializarse antes del script que lo usa
- El campo `published` debe estar en **todas** las tablas de contenido para controlar la visibilidad

---

## Ubicación de la skill en el sistema

```
~/.gemini/antigravity/knowledge/skill_panel_control/
├── metadata.json          # Metadatos de la skill
└── artifacts/
    └── panel-control.md   # Prompt y checklist completo de la skill
```

---

*Skill creada el 17 de mayo de 2026 · Versión 1.0*
