import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal"; // Ajusta la ruta si es necesario

interface WeddingCalendarProps {
  weddingDate: Date;
}

const WeddingCalendar = ({ weddingDate }: WeddingCalendarProps) => {
  // Aseguramos que la fecha es correcta
  const dateObj = new Date(weddingDate);
  const month = dateObj.toLocaleString("es-ES", { month: "long" }).toUpperCase();
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();

  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"]; // Abreviados para estilo minimalista

  // Cálculos del calendario
  const firstDayIndex = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
  const totalDays = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();

  // Array completo con espacios vacíos (null) y números
  const calendarDays = Array(firstDayIndex).fill(null).concat(
    Array.from({ length: totalDays }, (_, i) => i + 1)
  );

  return (
    <section className="py-20 px-4 bg-white relative">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-wedding-olive-light opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-sm mx-auto text-center relative z-10">
        
        {/* ENCABEZADO ANIMADO */}
        <ScrollReveal width="100%">
          <p className="font-brittany text-4xl mb-2 text-wedding-olive-dark">El gran día</p>
          <div className="h-px w-12 bg-wedding-olive-light mx-auto mb-4 opacity-60" />
          
          <p className="font-display text-xl tracking-[0.3em] font-light text-gray-800 uppercase">
            {month} | {year}
          </p>
        </ScrollReveal>

        {/* CUADRÍCULA DEL CALENDARIO */}
        <div className="mt-10">
          
          {/* DÍAS DE LA SEMANA */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((d, i) => (
              <motion.div 
                key={i} 
                className="font-body text-[10px] tracking-widest text-gray-400 uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.05) }}
              >
                {d}
              </motion.div>
            ))}
          </div>

          {/* DÍAS DEL MES */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((d, i) => {
              const isWeddingDay = d === day;
              
              return (
                <motion.div
                  key={i}
                  className="aspect-square flex items-center justify-center relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + (i * 0.02), // Efecto de llenado rápido
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {d ? (
                    <div
                      className={`
                        w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full font-display text-sm md:text-base transition-all duration-500
                        ${isWeddingDay 
                            ? "bg-wedding-olive text-white shadow-lg ring-4 ring-wedding-olive-light/20 font-medium scale-110" 
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      {d}
                      
                      {/* Corazón animado solo en el día de la boda */}
                      {isWeddingDay && (
                        <motion.span
                          className="absolute -top-1 -right-1 text-[10px]"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5, type: "spring" }}
                        >
                          ❤️
                        </motion.span>
                      )}
                    </div>
                  ) : (
                    <span /> // Espacio vacío
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCalendar;
