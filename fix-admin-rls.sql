-- Políticas para que el Admin (usuario autenticado) tenga acceso total a todo
CREATE POLICY "Admin ALL Authors" ON authors TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Contents" ON contents TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Events" ON events TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Registrations" ON event_registrations TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Supporters" ON supporters TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin ALL Messages" ON contact_messages TO authenticated USING (true) WITH CHECK (true);

-- Añadimos la lectura pública para contenidos no publicados, si es que queremos que el admin los vea?
-- La política "Admin ALL Contents" ya lo cubre, porque USING (true) para authenticated anula el publicado=true de public.
