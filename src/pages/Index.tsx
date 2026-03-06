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
// import Accommodation from "@/components/wedding/Accommodation";
import RSVPSection from "@/components/wedding/RSVPSection";
import WeddingFooter from "@/components/wedding/WeddingFooter";

// ==========================================
// 🎊 PERSONALIZA TU INVITACIÓN AQUÍ 🎊
// ==========================================

const WEDDING_CONFIG = {
  // Nombres de los novios
  names: "Katia & Erick",

  // Fecha de la boda (año, mes (0-indexed), día, hora, minuto)
  date: new Date(2026, 9, 9, 16, 30), // 9 de octubre de 2026

  // Fecha formateada
  dateFormatted: "09 · 10 · 2026",

  // Subtítulo del hero
  // subtitle: "En el plan perfecto de Dios, nuestras vidas se encontraron",

  // Ceremonia
  ceremony: {
    title: "Ceremonia",
    time: "4:30 PM",
    venue: "Iglesia (por definir)",
    mapUrl: "#",
  },

  // Recepción
  reception: {
    title: "Recepción",
    time: "7:30 PM",
    venue: "Jardín (Hacienda Flor de Nogal)",
    mapUrl: "https://maps.app.goo.gl/Mn8qtibT4AVPoWmn9",
  },

  // Itinerario
  itinerary: [
    { time: "4:30 PM", event: "Ceremonia Religiosa", icon: "⛪" },
    { time: "5:30 PM", event: "Sesión de Fotos", icon: "📸" },
    { time: "6:30 PM", event: "Cóctel de Bienvenida", icon: "🥂" },
    { time: "7:30 PM", event: "Recepción", icon: "🎉" },
    { time: "8:30 PM", event: "Cena", icon: "🍽️" },
    { time: "10:00 PM", event: "Fiesta & Baile", icon: "💃" },
  ],

  // Hospedaje
  hotel: {
    name: "Hotel (por definir)",
    url: "#",
  },

  // Álbum de fotos
  // lbumUrl: "#",

  // RSVP
  rsvpDeadline: "1 de septiembre de 2026",
  rsvpUrl: "#",

  // Historia
  story: "Todo comenzó sin imaginar que ese sería el primer capítulo de nuestra historia. Hoy, con el corazón lleno de gratitud, estamos listos para escribir nuestro…",
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

      {isEnvelopeOpen && (
        <>
          <HeroSection
            names={WEDDING_CONFIG.names}
            subtitle={WEDDING_CONFIG.subtitle}
          />

          <CountdownTimer targetDate={WEDDING_CONFIG.date} />

          <PhotoGallery />

          <WeddingCalendar weddingDate={WEDDING_CONFIG.date} />

          <CeremonyReception
            ceremony={WEDDING_CONFIG.ceremony}
            reception={WEDDING_CONFIG.reception}
          />

          <Itinerary items={WEDDING_CONFIG.itinerary} />

          <DressCode />

          <GiftInfo />

          <OurStory story={WEDDING_CONFIG.story} />

          {/* <Accommodation
            hotelName={WEDDING_CONFIG.hotel.name}
            hotelUrl={WEDDING_CONFIG.hotel.url}
          /> */}

          <RSVPSection
            deadline={WEDDING_CONFIG.rsvpDeadline}
            confirmUrl={WEDDING_CONFIG.rsvpUrl}
          />

          <WeddingFooter
            names={WEDDING_CONFIG.names}
            date={WEDDING_CONFIG.dateFormatted}
          />
        </>
      )}
    </div>
  );
};

export default Index;
