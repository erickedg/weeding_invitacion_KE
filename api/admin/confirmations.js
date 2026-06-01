export default async function handler(req, res) {
  const password = req.headers["x-admin-password"];
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  const [confirmsRes, guestsRes] = await Promise.all([
    fetch(
      `${supabaseUrl}/rest/v1/confirmations?select=guest_id,attending,attendees,message,confirmed_at&order=confirmed_at.desc`,
      { headers }
    ),
    fetch(
      `${supabaseUrl}/rest/v1/guests?select=id,name,allowed`,
      { headers }
    ),
  ]);

  if (!confirmsRes.ok || !guestsRes.ok) {
    return res.status(500).json({ error: "Error al obtener confirmaciones" });
  }

  const confirmations = await confirmsRes.json();
  const guests = await guestsRes.json();

  const guestMap = {};
  guests.forEach((g) => { guestMap[g.id] = g; });

  const result = confirmations.map((c) => ({
    ...c,
    guest: guestMap[c.guest_id] ?? { name: c.guest_id, allowed: 0 },
  }));

  return res.status(200).json(result);
}
