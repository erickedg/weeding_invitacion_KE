import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2 } from "lucide-react";
import EnvelopeOpener from "@/components/wedding/EnvelopeOpener";
import HeroSection from "@/components/wedding/HeroSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import heroBg1 from "@/assets/Foto_11.webp";
import heroBg2 from "@/assets/Foto_10.webp";

const BackgroundMusic  = lazy(() => import("@/components/ui/BackgroundMusic"));
const CountdownTimer   = lazy(() => import("@/components/wedding/CountdownTimer"));
const PhotoGallery     = lazy(() => import("@/components/wedding/PhotoGallery"));
const WeddingCalendar  = lazy(() => import("@/components/wedding/WeddingCalendar"));
const CeremonyReception = lazy(() => import("@/components/wedding/CeremonyReception"));
const Itinerary        = lazy(() => import("@/components/wedding/Itinerary"));
const DressCode        = lazy(() => import("@/components/wedding/DressCode"));
const GiftInfo         = lazy(() => import("@/components/wedding/GiftInfo"));
const OurStory         = lazy(() => import("@/components/wedding/OurStory"));
const RSVPSection      = lazy(() => import("@/components/wedding/RSVPSection"));
const WeddingFooter    = lazy(() => import("@/components/wedding/WeddingFooter"));

// ─── Tipos ────────────────────────────────────────────────────────────────────

type GuestStatus = "loading" | "no-id" | "invalid" | "confirmed" | "valid";

export interface GuestData {
  id: string;
  name: string;
  allowed: number;
  confirmed?: boolean;
}

// ─── Pantalla: enlace no válido ───────────────────────────────────────────────

function InvalidInvitationScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heart
          size={36}
          className="mx-auto mb-6 text-wedding-olive opacity-40"
          fill="currentColor"
        />
        <p className="font-display text-xs tracking-[0.35em] uppercase text-gray-400 mb-3">
          Katia &amp; Erick · 09.10.2026
        </p>
        <h1
          className="font-brittany mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 5rem)", color: "hsl(var(--wedding-olive-dark))" }}
        >
          Enlace no válido
        </h1>
        <div className="h-px w-12 bg-wedding-olive-light opacity-40 mx-auto my-6" />
        <p className="wedding-body text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          Este enlace no corresponde a una invitación válida. Si crees que es un error, por favor contacta directamente a los novios.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Pantalla: ya confirmada ──────────────────────────────────────────────────

function AlreadyConfirmedScreen({ guest }: { guest: GuestData | null }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "hsl(var(--wedding-olive) / 0.12)" }}
        >
          <CheckCircle2 size={30} className="text-wedding-olive" strokeWidth={1.5} />
        </motion.div>

        <p className="font-display text-xs tracking-[0.35em] uppercase text-gray-400 mb-3">
          Katia &amp; Erick · 09.10.2026
        </p>
        <h1
          className="font-brittany mb-2"
          style={{ fontSize: "clamp(3rem, 10vw, 5rem)", color: "hsl(var(--wedding-olive-dark))" }}
        >
          ¡Ya confirmaste!
        </h1>
        <div className="h-px w-12 bg-wedding-olive-light opacity-40 mx-auto my-6" />
        {guest && (
          <p className="wedding-body text-sm text-gray-600 font-medium mb-2">
            Hola <span className="font-bold text-gray-700">{guest.name}</span>, tu asistencia ya fue registrada.
          </p>
        )}
        <p className="wedding-body text-sm text-gray-500 max-w-xs mx-auto leading-relaxed mb-2">
          Nos vemos el <span className="font-semibold text-gray-700">9 de octubre</span>.
        </p>
        <p className="font-brittany text-2xl mt-4" style={{ color: "hsl(var(--wedding-olive))" }}>
          — Katia &amp; Erick ♡
        </p>
      </motion.div>
    </div>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────

const WEDDING_CONFIG = {
  names: "Katia & Erick",
  date: new Date(2026, 9, 9, 16, 30),
  dateFormatted: "09 · 10 · 2026",
  ceremony: {
    title: "Ceremonia",
    time: "4:30 PM",
    venue: "Iglesia (Parroquia El Señor de la Misericordia)",
    mapUrl: "https://maps.app.goo.gl/DoFad2Vt6b7A1vm87",
  },
  reception: {
    title: "Recepción",
    time: "7:30 PM",
    venue: "Jardín (Hacienda Flor de Nogal)",
    mapUrl: "https://maps.app.goo.gl/Mn8qtibT4AVPoWmn9",
  },
  itinerary: [
    { time: "4:30 p.m.", event: "Ceremonia religiosa", icon: "💒" },
    { time: "5:30 p.m.", event: "Sesión de fotos familiar", icon: "📸" },
    { time: "7:30 p.m.", event: "Recepción de invitados", icon: "🥂" },
    { time: "8:00 p.m.", event: "Cena", icon: "🍽️" },
    { time: "9:00 p.m.", event: "Inicio de la fiesta", icon: "🎉" },
    { time: "9:00 p.m.", event: "Baile y celebración", icon: "💃" },
    { time: "1:00 a.m.", event: "Fin del evento", icon: "🌙" },
  ],
  rsvpDeadline: "1 de septiembre de 2026",
  rsvpUrl: "#",
  story: "De todas las decisiones que hemos tomado juntos, la más importante ha sido elegirnos el uno al otro. Desde la primera cita, supimos que estábamos destinados a compartir nuestras vidas. Cada momento, cada risa y cada desafío nos han fortalecido y nos han llevado a este hermoso capítulo que estamos a punto de escribir juntos.",
};

// ─── Componente principal ─────────────────────────────────────────────────────

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [guestStatus, setGuestStatus] = useState<GuestStatus>("loading");
  const [guestData, setGuestData] = useState<GuestData | null>(null);

  useEffect(() => {
    // Precarga assets mientras el usuario ve la pantalla de carga
    [heroBg1, heroBg2].forEach((src) => { new Image().src = src; });
    import("@/components/ui/BackgroundMusic");
    import("@/components/wedding/CountdownTimer");
    import("@/components/wedding/PhotoGallery");
    import("@/components/wedding/WeddingCalendar");
    import("@/components/wedding/CeremonyReception");
    import("@/components/wedding/Itinerary");
    import("@/components/wedding/DressCode");
    import("@/components/wedding/GiftInfo");
    import("@/components/wedding/OurStory");
    import("@/components/wedding/RSVPSection");
    import("@/components/wedding/WeddingFooter");

    // Verificar ID en URL
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
      setGuestStatus("no-id");
      return;
    }

    fetch(`/api/guest?id=${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setGuestStatus("invalid");
          return;
        }
        const data = await res.json();
        setGuestData({ id, name: data.name, allowed: data.allowed, confirmed: data.confirmed });
        setGuestStatus(data.confirmed ? "confirmed" : "valid");
      })
      .catch(() => setGuestStatus("invalid"));
  }, []);

  // Enlace sin ID o ID no encontrado
  if (guestStatus === "no-id" || guestStatus === "invalid") {
    return <InvalidInvitationScreen />;
  }

  // Verificando — no mostramos nada hasta saber el estado
  if (guestStatus === "loading") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden no-scrollbar">
      <EnvelopeOpener
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
        names={WEDDING_CONFIG.names}
      />

      {isEnvelopeOpen && (
        guestStatus === "confirmed" ? (
          <AlreadyConfirmedScreen guest={guestData} />
        ) : (
          <Suspense fallback={null}>
            <BackgroundMusic src="/music/Harritocominguprosesvoz.MP3" volume={0.15} />
            <HeroSection names={WEDDING_CONFIG.names} subtitle={WEDDING_CONFIG.subtitle} />

            <ScrollReveal width="100%">
              <CountdownTimer targetDate={WEDDING_CONFIG.date} names={WEDDING_CONFIG.names} />
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.2}>
              <PhotoGallery />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <WeddingCalendar weddingDate={WEDDING_CONFIG.date} />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <CeremonyReception
                ceremony={WEDDING_CONFIG.ceremony}
                reception={WEDDING_CONFIG.reception}
              />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <Itinerary items={WEDDING_CONFIG.itinerary} />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <DressCode />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <GiftInfo />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <OurStory story={WEDDING_CONFIG.story} />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <RSVPSection
                deadline={WEDDING_CONFIG.rsvpDeadline}
                preloadedGuest={guestData}
              />
            </ScrollReveal>

            <ScrollReveal width="100%">
              <WeddingFooter
                names={WEDDING_CONFIG.names}
                date={WEDDING_CONFIG.dateFormatted}
              />
            </ScrollReveal>
          </Suspense>
        )
      )}
    </div>
  );
};

export default Index;
