import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Baby, Landmark, Copy, Check } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

const ACCOUNT  = "1234567890123456";
const CLABE    = "012345678901234567";
const DISPLAY_ACCOUNT = "1234 5678 9012 3456";
const DISPLAY_CLABE   = "012 345 678901234567";

function CopyField({
  label,
  display,
  value,
}: {
  label: string;
  display: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // silently ignore clipboard errors
    }
  };

  return (
    <div className="bg-wedding-cream/50 p-3 rounded-lg flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-wedding-olive-dark/70 mb-0.5">
          {label}
        </p>
        <p className="font-mono text-sm font-bold text-wedding-olive-dark truncate">
          {display}
        </p>
      </div>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.88 }}
        className="flex-shrink-0 p-1.5 rounded-md transition-colors cursor-pointer border-none bg-transparent"
        style={{
          color: copied
            ? "hsl(142, 60%, 42%)"
            : "hsl(var(--wedding-olive-dark))",
          opacity: copied ? 1 : 0.5,
        }}
        title="Copiar"
      >
        {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
      </motion.button>
    </div>
  );
}

const GiftInfo = () => {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--wedding-cream))" }}
    >
      {/* Decorative float */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 opacity-10 rounded-full blur-2xl"
        style={{ backgroundColor: "hsl(var(--wedding-olive))" }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">

        {/* Card 1: Lluvia de sobres */}
        <ScrollReveal width="100%" delay={0.1}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm text-center h-full border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--wedding-olive-light))", opacity: undefined }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: "hsl(65,20%,50%,0.12)", color: "hsl(var(--wedding-olive-dark))" }}
              >
                <Gift size={30} strokeWidth={1.5} />
              </div>
            </motion.div>

            <h3 className="font-brittany text-3xl mb-4 text-gray-800">Lluvia de sobres</h3>
            <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-6 opacity-40" />
            <p className="wedding-body text-sm leading-relaxed text-gray-600 flex-grow">
              Su presencia es el mejor regalo que podemos recibir.
              Sin embargo, si desean hacernos un obsequio, les agradeceríamos
              que sea en forma de sobre, el cual podrán depositar el día del evento.
            </p>
          </div>
        </ScrollReveal>

        {/* Card 2: Transferencia BBVA */}
        <ScrollReveal width="100%" delay={0.3}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm text-center h-full border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "hsl(65,20%,50%,0.12)", color: "hsl(var(--wedding-olive-dark))" }}
            >
              <Landmark size={30} strokeWidth={1.5} />
            </motion.div>

            <h3 className="font-brittany text-3xl mb-4 text-gray-800">Transferencia BBVA</h3>
            <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-6 opacity-40" />

            <div className="space-y-2.5 text-left flex-grow">
              <div className="bg-wedding-cream/50 p-3 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-wedding-olive-dark/70 mb-0.5">Banco</p>
                <p className="font-medium text-sm text-gray-800">BBVA México</p>
              </div>

              <div className="bg-wedding-cream/50 p-3 rounded-lg">
                <p className="text-xs uppercase tracking-wider text-wedding-olive-dark/70 mb-0.5">Titular</p>
                <p className="font-medium text-sm text-gray-800">Erick Edgardo Calamaco Reza</p>
              </div>

              <CopyField
                label="Número de cuenta"
                display={DISPLAY_ACCOUNT}
                value={ACCOUNT}
              />

              <CopyField
                label="CLABE"
                display={DISPLAY_CLABE}
                value={CLABE}
              />
            </div>

            <p className="wedding-body text-xs mt-6 italic text-wedding-olive-dark opacity-70">
              ¡Gracias por tu apoyo para comenzar nuestra nueva vida juntos!
            </p>
          </div>
        </ScrollReveal>

        {/* Card 3: No niños */}
        <ScrollReveal width="100%" delay={0.2}>
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm text-center h-full border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "hsl(65,20%,50%,0.12)", color: "hsl(var(--wedding-olive-dark))" }}
            >
              <Baby size={30} strokeWidth={1.5} />
            </motion.div>

            <h3 className="font-brittany text-3xl mb-4 text-gray-800">No niños</h3>
            <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-6 opacity-40" />

            <p className="wedding-body text-sm leading-relaxed text-gray-600 flex-grow">
              Para que puedas disfrutar con total comodidad este momento especial,
              hemos planeado una velada sólo para adultos.
            </p>

            <p className="wedding-body text-xs mt-4 italic text-wedding-olive-dark opacity-75">
              Gracias por tu comprensión y cariño.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default GiftInfo;
