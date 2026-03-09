import { useState } from "react";
import EnvelopeOpener from "@/components/wedding/EnvelopeOpener";
import HeroSection from "@/components/wedding/HeroSection";
import CountdownTimer from "@/components/wedding/CountdownTimer";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import WeddingCalendar from "@/components/wedding/WeddingCalendar";
import CeremonyReception from "@/components/wedding/CeremonyReception";
import Itinerary from "@/components/wedding/Itinerary";
import DressCode from "@/components/wedding/DressCode";
import GiftInfo from "@/components/wedding/GiftInfo";
import OurStory from "@/components/wedding/OurStory";
import RSVPSection from "@/components/wedding/RSVPSection";
import WeddingFooter from "@/components/wedding/WeddingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal"; // IMPORTAMOS TU NUEVO COMPONENTE
import BackgroundMusic from "@/components/ui/BackgroundMusic";

const WEDDING_CONFIG = {
  names: "Katia & Erick",
  date: new Date(2026, 9, 9, 16, 30),
  dateFormatted: "09 · 10 · 2026",
  ceremony: {
    title: "Ceremonia",
    time: "4:30 PM",
    venue: "Iglesia (por definir)",
    mapUrl: "#",
  },
  reception: {
    title: "Recepción",
    time: "7:30 PM",
    venue: "Jardín (Hacienda Flor de Nogal)",
    mapUrl: "https://maps.app.goo.gl/Mn8qtibT4AVPoWmn9",
  },
  itinerary: [
    { time: "4:30 PM", event: "Ceremonia Religiosa", icon: "⛪" },
    { time: "5:30 PM", event: "Sesión de Fotos", icon: "📸" },
    { time: "6:30 PM", event: "Cóctel de Bienvenida", icon: "🥂" },
    { time: "7:30 PM", event: "Recepción", icon: "🎉" },
    { time: "8:30 PM", event: "Cena", icon: "🍽️" },
    { time: "10:00 PM", event: "Fiesta & Baile", icon: "💃" },
  ],
  hotel: { name: "Hotel (por definir)", url: "#" },
  rsvpDeadline: "1 de septiembre de 2026",
  rsvpUrl: "#",
  story: "De todas las decisiones que hemos tomado juntos, la más importante ha sido elegirnos el uno al otro. Desde la primera cita, supimos que estábamos destinados a compartir nuestras vidas. Cada momento, cada risa y cada desafío nos han fortalecido y nos han llevado a este hermoso capítulo que estamos a punto de escribir juntos.",
};

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

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
        <>
          {/* MÚSICA: Aparece y suena automáticamente al abrir el sobre */}
          <BackgroundMusic 
            src="/music/Harritocominguprosesvoz.MP3" 
            volume={0.15} 
          />
          {/* El Hero aparece de inmediato al abrir el sobre, no necesita ScrollReveal */}
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

          {/* El itinerario ya tiene animaciones internas, pero lo envolvemos para el título */}
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
        </>
      )}
    </div>
  );
};

export default Index;
