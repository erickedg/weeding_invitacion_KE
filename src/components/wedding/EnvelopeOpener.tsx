import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeOpenerProps {
  isOpen: boolean;
  onOpen: () => void;
  names: string;
}

const EnvelopeOpener = ({ isOpen, onOpen, names }: EnvelopeOpenerProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.p
            className="wedding-body mb-4 text-sm tracking-widest uppercase text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            El día más importante de nuestras vidas ha llegado
          </motion.p>

          <motion.h1
            className="font-display text-3xl md:text-5xl font-light tracking-[0.3em] uppercase mb-12 text-center px-4"
            style={{ color: "hsl(var(--primary))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            ¡NOS CASAMOS!
          </motion.h1>

          {/* Envelope */}
          <motion.div
            className="relative cursor-pointer group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Envelope body */}
            <div
              className="relative w-72 h-48 md:w-96 md:h-64 rounded-sm shadow-lg overflow-hidden"
              style={{ backgroundColor: "hsl(var(--wedding-olive))" }}
            >
              {/* Envelope flap lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="none">
                  {/* Top flap lines */}
                  <line x1="0" y1="0" x2="200" y2="130" stroke="hsl(45, 15%, 25%)" strokeWidth="0.5" opacity="0.3" />
                  <line x1="400" y1="0" x2="200" y2="130" stroke="hsl(45, 15%, 25%)" strokeWidth="0.5" opacity="0.3" />
                  {/* Bottom flap lines */}
                  <line x1="0" y1="260" x2="200" y2="130" stroke="hsl(45, 15%, 25%)" strokeWidth="0.5" opacity="0.3" />
                  <line x1="400" y1="260" x2="200" y2="130" stroke="hsl(45, 15%, 25%)" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>

              {/* 🔥 CENTER TEXT - CORREGIDO */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
                {/* Contenedor con flex col para centrar perfectamente */}
                <div className="flex flex-col items-center justify-center -mt-4">
                  <p className="font-body text-xs md:text-sm tracking-wider text-center">Clic aquí</p>
                  <p className="font-body text-xs md:text-sm tracking-wider text-center mb-6">para abrir</p>
                  
                  {/* Wax seal */}
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-md animate-pulse-soft"
                    style={{ backgroundColor: "hsl(var(--wedding-gold))" }}
                  >
                    <span className="font-script text-lg md:text-2xl text-primary-foreground">♥</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="font-display text-xl md:text-2xl tracking-[0.25em] uppercase mt-10 font-light text-center px-4"
            style={{ color: "hsl(var(--primary))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {names}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpener;