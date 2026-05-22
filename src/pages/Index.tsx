import { useState, useEffect, lazy, Suspense } from "react";
import EnvelopeOpener from "@/components/wedding/EnvelopeOpener";
import HeroSection from "@/components/wedding/HeroSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Imágenes del hero para precargarlas mientras el usuario ve el sobre
import heroBg1 from "@/assets/Foto_11.webp";
import heroBg2 from "@/assets/Foto_10.webp";

// Lazy: se descargan en segundo plano, no bloquean la carga inicial
const BackgroundMusic = lazy(() => import("@/components/ui/BackgroundMusic"));
const CountdownTimer = lazy(() => import("@/components/wedding/CountdownTimer"));
const PhotoGallery = lazy(() => import("@/components/wedding/PhotoGallery"));
const WeddingCalendar = lazy(() => import("@/components/wedding/WeddingCalendar"));
const CeremonyReception = lazy(() => import("@/components/wedding/CeremonyReception"));
const Itinerary = lazy(() => import("@/components/wedding/Itinerary"));
const DressCode = lazy(() => import("@/components/wedding/DressCode"));
const GiftInfo = lazy(() => import("@/components/wedding/GiftInfo"));
const OurStory = lazy(() => import("@/components/wedding/OurStory"));
const RSVPSection = lazy(() => import("@/components/wedding/RSVPSection"));
const WeddingFooter = lazy(() => import("@/components/wedding/WeddingFooter"));

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
  hotel: { name: "Hotel (por definir)", url: "#" },
  rsvpDeadline: "1 de septiembre de 2026",
  rsvpUrl: "#",
  story: "De todas las decisiones que hemos tomado juntos, la más importante ha sido elegirnos el uno al otro. Desde la primera cita, supimos que estábamos destinados a compartir nuestras vidas. Cada momento, cada risa y cada desafío nos han fortalecido y nos han llevado a este hermoso capítulo que estamos a punto de escribir juntos.",
};

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Precarga imágenes y chunks de JS mientras el usuario ve el sobre
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden no-scrollbar">
      <EnvelopeOpener
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
        names={WEDDING_CONFIG.names}
      />
      <>
      {/* resto de tu app */}
      </>
      {isEnvelopeOpen && (
        <Suspense fallback={null}>
          <BackgroundMusic
            src="/music/Harritocominguprosesvoz.MP3"
            volume={0.15}
          />
          <HeroSection
            names={WEDDING_CONFIG.names}
            subtitle={WEDDING_CONFIG.subtitle}
          />

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
              confirmUrl={WEDDING_CONFIG.rsvpUrl}
            />
          </ScrollReveal>

          <ScrollReveal width="100%">
            <WeddingFooter
              names={WEDDING_CONFIG.names}
              date={WEDDING_CONFIG.dateFormatted}
            />
          </ScrollReveal>
        </Suspense>
      )}
    </div>
  );
};

export default Index;
