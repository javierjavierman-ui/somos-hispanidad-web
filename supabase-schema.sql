-- ══════════════════════════════════════════════════════════
-- SOMOS HISPANIDAD — Esquema de Base de Datos (Supabase)
-- Ejecutar en: SQL Editor de Supabase
-- ══════════════════════════════════════════════════════════

-- 1. AUTHORS (Autores)
CREATE TABLE IF NOT EXISTS authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cargo TEXT,
  bio TEXT,
  photo_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CONTENTS (Contenidos: artículos, vídeos, charlas)
CREATE TABLE IF NOT EXISTS contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_type TEXT DEFAULT 'escrito',
  summary TEXT,
  body TEXT,
  image_url TEXT,
  youtube_url TEXT,
  tags TEXT[],
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EVENTS (Eventos)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  event_type TEXT DEFAULT 'Evento',
  image_url TEXT,
  registration_open BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EVENT_REGISTRATIONS (Inscripciones a eventos)
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SUPPORTERS (Simpatizantes / suscriptores)
CREATE TABLE IF NOT EXISTS supporters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  consent BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- 6. CONTACT_MESSAGES (Mensajes de contacto)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ══════════════════════════════════════════════════════════
-- SEGURIDAD: Row Level Security (RLS)
-- ══════════════════════════════════════════════════════════

-- Activar RLS en todas las tablas
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Lectura pública: autores, contenidos publicados y eventos
CREATE POLICY "Lectura pública authors" ON authors
  FOR SELECT USING (true);

CREATE POLICY "Lectura pública contents" ON contents
  FOR SELECT USING (published = true);

CREATE POLICY "Lectura pública events" ON events
  FOR SELECT USING (true);

-- Inserción pública: formularios de la web
CREATE POLICY "Insertar inscripciones" ON event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Insertar supporters" ON supporters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Insertar mensajes" ON contact_messages
  FOR INSERT WITH CHECK (true);


-- ══════════════════════════════════════════════════════════
-- DATOS INICIALES (los que ya tienes en la web)
-- ══════════════════════════════════════════════════════════

-- Autores
INSERT INTO authors (name, bio) VALUES
  ('César Pérez Guevara', 'Especialista en la historia del derecho en la América colonial. Autor de «Justicia Real en la América Española».'),
  ('José J. Laorden', 'Investigador independiente especializado en el estudio de las alianzas entre pueblos indígenas y españoles durante la conquista.'),
  ('Francisco Massó', 'Analista y ensayista especializado en el estudio del revisionismo histórico y la narrativa política en Iberoamérica.'),
  ('Redacción Somos Hispanidad', 'Equipo de redacción formado por historiadores, periodistas y colaboradores comprometidos con la divulgación de la verdad histórica.');

-- Eventos
INSERT INTO events (title, description, event_date, location, event_type, registration_open) VALUES
  ('Visita guiada al Monasterio del Escorial con comida de hermandad',
   'Una jornada especial en uno de los monumentos más emblemáticos del imperio español. Incluye visita guiada y comida de hermandad con los socios.',
   '2026-06-20', 'Real Monasterio de San Lorenzo de El Escorial, Madrid', 'Visita Cultural', true),
  ('Conferencia: La España Olvidada — Legado jurídico en América',
   'Análisis profundo del sistema jurídico que España implantó en América, sus raíces romanas y su influencia en los ordenamientos modernos hispanoamericanos.',
   '2026-07-15', 'Madrid, España (sede por confirmar)', 'Conferencia', true),
  ('Ciclo Indígenas — El Papel en la Conquista: Perú y el Caribe',
   'Segunda entrega del ciclo sobre el papel activo de los pueblos originarios durante la conquista. Ponente: Dr. José J. Laorden.',
   '2026-09-10', 'Online · Plataforma Zoom', 'Charla Online', false),
  ('Presentación del Barómetro sobre la Hispanidad 2026',
   'Presentación pública de los resultados del Barómetro anual sobre la percepción de la Hispanidad en el mundo hispano. Día de la Hispanidad.',
   '2026-10-12', 'Madrid, España', 'Presentación', false);

-- Políticas para Admin (Acceso total)
CREATE POLICY "Admin ALL Authors" ON authors TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Contents" ON contents TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Events" ON events TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Registrations" ON event_registrations TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Supporters" ON supporters TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Messages" ON contact_messages TO authenticated USING (true) WITH CHECK (true);
