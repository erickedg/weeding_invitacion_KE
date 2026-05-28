import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Check, Loader2 } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

interface GuestInfo {
  id: string;
  name: string;
  allowed: number;
}

interface RSVPSectionProps {
  deadline: string;
  confirmUrl?: string;
}

const stepAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

// ─── Pantalla de éxito ────────────────────────────────────────────────────────

function SuccessStep({
  guestInfo,
  onClose,
}: {
  guestInfo: GuestInfo | null;
  onClose: () => void;
}) {
  return (
    <motion.div {...stepAnim} className="p-8 sm:p-10 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ backgroundColor: "hsl(var(--wedding-olive) / 0.12)" }}
      >
        <Check size={26} className="text-wedding-olive" strokeWidth={2.5} />
      </motion.div>

      <h2 className="font-brittany text-5xl sm:text-6xl text-wedding-dark mb-2">
        ¡Confirmado!
      </h2>
      <div className="h-px w-10 bg-wedding-olive/30 mx-auto my-5" />
      {guestInfo && (
        <p className="text-gray-700 text-sm font-semibold mb-3">
          Gracias,{" "}
          <span className="font-bold text-wedding-dark">{guestInfo.name}</span>.
        </p>
      )}
      <p className="text-gray-700 text-base font-semibold leading-relaxed mb-1">
        ¡Nos vemos el <span className="font-bold">9 de octubre</span>!
      </p>
      <p className="text-gray-600 text-sm font-medium mb-7">
        No podemos esperar para celebrar contigo.
      </p>
      <p className="font-brittany text-2xl text-wedding-olive mb-9">
        — Katia &amp; Erick ♡
      </p>
      <button
        onClick={onClose}
        className="font-display text-[10px] tracking-[0.25em] uppercase py-3 px-8 border border-wedding-olive/30 text-wedding-olive hover:bg-wedding-olive hover:text-white transition-all rounded-sm cursor-pointer bg-transparent"
      >
        Cerrar
      </button>
    </motion.div>
  );
}

// ─── Pantalla de rechazo ──────────────────────────────────────────────────────

function DeclinedStep({ onClose }: { onClose: () => void }) {
  return (
    <motion.div {...stepAnim} className="p-8 sm:p-10 text-center">
      <Heart
        size={26}
        className="mx-auto mb-5"
        fill="currentColor"
        style={{ color: "hsl(var(--wedding-olive) / 0.35)" }}
      />
      <h2 className="font-brittany text-5xl sm:text-6xl text-wedding-dark mb-2">
        Lo sentiremos...
      </h2>
      <div className="h-px w-10 bg-wedding-olive/30 mx-auto my-5" />
      <p className="text-gray-700 text-base font-semibold leading-relaxed mb-1">
        Gracias por avisarnos. ¡Te extrañaremos!
      </p>
      <p className="text-gray-600 text-sm font-medium mb-7">
        Siempre serás parte de nuestra historia.
      </p>
      <p className="font-brittany text-2xl text-wedding-olive mb-9">
        — Katia &amp; Erick
      </p>
      <button
        onClick={onClose}
        className="font-display text-[10px] tracking-[0.25em] uppercase py-3 px-8 border border-wedding-olive/30 text-wedding-olive hover:bg-wedding-olive hover:text-white transition-all rounded-sm cursor-pointer bg-transparent"
      >
        Cerrar
      </button>
    </motion.div>
  );
}

// ─── Formulario para 1 o 2 personas ──────────────────────────────────────────

