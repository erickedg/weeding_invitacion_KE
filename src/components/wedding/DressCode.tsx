import { motion } from "framer-motion";

const DressCode = () => {
  return (
    <section className="wedding-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
          Código de vestimenta
        </p>
        <h2 className="wedding-heading text-3xl mb-6">FORMAL</h2>
        <div className="wedding-divider" />

        <div className="space-y-4 mt-8">
          <div className="wedding-card">
            <p className="font-display text-lg mb-1" style={{ color: "hsl(var(--primary))" }}>Mujeres</p>
            <p className="wedding-body">Vestido Formal (Largo)</p>
          </div>
          <div className="wedding-card">
            <p className="font-display text-lg mb-1" style={{ color: "hsl(var(--primary))" }}>Hombres</p>
            <p className="wedding-body">Traje Formal</p>
          </div>
        </div>

        <p className="wedding-body text-xs mt-6 italic">
          Reservamos los colores blanco y verde para la novia y damas de honor.
        </p>
      </motion.div>
    </section>
  );
};

export default DressCode;
