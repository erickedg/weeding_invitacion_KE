import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Plus, Trash2, RefreshCw, LogOut, Users, ClipboardList, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Guest {
  id: string;
  name: string;
  allowed: number;
  confirmed: boolean;
  attending: boolean | null;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const getInviteLink = (id: string) =>
  `${window.location.origin}/?id=${id}`;

// ─── Pantalla de contraseña ───────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: (pwd: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/guests", {
      headers: { "x-admin-password": value },
    });

    setLoading(false);

    if (res.ok) {
      sessionStorage.setItem("admin_pwd", value);
      onSuccess(value);
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xs text-center"
      >
        <p className="font-display text-xs tracking-[0.35em] uppercase text-gray-400 mb-2">
          Katia &amp; Erick
        </p>
        <h1 className="font-brittany text-5xl mb-8" style={{ color: "hsl(var(--wedding-olive-dark))" }}>
          Panel de novios
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            className="w-full border-b border-wedding-olive/30 bg-transparent py-2 text-base font-semibold text-center text-gray-800 outline-none focus:border-wedding-olive transition-colors placeholder-gray-300"
          />
          {error && (
            <p className="text-red-400 text-xs">Contraseña incorrecta</p>
          )}
          <button
            type="submit"
            disabled={loading || !value}
            className="font-display text-sm font-bold tracking-[0.25em] uppercase py-3 px-8 rounded-sm disabled:opacity-40 transition-opacity cursor-pointer border-none"
            style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Tarjeta de invitado ──────────────────────────────────────────────────────

function GuestCard({
  guest,
  password,
  onDelete,
}: {
  guest: Guest;
  password: string;
  onDelete: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(getInviteLink(guest.id));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar a ${guest.name}?`)) return;
    setDeleting(true);
    await fetch("/api/admin/guests", {
      method: "DELETE",
      headers: { "x-admin-password": password, "Content-Type": "application/json" },
      body: JSON.stringify({ id: guest.id }),
    });
    onDelete(guest.id);
  };

  const statusColor = !guest.confirmed
    ? "bg-gray-100 text-gray-500"
    : guest.attending
    ? "bg-green-50 text-green-600"
    : "bg-red-50 text-red-400";

  const statusLabel = !guest.confirmed
    ? "Pendiente"
    : guest.attending
    ? "Confirmado"
    : "No asiste";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3"
    >
      {/* Info principal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-base font-bold text-gray-800 truncate">{guest.name}</p>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor}`}>
            {statusLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs font-bold text-gray-400">{guest.id}</span>
          <span className="text-[11px] text-gray-400 font-semibold">· {guest.allowed} {guest.allowed === 1 ? "pase" : "pases"}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={copyLink}
          title="Copiar link"
          className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg border transition-all cursor-pointer bg-transparent"
          style={{ borderColor: "hsl(var(--wedding-olive) / 0.3)", color: "hsl(var(--wedding-olive))" }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span className="hidden sm:inline">{copied ? "Copiado" : "Copiar"}</span>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          title="Eliminar"
          className="p-2 text-gray-300 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none disabled:opacity-40"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Formulario para agregar invitado ─────────────────────────────────────────

function AddGuestForm({
  password,
  onAdded,
}: {
  password: string;
  onAdded: (guest: Guest) => void;
}) {
  const [id, setId] = useState(generateId());
  const [name, setName] = useState("");
  const [allowed, setAllowed] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/guests", {
      method: "POST",
      headers: {
        "x-admin-password": password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, allowed }),
    });

    setLoading(false);

    if (res.ok) {
      const guest = await res.json();
      onAdded({ ...guest, confirmed: false, attending: null });
      setId(generateId());
      setName("");
      setAllowed("1");
    } else {
      const err = await res.json();
      setError(err.error || "Error al agregar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      {/* Fila superior: ID + Pases */}
      <div className="flex gap-3">
        {/* ID */}
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-display text-xs tracking-[0.25em] uppercase text-gray-600 font-bold">
            ID
          </label>
          <div className="flex gap-1 items-center">
            <input
              value={id}
              onChange={(e) => setId(e.target.value.toUpperCase())}
              maxLength={8}
              required
              className="w-full border-b border-gray-200 bg-transparent py-2 text-base font-mono font-bold text-gray-800 outline-none focus:border-wedding-olive transition-colors"
            />
            <button
              type="button"
              onClick={() => setId(generateId())}
              title="Generar ID"
              className="text-gray-400 hover:text-wedding-olive transition-colors cursor-pointer bg-transparent border-none p-1 flex-shrink-0"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Pases */}
        <div className="flex flex-col gap-1 w-28">
          <label className="font-display text-xs tracking-[0.25em] uppercase text-gray-600 font-bold">
            Pases
          </label>
          <select
            value={allowed}
            onChange={(e) => setAllowed(e.target.value)}
            className="border-b border-gray-200 bg-transparent py-2 text-base font-semibold text-gray-800 outline-none focus:border-wedding-olive transition-colors cursor-pointer"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="font-display text-xs tracking-[0.25em] uppercase text-gray-600 font-bold">
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Familia García"
          required
          className="border-b border-gray-200 bg-transparent py-2 text-base text-gray-700 outline-none focus:border-wedding-olive transition-colors placeholder-gray-300"
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 font-display text-sm font-bold tracking-[0.2em] uppercase px-5 py-3 rounded-lg border-none cursor-pointer disabled:opacity-40 w-full"
        style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
      >
        <Plus size={14} />
        {loading ? "Agregando..." : "Agregar invitado"}
      </button>
    </form>
  );
}

// ─── Tab: Confirmaciones ──────────────────────────────────────────────────────

interface Confirmation {
  guest_id: string;
  attending: boolean;
  attendees: { name: string }[];
  message: string | null;
  confirmed_at: string;
  guest: { name: string; allowed: number };
}

const countPeople = (list: Confirmation[]) =>
  list.filter((c) => c.attending).reduce((sum, c) => sum + (c.attendees?.length > 0 ? c.attendees.length : 1), 0);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function printChecklist(confirmations: Confirmation[]) {
  const attending = confirmations.filter((c) => c.attending);
  const totalPeople = countPeople(confirmations);

  const rows = attending.map((c) => {
    const guestName = esc(c.guest.name);
    const people =
      c.attendees && c.attendees.length > 0
        ? c.attendees.map((a) => `
            <tr>
              <td style="padding:6px 8px; font-size:13px; color:#444;">${esc(a.name)}</td>
              <td style="padding:6px 8px; text-align:center;">
                <span style="display:inline-block;width:16px;height:16px;border:1.5px solid #8a9a6a;border-radius:3px;"></span>
              </td>
            </tr>`).join("")
        : `<tr>
            <td style="padding:6px 8px; font-size:13px; color:#444;">${guestName}</td>
            <td style="padding:6px 8px; text-align:center;">
              <span style="display:inline-block;width:16px;height:16px;border:1.5px solid #8a9a6a;border-radius:3px;"></span>
            </td>
          </tr>`;

    return `
      <tr style="background:#f8f6f1;">
        <td colspan="2" style="padding:8px 8px 4px; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#5a6a3a;">
          ${guestName}${c.attendees?.length > 1 ? ` · ${c.attendees.length} personas` : ""}
        </td>
      </tr>
      ${people}
      <tr><td colspan="2" style="height:4px;"></td></tr>`;
  }).join("");

  const today = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Lista de confirmados · Katia &amp; Erick</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Cormorant Garamond', Georgia, serif; background:#fff; color:#333; padding:32px 40px; }
    .header { text-align:center; margin-bottom:28px; border-bottom:1px solid #d4c9a8; padding-bottom:20px; }
    .header h1 { font-size:32px; font-weight:400; color:#3d4a2a; letter-spacing:0.02em; }
    .header p { font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#888; margin-top:4px; }
    .meta { display:flex; justify-content:space-between; font-size:11px; color:#888; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:20px; }
    table { width:100%; border-collapse:collapse; }
    th { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#888; padding:6px 8px; border-bottom:1px solid #e5dcc8; text-align:left; }
    th:last-child { text-align:center; width:60px; }
    tr + tr { border-top:1px solid #f0ebe0; }
    @media print { body { padding:20px 28px; } }
  </style>
</head>
<body>
  <div class="header">
    <p>09 · 10 · 2026</p>
    <h1>Katia &amp; Erick</h1>
    <p style="margin-top:8px;">Lista de confirmados · ${totalPeople} personas</p>
  </div>
  <div class="meta">
    <span>Wedding planner checklist</span>
    <span>${today}</span>
  </div>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>&#10003;</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank");
  if (w) setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

function ConfirmationsTab({ password }: { password: string }) {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConfirmations = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/confirmations", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) setConfirmations(await res.json());
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchConfirmations(); }, [fetchConfirmations]);

  const attending    = confirmations.filter((c) => c.attending);
  const notAttending = confirmations.filter((c) => !c.attending);
  const totalPeople  = countPeople(confirmations);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  if (loading) {
    return <div className="py-16 text-center text-gray-400 text-sm font-semibold">Cargando...</div>;
  }

  if (confirmations.length === 0) {
    return <div className="py-16 text-center text-gray-400 text-sm font-semibold">Sin confirmaciones todavía</div>;
  }

  return (
    <div className="space-y-3">
      {/* Stats + botón imprimir */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-green-600">{totalPeople}</p>
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gray-600 font-bold mt-1">Personas</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-red-400">{notAttending.length}</p>
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gray-600 font-bold mt-1">No asisten</p>
          </div>
        </div>
        {attending.length > 0 && (
          <button
            onClick={() => printChecklist(confirmations)}
            title="Imprimir lista para wedding planner"
            className="flex flex-col items-center gap-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 cursor-pointer hover:border-wedding-olive/40 transition-colors"
            style={{ color: "hsl(var(--wedding-olive))" }}
          >
            <Printer size={20} />
            <span className="font-display text-[9px] tracking-[0.15em] uppercase font-bold text-gray-500 whitespace-nowrap">Imprimir</span>
          </button>
        )}
      </div>

      {/* Lista */}
      <AnimatePresence>
        {confirmations.map((c) => (
          <motion.div
            key={c.guest_id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Header de la tarjeta */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <p className="text-base font-bold text-gray-800">{c.guest.name}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{formatDate(c.confirmed_at)}</p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  c.attending ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"
                }`}
              >
                {c.attending ? "Asiste" : "No asiste"}
              </span>
            </div>

            {/* Asistentes */}
            {c.attending && c.attendees && c.attendees.length > 0 && (
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gray-500 font-bold mb-2">
                  Asistentes ({c.attendees.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.attendees.map((a, i) => (
                    <span key={i} className="text-sm font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Mensaje opcional */}
            {c.message && (
              <div className="px-4 py-3">
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gray-500 font-bold mb-1">
                  Mensaje
                </p>
                <p className="text-sm font-medium text-gray-700 italic">"{c.message}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Panel principal ──────────────────────────────────────────────────────────

function AdminPanel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"registro" | "confirmaciones">("registro");
  const [refreshKey, setRefreshKey] = useState(0);
  const [confirmedPeople, setConfirmedPeople] = useState(0);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    const [guestsRes, confirmsRes] = await Promise.all([
      fetch("/api/admin/guests",         { headers: { "x-admin-password": password } }),
      fetch("/api/admin/confirmations",  { headers: { "x-admin-password": password } }),
    ]);
    if (guestsRes.ok) setGuests(await guestsRes.json());
    if (confirmsRes.ok) {
      const confirms: Confirmation[] = await confirmsRes.json();
      setConfirmedPeople(
        confirms
          .filter((c) => c.attending)
          .reduce((sum, c) => sum + (c.attendees?.length > 0 ? c.attendees.length : 1), 0)
      );
    }
    setLoading(false);
  }, [password]);

  useEffect(() => { fetchGuests(); }, [fetchGuests]);

  const handleAdded = (guest: Guest) => setGuests((prev) => [...prev, guest]);
  const handleDelete = (id: string) => setGuests((prev) => prev.filter((g) => g.id !== id));

  const totalPeople = guests.reduce((sum, g) => sum + g.allowed, 0);
  const declined  = guests.filter((g) => g.confirmed && !g.attending).length;
  const pending   = guests.filter((g) => !g.confirmed).length;

  const handleRefresh = () => {
    if (activeTab === "registro") fetchGuests();
    else setRefreshKey((k) => k + 1);
  };

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-display text-xs tracking-[0.35em] uppercase text-gray-400 mb-1">
              Panel de administración
            </p>
            <h1 className="font-brittany text-4xl" style={{ color: "hsl(var(--wedding-olive-dark))" }}>
              Katia &amp; Erick
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              title="Actualizar"
              className="p-2 text-gray-400 hover:text-wedding-olive transition-colors cursor-pointer bg-transparent border-none"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={onLogout}
              title="Salir"
              className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Stats — siempre visibles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { label: "Invitados",   value: totalPeople,   color: "text-wedding-olive-dark" },
            { label: "Confirmados", value: confirmedPeople, color: "text-green-600"          },
            { label: "No asisten",  value: declined,       color: "text-red-400"            },
            { label: "Pendientes",  value: pending,        color: "text-gray-400"           },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl py-3 px-2 text-center shadow-sm border border-gray-100">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="font-display text-[10px] tracking-[0.1em] uppercase text-gray-500 font-bold mt-1 leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {(["registro", "confirmaciones"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-display text-xs tracking-[0.2em] uppercase font-bold transition-all cursor-pointer border-none ${
                activeTab === tab
                  ? "text-white shadow-sm"
                  : "bg-transparent text-gray-400 hover:text-gray-600"
              }`}
              style={activeTab === tab ? { backgroundColor: "hsl(var(--primary))" } : {}}
            >
              {tab === "registro" ? <Users size={13} /> : <ClipboardList size={13} />}
              {tab === "registro" ? "Registro" : "Confirmaciones"}
            </button>
          ))}
        </div>

        {/* Contenido por tab */}
        {activeTab === "registro" && (
          <>
            {/* Formulario agregar */}
            <div className="mb-6">
              <AddGuestForm password={password} onAdded={handleAdded} />
            </div>

            {/* Lista de invitados */}
            <div>
              <p className="font-display text-xs tracking-[0.3em] uppercase text-gray-500 font-bold mb-3 px-1">
                Invitados · {guests.length} en total
              </p>

              {loading ? (
                <div className="py-16 text-center text-gray-300 text-sm">Cargando...</div>
              ) : guests.length === 0 ? (
                <div className="py-16 text-center text-gray-300 text-sm">Sin invitados todavía</div>
              ) : (
                <div className="flex flex-col gap-2">
                  <AnimatePresence>
                    {guests.map((g) => (
                      <GuestCard
                        key={g.id}
                        guest={g}
                        password={password}
                        onDelete={handleDelete}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "confirmaciones" && (
          <ConfirmationsTab key={refreshKey} password={password} />
        )}
      </div>
    </div>
  );
}

// ─── Página raíz ──────────────────────────────────────────────────────────────

const Novios = () => {
  const [password, setPassword] = useState<string | null>(
    () => sessionStorage.getItem("admin_pwd")
  );

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pwd");
    setPassword(null);
  };

  if (!password) {
    return <PasswordGate onSuccess={setPassword} />;
  }

  return <AdminPanel password={password} onLogout={handleLogout} />;
};

export default Novios;
