export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Configuración del servidor incompleta" });
  }

  const { guest_id, attending, attendees, message } = req.body;

  if (!guest_id || attending === undefined) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/confirmations`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      guest_id,
      attending,
      attendees: attendees ?? [],
      message: message ?? null,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Error al guardar la confirmación" });
  }

  return res.status(200).json({ success: true });
}
