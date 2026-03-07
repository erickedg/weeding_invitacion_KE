import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

interface EventProps {
  title: string;
  time: string;
  venue: string;
  mapUrl: string;
}

const EventCard = ({ title, time, venue, mapUrl, index }: EventProps & { index: number }) => (
  <motion.div
    className="wedding-card mb-6"
    // Animación simple y elegante: sube un poco y aparece
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
  >
    <h3 className="wedding-heading text-3xl mb-4">{title}</h3>
    
    <div className="flex items-center justify-center gap-2 mb-2">
      <Clock size={16} className="text-wedding-olive-light" />
      <p className="font-body text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
        {time}
      </p>
    </div>

    <div className="flex items-center justify-center gap-2 mb-6">
      <MapPin size={16} className="text-wedding-olive-light" />
      <p className="wedding-body text-sm">{venue}</p>
    </div>

    <motion.a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-body text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-sm border transition-colors"
      style={{
        borderColor: "hsl(var(--primary))",
        color: "hsl(var(--primary))",
      }}
      // Efecto sutil al tocar el botón
      whileHover={{ backgroundColor: "hsl(var(--primary) / 0.05)", scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Ver mapa
    </motion.a>
  </motion.div>
);

interface CeremonyReceptionProps {
  ceremony: EventProps;
  reception: EventProps;
}

const CeremonyReception = ({ ceremony, reception }: CeremonyReceptionProps) => {
  return (
    <section className="wedding-section">
      <div className="max-w-md mx-auto text-center">
        {/* Título de la sección animado con tu ScrollReveal */}
        <ScrollReveal width="100%">
            <p className="wedding-body text-xs tracking-[0.3em] uppercase mb-10 opacity-60">
                Ubicaciones
            </p>
        </ScrollReveal>

        {/* Las tarjetas con tus estilos originales */}
        <EventCard {...ceremony} index={0} />
        <EventCard {...reception} index={1} />
      </div>
    </section>
  );
};

export default CeremonyReception;