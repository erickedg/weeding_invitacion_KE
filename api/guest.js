export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID requerido" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Configuración del servidor incompleta" });
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/guests?id=eq.${encodeURIComponent(id)}&select=name,allowed`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    return res.status(500).json({ error: "Error al consultar la base de datos" });
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Invitado no encontrado" });
  }

  return res.status(200).json(data[0]);
}
