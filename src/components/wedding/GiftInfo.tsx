import { motion } from "framer-motion";
import { Gift, Baby } from "lucide-react";

const GiftInfo = () => {
  return (
    <section className="wedding-section" style={{ backgroundColor: "hsl(var(--wedding-cream))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto space-y-10"
      >
        {/* Lluvia de sobres */}
        <div>
          <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
            <Gift size={20} className="text-primary" />
          </div>
          <h3 className="wedding-heading text-xl mb-4">Lluvia de sobres</h3>
          <p className="wedding-body text-sm">
            Su presencia es el mejor regalo que podemos recibir en este día.
            Sin embargo, si desean hacernos un obsequio, les agradeceríamos
            que sea en forma de sobre, el cual podrán depositar en un lugar
            especial el día del evento.
          </p>
        </div>

        <div className="wedding-divider" />

        {/* No niños */}
        <div>
          <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
            <Baby size={20} className="text-primary" />
          </div>
          <h3 className="wedding-heading text-xl mb-4">No niños</h3>
          <p className="wedding-body text-sm">
            Para que puedas disfrutar con total comodidad este momento especial,
            hemos planeado una velada sólo para adultos.
          </p>
          <p className="wedding-body text-xs mt-3 italic">
            Gracias por tu comprensión y cariño.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default GiftInfo;
