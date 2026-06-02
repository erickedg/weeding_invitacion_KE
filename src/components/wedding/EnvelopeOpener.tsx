import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeOpenerProps {
  isOpen: boolean;
  onOpen: () => void;
  names: string;
}

interface HeartProps {
  left: string;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingHeart = ({ left, delay, duration, size, opacity }: HeartProps) => (
  <motion.div
    className="absolute pointer-events-none select-none font-script"
    style={{ left, bottom: "-20px", fontSize: size, color: "hsl(65, 25%, 35%)" }}
    animate={{
      y: [0, "-110vh"],
      opacity: [0, opacity, opacity, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: 0.8,
      ease: "easeOut",
      times: [0, 0.08, 0.82, 1],
    }}
  >
    ♡
  </motion.div>
);

const HEARTS: HeartProps[] = [
  { left: "8%",  delay: 0,   duration: 7,   size: 11, opacity: 0.18 },
  { left: "18%", delay: 2.2, duration: 9,   size: 8,  opacity: 0.14 },
  { left: "30%", delay: 1.0, duration: 7.5, size: 13, opacity: 0.16 },
  { left: "44%", delay: 3.5, duration: 8.5, size: 9,  opacity: 0.12 },
  { left: "57%", delay: 0.5, duration: 8,   size: 11, opacity: 0.15 },
  { left: "70%", delay: 2.8, duration: 7,   size: 7,  opacity: 0.13 },
  { left: "82%", delay: 1.5, duration: 9.5, size: 10, opacity: 0.17 },
  { left: "92%", delay: 4.0, duration: 7.8, size: 8,  opacity: 0.14 },
];

const EnvelopeOpener = ({ isOpen, onOpen, names }: EnvelopeOpenerProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(40,30%,97%) 0%, hsl(40,20%,93%) 100%)",
          }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Floating hearts */}
          {HEARTS.map((h, i) => (
            <FloatingHeart key={i} {...h} />
          ))}

          {/* Decorative corner vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 55%, hsl(40,20%,88%) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              className="font-body text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ color: "hsl(var(--wedding-text))" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Una invitación especial para ti
            </motion.p>

            <motion.h1
              className="font-display text-3xl md:text-5xl font-light tracking-[0.3em] uppercase mb-12 text-center"
              style={{ color: "hsl(var(--primary))" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              ¡Nos casamos!
            </motion.h1>

            {/* Envelope */}
            <motion.div
              className="relative cursor-pointer group"
              initial={{ opacity: 0, scale: 0.82, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55, type: "spring", stiffness: 200, damping: 20 }}
              onClick={onOpen}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Glow ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-sm pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  boxShadow: "0 0 40px 8px hsl(65,25%,35%,0.18)",
                }}
              />

              {/* Envelope body */}
              <div
                className="relative w-72 h-48 md:w-96 md:h-64 rounded-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(65,28%,38%) 0%, hsl(65,25%,31%) 100%)",
                  boxShadow:
                    "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                {/* Inner fold lines */}
                <div className="absolute inset-0">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 260"
                    preserveAspectRatio="none"
                  >
                    <line x1="0"   y1="0"   x2="200" y2="130" stroke="white" strokeWidth="0.6" opacity="0.12" />
                    <line x1="400" y1="0"   x2="200" y2="130" stroke="white" strokeWidth="0.6" opacity="0.12" />
                    <line x1="0"   y1="260" x2="200" y2="130" stroke="white" strokeWidth="0.6" opacity="0.08" />
                    <line x1="400" y1="260" x2="200" y2="130" stroke="white" strokeWidth="0.6" opacity="0.08" />
                    {/* Subtle inner border */}
                    <rect x="10" y="10" width="380" height="240" rx="2" stroke="white" strokeWidth="0.4" opacity="0.1" fill="none" />
                  </svg>
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground gap-3">
                  <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-75">
                    Toca para abrir
                  </p>

                  {/* Wax seal */}
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-lg"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, hsl(38,70%,62%) 0%, hsl(38,60%,50%) 100%)",
                      boxShadow:
                        "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      className="font-display font-semibold leading-none tracking-wide"
                      style={{ fontSize: "clamp(10px, 2vw, 13px)", color: "hsl(40,20%,96%)" }}
                    >
                      K&amp;E
                    </span>
                  </motion.div>

                  <p className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase opacity-60">
                    09 · 10 · 2026
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="font-brittany text-3xl md:text-4xl mt-10 font-light text-center"
              style={{ color: "hsl(var(--primary))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {names}
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpener;
