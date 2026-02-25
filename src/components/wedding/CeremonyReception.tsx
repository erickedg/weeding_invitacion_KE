import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

interface EventProps {
  title: string;
  time: string;
  venue: string;
  mapUrl: string;
}

const EventCard = ({ title, time, venue, mapUrl }: EventProps) => (
  <motion.div
    className="wedding-card mb-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <h3 className="wedding-heading text-2xl mb-4">{title}</h3>
    <div className="flex items-center justify-center gap-2 mb-2">
      <Clock size={14} className="text-wedding-olive-light" />
      <p className="font-body text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>{time}</p>
    </div>
    <div className="flex items-center justify-center gap-2 mb-4">
      <MapPin size={14} className="text-wedding-olive-light" />
      <p className="wedding-body">{venue}</p>
    </div>
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-body text-xs tracking-[0.2em] uppercase px-6 py-2 rounded-sm border transition-colors"
      style={{
        borderColor: "hsl(var(--primary))",
        color: "hsl(var(--primary))",
      }}
    >
      Ver mapa
    </a>
  </motion.div>
);

interface CeremonyReceptionProps {
  ceremony: EventProps;
  reception: EventProps;
}

const CeremonyReception = ({ ceremony, reception }: CeremonyReceptionProps) => {
  return (
    <section className="wedding-section">
      <div className="max-w-md mx-auto">
        <EventCard {...ceremony} />
        <EventCard {...reception} />
      </div>
    </section>
  );
};

export default CeremonyReception;
