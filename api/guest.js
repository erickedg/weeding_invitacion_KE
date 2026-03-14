// api/guest.js

// Esta lista SOLO vive en el servidor de Vercel. Nadie puede verla desde el navegador.
const guestsDb = {
  "A1B2": { name: "Erick y Acompañante", allowed: 2 },
  "X9Y8": { name: "Juan Pérez", allowed: 1 },
};

export default function handler(req, res) {
  // Obtenemos el ID de la URL que React nos va a mandar
  const { id } = req.query;

  const guest = guestsDb[id];

  if (guest) {
    // Si el código existe, devolvemos sus datos
    return res.status(200).json(guest);
  } else {
    // Si no existe, devolvemos un error
    return res.status(404).json({ error: "Invitado no encontrado" });
  }
}