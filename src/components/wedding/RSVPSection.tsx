import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

// Simulación de tu base de datos JSON (deberías importarla de tu archivo real)
// import guestsDb from "../lib/guests.json";
const guestsDb: Record<string, { name: string; allowed: number }> = {
  "A1B2": { name: "Erick y Acompañante", allowed: 2 },
  "X9Y8": { name: "Juan Pérez", allowed: 1 },
};

// Reemplaza esto con los links "Embed" de tus formularios de Tally
const TALLY_FORM_1 = "https://tally.so/r/Gx1Noe";
const TALLY_FORM_2 = "https://tally.so/r/yPyK08";

interface RSVPSectionProps {
  deadline: string;
  confirmUrl?: string; // Lo mantenemos por si acaso hay un link de respaldo
}

const RSVPSection = ({ deadline, confirmUrl }: RSVPSectionProps) => {
  const [guestInfo, setGuestInfo] = useState<{
    id: string;
    name: string;
    allowed: number;
  } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Al cargar la página, leemos la URL: tusitio.com/?id=A1B2
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id && guestsDb[id]) {
      setGuestInfo({
        id: id,
        name: guestsDb[id].name,
        allowed: guestsDb[id].allowed,
      });
    }
  }, []);

  const getTallyUrl = () => {
    if (!guestInfo) return confirmUrl || "";
    
    // Elegimos el formulario correcto según los pases
    const baseUrl = guestInfo.allowed === 2 ? TALLY_FORM_2 : TALLY_FORM_1;
    const url = new URL(baseUrl);
    
    // PREFILL: Aquí pasamos los datos a Tally. 
    // OJO: "nombre" e "id_invitado" deben coincidir con los "keys" en tu Tally
    url.searchParams.set("nombre", guestInfo.name);
    url.searchParams.set("id_invitado", guestInfo.id);
    url.searchParams.set("transparentBackground", "1"); // Hace que Tally se vea mejor embebido

    return url.toString();
  };

  const handleConfirmClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!guestInfo && !confirmUrl) {
      alert(
        "Parece que a tu enlace le falta tu código personal. Por favor, asegúrate de abrir el enlace exacto que te enviamos."
      );
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden" 
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-olive to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* ICONO DE CORAZÓN ANIMADO */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-sm text-wedding-olive"
        >
          <Heart size={28} fill="currentColor" strokeWidth={1} />
        </motion.div>

        <ScrollReveal width="100%">
          <h2 className="font-display text-xs md:text-sm tracking-[0.4em] uppercase mb-4 text-gray-500">
             Confirmar asistencia
          </h2>
          
          <h3 className="font-brittany text-5xl md:text-6xl mb-6 text-wedding-olive-dark">
            ¡Nos encantaría verte!
          </h3>

          <div className="h-px w-16 bg-wedding-olive-light mx-auto mb-10 opacity-60" />

          <p className="wedding-body text-sm md:text-lg leading-relaxed text-gray-700 mb-6 max-w-md mx-auto px-4">
            Será un encuentro íntimo con las personas que más queremos. Por favor, confírmanos antes del <span className="font-medium">{deadline}</span>.
          </p>

          {/* MENSAJE PERSONALIZADO SI SE DETECTA EL INVITADO */}
          {guestInfo && (
            <div className="mb-10 text-wedding-olive-dark font-medium">
              Hola <span className="font-bold">{guestInfo.name}</span>, tu invitación es válida para {guestInfo.allowed} {guestInfo.allowed === 1 ? "persona" : "personas"}.
            </div>
          )}
        </ScrollReveal>

        {/* BOTÓN DE CONFIRMACIÓN CON EFECTO DE PULSO */}
        <ScrollReveal width="100%" delay={0.3}>
          <div className="relative inline-block">
            {/* El "Anillo de pulso" exterior */}
            <motion.div
              className="absolute inset-0 rounded-sm bg-wedding-olive opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Cambiamos <a> por <button> para abrir el modal */}
            <motion.button
              onClick={handleConfirmClick}
              className="relative z-10 inline-block font-display text-xs tracking-[0.25em] uppercase px-12 py-5 rounded-sm shadow-xl transition-all border-none cursor-pointer"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "hsl(var(--wedding-olive-dark))",
                y: -3 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Confirmar aquí
            </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* MODAL DE TALLY */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl h-[85vh] bg-[#f9f9f9] rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
                <h3 className="font-display text-xs tracking-[0.2em] uppercase text-wedding-olive-dark">
                  Confirmación de Asistencia
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe de Tally */}
              <div className="flex-1 w-full relative">
                <iframe
                  src={getTallyUrl()}
                  className="absolute inset-0 w-full h-full border-none"
                  title="Formulario RSVP"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RSVPSection;
