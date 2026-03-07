import { motion } from "framer-motion";

// 1. IMPORTAMOS LA IMAGEN QUE QUIERES USAR DE FONDO
// Puedes cambiar 'Foto_1.jpg' por la que mejor se vea en formato horizontal
import storyBanner from "@/assets/Foto_7.jpg"; 

interface OurStoryProps {
  story?: string;
}

const OurStory = ({ story }: OurStoryProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* --- PARTE 1: FOTO BANNER FULL WIDTH (De orilla a orilla) --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full relative"
      >
        {/* 
           Altura del banner:
           - h-64 (256px) en móviles para no ocupar toda la pantalla.
           - md:h-[500px] en escritorio para que luzca espectacular.
        */}
        <div className="w-full h-64 md:h-[500px] overflow-hidden relative">
            <img 
              src={storyBanner} 
              alt="Nuestra historia" 
              // 'object-cover' asegura que cubra todo sin deformarse.
              // 'object-center' centra la foto. Si se cortan las cabezas, usa 'object-top'.
              className="w-full h-full object-cover object-center md:object-[60%_35%]"
            />
            
            {/* Overlay suave para integrar mejor la foto con el diseño blanco */}
            <div className="absolute inset-0 bg-black/10" />
        </div>
      </motion.div>


      {/* --- PARTE 2: TEXTO DE LA HISTORIA --- */}
      <div className="relative py-16 px-6 md:px-12 bg-white">
        
        {/* Elemento decorativo sutil detrás del texto */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"
             style={{ backgroundColor: "hsl(var(--wedding-sage))" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="font-display text-2xl md:text-3xl mb-8 text-gray-800 tracking-widest uppercase">
            Nuestra Historia
          </h2>

          <p className="wedding-body text-sm md:text-lg leading-relaxed text-gray-600 px-4 font-light">
            {story || "Todo comenzó sin imaginar que ese sería el primer capítulo de nuestra historia. Hoy, con el corazón lleno de gratitud, estamos listos para escribir nuestro…"}
          </p>

          <div className="w-16 h-px bg-wedding-olive-light mx-auto my-8 opacity-60" />

          <p className="font-display text-3xl md:text-5xl mt-2 text-wedding-olive-dark">
            Para siempre.
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default OurStory;