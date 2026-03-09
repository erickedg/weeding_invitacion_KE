import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; 

// Importamos las imágenes
import foto1 from "../../assets/Foto_13.jpg";
import foto2 from "../../assets/Foto_12.jpg";
import foto3 from "../../assets/Foto_4.jpg";
import foto4 from "../../assets/Foto_3.jpg";
import foto5 from "../../assets/Foto_1.jpg";

const PhotoGallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const photos = [
    { id: 1, src: foto1, alt: "Foto 1" },
    { id: 3, src: foto2, alt: "Foto 2" },
    { id: 4, src: foto3, alt: "Foto 4" },
    { id: 5, src: foto4, alt: "Foto 5" },
    { id: 2, src: foto5, alt: "Foto 3" },
  ];

  const selectedPhoto = photos.find((p) => p.id === selectedId);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {/* 
         CAMBIO PRINCIPAL: 
         En lugar de 'flex' con scroll, usamos 'grid'.
         - grid-cols-2: En móvil se verán 2 columnas (muy estilo Instagram/Pinterest).
         - md:grid-cols-3: En tablet 3 columnas.
         - lg:grid-cols-5: En pantalla grande, las 5 en una fila.
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            layoutId={`card-${photo.id}`}
            onClick={() => setSelectedId(photo.id)}
            // Ajustamos el aspect-ratio para que todas sean uniformes verticalmente
            // aspect-[3/4] es un formato vertical muy elegante para fotos de boda
            className={`relative rounded-lg overflow-hidden cursor-pointer shadow-sm group
              ${i === 0 ? "col-span-2 md:col-span-1" : ""} 
            `}
            // ^ Truco visual: La primera foto ocupa 2 columnas en móvil para destacar, 
            // las demás se acomodan normales.
            
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            {/* Contenedor de proporción 3:4 (vertical) */}
            <div className="aspect-[3/4] w-full bg-gray-100">
                <motion.img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            
            {/* Capa oscura sutil al hacer hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* MODAL / LIGHTBOX (Sin cambios, funciona perfecto) */}
      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-50 bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </button>

            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()} 
            >
              <motion.img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
