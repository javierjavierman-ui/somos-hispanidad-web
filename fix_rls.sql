DROP POLICY IF EXISTS "Insertar mensajes" ON contact_messages;
CREATE POLICY "Insertar mensajes" ON contact_messages FOR INSERT TO public WITH CHECK (true);
