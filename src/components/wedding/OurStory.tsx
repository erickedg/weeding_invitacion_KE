import { motion } from "framer-motion";

interface OurStoryProps {
  story?: string;
}

const OurStory = ({ story }: OurStoryProps) => {
  return (
    <section className="wedding-section relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--wedding-sage))" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Photo placeholder */}
        <div
          className="w-48 h-64 mx-auto mb-8 rounded-sm overflow-hidden"
          style={{ backgroundColor: "hsl(var(--secondary))" }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-display text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Nuestra foto
            </p>
          </div>
        </div>

        <p className="wedding-body text-sm leading-relaxed">
          {story || "Todo comenzó sin imaginar que ese sería el primer capítulo de nuestra historia. Hoy, con el corazón lleno de gratitud, estamos listos para escribir nuestro…"}
        </p>

        <p className="font-script text-3xl mt-6" style={{ color: "hsl(var(--primary))" }}>
          Para siempre.
        </p>
      </motion.div>
    </section>
  );
};

export default OurStory;