function SimpleRSVP({
  guestInfo,
  onConfirm,
  onDecline,
  isSubmitting,
}: {
  guestInfo: GuestInfo | null;
  onConfirm: (message: string) => void;
  onDecline: () => void;
  isSubmitting: boolean;
}) {
  const [message, setMessage] = useState("");
  const plural = (guestInfo?.allowed ?? 1) > 1;

  return (
    <motion.div {...stepAnim} className="p-7 sm:p-9">
      <div className="text-center mb-7">
        <p className="font-display text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-4">
          Katia &amp; Erick · 09.10.2026
        </p>
        <h2 className="font-brittany text-5xl sm:text-6xl text-wedding-dark mb-2">
          ¡Nos encantaría <br className="hidden sm:block" />verte{plural ? "s" : ""} ahí!
        </h2>
        <div className="h-px w-10 bg-wedding-olive/30 mx-auto my-5" />
        {guestInfo && (
          <p className="text-gray-700 text-base font-semibold leading-relaxed">
            Hola{" "}
            <span className="font-semibold text-wedding-dark">{guestInfo.name}</span>,
            tu invitación es válida para{" "}
            <span className="font-semibold">{guestInfo.allowed}</span>{" "}
            {plural ? "personas" : "persona"}.
          </p>
        )}
      </div>

      <div className="mb-7">
        <label className="block font-display text-[11px] tracking-[0.25em] uppercase text-gray-600 font-bold mb-1.5">
          Mensaje para los novios (opcional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Un mensaje especial para nosotros..."
          rows={2}
          className="w-full bg-transparent border-b border-wedding-olive/25 focus:border-wedding-olive outline-none py-2 text-sm text-gray-700 placeholder-gray-300 transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          onClick={() => onConfirm(message)}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-display text-xs tracking-[0.2em] uppercase py-4 px-6 rounded-sm border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Confirmando...
            </>
          ) : (
            <>Sí, {plural ? "asistiremos" : "asistiré"} ♡</>
          )}
        </motion.button>

        <button
          onClick={onDecline}
          disabled={isSubmitting}
          className="font-display text-xs tracking-[0.2em] uppercase py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors cursor-pointer bg-transparent border-none disabled:opacity-40"
        >
          No podré {plural ? "asistir" : "ir"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Formulario para 5 personas ───────────────────────────────────────────────

function FamilyRSVP({
  guestInfo,
  onConfirm,
  onDecline,
  isSubmitting,
  error,
}: {
  guestInfo: GuestInfo | null;
  onConfirm: (names: string[], message: string) => void;
  onDecline: () => void;
  isSubmitting: boolean;
  error: string | null;
}) {
  const allowed = guestInfo?.allowed ?? 5;
  const [count, setCount] = useState<number | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleCountChange = (n: number) => {
    setCount(n);
    setNames(Array(n).fill(""));
  };

  const handleNameChange = (i: number, value: string) => {
    setNames((prev) => {
      const updated = [...prev];
      updated[i] = value;
      return updated;
    });
  };

  return (
    <motion.div {...stepAnim} className="p-7 sm:p-9">
      <div className="text-center mb-7">
        <p className="font-display text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-4">
          Katia &amp; Erick · 09.10.2026
        </p>
        <h2 className="font-brittany text-5xl sm:text-6xl text-wedding-dark mb-2">
          ¡Nos encantaría verlos!
        </h2>
        <div className="h-px w-10 bg-wedding-olive/30 mx-auto my-5" />
        {guestInfo && (
          <p className="text-gray-700 text-base font-semibold leading-relaxed">
            Hola{" "}
            <span className="font-semibold text-wedding-dark">{guestInfo.name}</span>,
            su invitación es válida para {" "}
            <span className="font-semibold">{allowed}</span> personas.
          </p>
        )}
      </div>

      {/* Selector de cuántos asisten */}
      <div className="mb-7">
        <p className="font-display text-[11px] tracking-[0.25em] uppercase text-gray-600 font-bold mb-3 text-center">
          ¿Cuántas personas asistirán?
        </p>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: allowed }, (_, i) => i + 1).map((n) => (
            <motion.button
              key={n}
              onClick={() => handleCountChange(n)}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-sm font-display text-sm transition-all cursor-pointer border"
              style={
                count === n
                  ? {
                      backgroundColor: "hsl(var(--primary))",
                      borderColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: "hsl(var(--wedding-olive) / 0.25)",
                      color: "hsl(var(--wedding-olive))",
                    }
              }
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Campos de nombre — aparecen según la selección */}
      <AnimatePresence>
        {count !== null && count > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 mb-6">
              {names.map((name, i) => (
                <div key={i}>
                  <label className="block font-display text-[11px] tracking-[0.25em] uppercase text-gray-600 font-bold mb-1.5">
                    Persona {i + 1}{i === 0 ? " *" : ""}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-transparent border-b border-wedding-olive/25 focus:border-wedding-olive outline-none py-2 text-sm text-gray-700 placeholder-gray-300 transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje opcional */}
      <div className="mb-6">
        <label className="block font-display text-[11px] tracking-[0.25em] uppercase text-gray-600 font-bold mb-1.5">
          Mensaje para los novios (opcional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Un mensaje especial para nosotros..."
          rows={2}
          className="w-full bg-transparent border-b border-wedding-olive/25 focus:border-wedding-olive outline-none py-2 text-sm text-gray-700 placeholder-gray-300 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs text-center mb-4">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        <motion.button
          onClick={() => onConfirm(names, message)}
          disabled={isSubmitting || count === null}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-display text-xs tracking-[0.2em] uppercase py-4 px-6 rounded-sm border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar asistencia ♡"
          )}
        </motion.button>

        <button
          onClick={onDecline}
          disabled={isSubmitting}
          className="font-display text-xs tracking-[0.2em] uppercase py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors cursor-pointer bg-transparent border-none disabled:opacity-40"
        >
          No podremos asistir
        </button>
      </div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

const RSVPSection = ({ deadline, confirmUrl }: RSVPSectionProps) => {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<"main" | "success" | "declined">("main");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (!id) return;

      try {
        const response = await fetch(`/api/guest?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setGuestInfo({ id, name: data.name, allowed: data.allowed });
        }
      } catch (error) {
        console.error("Error validando el invitado", error);
      }
    };

    fetchGuest();
  }, []);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!guestInfo && !confirmUrl) {
      alert(
        "Parece que a tu enlace le falta tu código personal. Por favor, asegúrate de abrir el enlace exacto que te enviamos."
      );
      return;
    }
    setStep("main");
    setSubmitError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = async (names: string[], message: string) => {
    if (!guestInfo) return;

    // Para grupos (allowed >= 2) validamos que haya al menos un nombre
    if (guestInfo.allowed >= 2) {
      const validNames = names.filter((n) => n.trim());
      if (validNames.length === 0) {
        setSubmitError("Por favor ingresa al menos un nombre.");
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const validNames = names.filter((n) => n.trim());
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: guestInfo.id,
          attending: true,
          attendees: validNames.map((name) => ({ name })),
          message: message.trim() || null,
        }),
      });

      if (res.ok) {
        setStep("success");
      } else {
        setSubmitError("Ocurrió un error. Por favor intenta de nuevo.");
      }
    } catch {
      setSubmitError("Ocurrió un error. Por favor intenta de nuevo.");
    }

    setIsSubmitting(false);
  };

  const handleDecline = async () => {
    if (!guestInfo) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: guestInfo.id,
          attending: false,
          attendees: [],
          message: null,
        }),
      });
    } catch {
      // mostrar declined aunque falle la API
    }
    setIsSubmitting(false);
    setStep("declined");
  };

  // Para allowed=1 y 2: onConfirm recibe solo el mensaje
  const handleSimpleConfirm = (message: string) => {
    handleConfirm([], message);
  };

  const isFamily = (guestInfo?.allowed ?? 0) >= 2;

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-olive to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
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
          <h3 className="font-brittany text-5xl md:text-6xl mb-6 text-wedding-dark">
            ¡Nos encantaría verte!
          </h3>
          <div className="h-px w-16 bg-wedding-olive-light mx-auto mb-10 opacity-60" />
          <p className="wedding-body text-sm md:text-lg leading-relaxed text-gray-700 mb-6 max-w-md mx-auto px-4">
            Será un encuentro íntimo con las personas que más queremos. Por
            favor, confírmanos antes del{" "}
            <span className="font-medium">{deadline}</span>.
          </p>
          {guestInfo && (
            <div className="mb-10 text-wedding-dark font-medium text-center">
              Hola <span className="font-bold">{guestInfo.name}</span>, tu
              invitación es válida para {guestInfo.allowed}{" "}
              {guestInfo.allowed === 1 ? "persona" : "personas"}.
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal width="100%" delay={0.3}>
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 rounded-sm bg-wedding-olive opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.button
              onClick={openModal}
              className="relative z-10 inline-block font-display text-xs tracking-[0.25em] uppercase px-12 py-5 rounded-sm shadow-xl transition-all border-none cursor-pointer"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Confirmar aquí
            </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              if (
                e.target === e.currentTarget &&
                step !== "success" &&
                step !== "declined"
              )
                closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
            >
              {/* Header */}
              <div
                className="flex items-center px-6 py-4 border-b"
                style={{ borderColor: "hsl(var(--wedding-olive) / 0.12)" }}
              >
                <Heart
                  size={13}
                  className="text-wedding-olive"
                  fill="currentColor"
                />
                <span className="flex-1 text-center font-display text-[10px] tracking-[0.35em] uppercase text-wedding-dark">
                  Katia &amp; Erick
                </span>
                {step !== "success" && step !== "declined" ? (
                  <button
                    onClick={closeModal}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <X size={17} />
                  </button>
                ) : (
                  <div className="w-7" />
                )}
              </div>

              {/* Contenido */}
              <div className="overflow-y-auto max-h-[80vh]">
                <AnimatePresence mode="wait">
                  {step === "main" && !isFamily && (
                    <SimpleRSVP
                      key="simple"
                      guestInfo={guestInfo}
                      onConfirm={handleSimpleConfirm}
                      onDecline={handleDecline}
                      isSubmitting={isSubmitting}
                    />
                  )}
                  {step === "main" && isFamily && (
                    <FamilyRSVP
                      key="family"
                      guestInfo={guestInfo}
                      onConfirm={handleConfirm}
                      onDecline={handleDecline}
                      isSubmitting={isSubmitting}
                      error={submitError}
                    />
                  )}
                  {step === "success" && (
                    <SuccessStep
                      key="success"
                      guestInfo={guestInfo}
                      onClose={closeModal}
                    />
                  )}
                  {step === "declined" && (
                    <DeclinedStep key="declined" onClose={closeModal} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RSVPSection;
