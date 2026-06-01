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
    "Content-Type": "application/json",
  };

  // ── GET: listar todos los invitados con su estado de confirmación ────────────
  if (req.method === "GET") {
    const [guestsRes, confirmsRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/guests?select=id,name,allowed,created_at&order=created_at.asc`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/confirmations?select=guest_id,attending`, { headers }),
    ]);

    if (!guestsRes.ok) {
      return res.status(500).json({ error: "Error al obtener invitados" });
    }

    const guests = await guestsRes.json();
    const confirmations = confirmsRes.ok ? await confirmsRes.json() : [];

    const confirmMap = {};
    confirmations.forEach((c) => { confirmMap[c.guest_id] = c.attending; });

    return res.status(200).json(
      guests.map((g) => ({
        ...g,
        confirmed: g.id in confirmMap,
        attending: confirmMap[g.id] ?? null,
      }))
    );
  }

  // ── POST: agregar invitado ────────────────────────────────────────────────────
  if (req.method === "POST") {
    const { id, name, allowed } = req.body;

    if (!id || !name || !allowed) {
      return res.status(400).json({ error: "Faltan campos: id, name, allowed" });
    }

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/guests`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({ id: id.toUpperCase(), name, allowed: Number(allowed) }),
    });

    if (!insertRes.ok) {
      const err = await insertRes.json();
      return res.status(400).json({ error: err.message || "Error al agregar invitado" });
    }

    const data = await insertRes.json();
    return res.status(201).json(data[0]);
  }

  // ── DELETE: eliminar invitado ─────────────────────────────────────────────────
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID requerido" });

    await fetch(`${supabaseUrl}/rest/v1/guests?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
