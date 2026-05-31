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

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  // Buscamos al invitado y su confirmación en paralelo
  const [guestRes, confirmRes] = await Promise.all([
    fetch(
      `${supabaseUrl}/rest/v1/guests?id=eq.${encodeURIComponent(id)}&select=name,allowed`,
      { headers }
    ),
    fetch(
      `${supabaseUrl}/rest/v1/confirmations?guest_id=eq.${encodeURIComponent(id)}&select=attending&limit=1`,
      { headers }
    ),
  ]);

  if (!guestRes.ok) {
    return res.status(500).json({ error: "Error al consultar la base de datos" });
  }

  const guests = await guestRes.json();

  if (!guests || guests.length === 0) {
    return res.status(404).json({ error: "Invitado no encontrado" });
  }

  const confirmations = confirmRes.ok ? await confirmRes.json() : [];
  const confirmed = confirmations.length > 0;

  return res.status(200).json({
    ...guests[0],
    confirmed,
  });
}
