import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import foto1 from "../../assets/Foto_13.webp";
import foto2 from "../../assets/Foto_12.webp";
import foto3 from "../../assets/Foto_4.webp";
import foto4 from "../../assets/Foto_3.webp";
import foto5 from "../../assets/Foto_1.webp";

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            onClick={() => setSelectedId(photo.id)}
            className={`relative rounded-lg overflow-hidden cursor-pointer shadow-sm group
              ${i === 0 ? "col-span-2 md:col-span-1" : ""}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="aspect-[3/4] w-full bg-gray-100">
              <motion.img
                layoutId={`photo-${photo.id}`}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                style={{ borderRadius: 8 }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <>
            {/* Fondo oscuro con su propio fade, independiente de la imagen */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            <motion.button
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed top-6 right-6 z-[60] text-white/80 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* La imagen vuela directamente desde el thumbnail al centro */}
            <div
              className="fixed inset-0 z-[55] flex items-center justify-center p-4 pointer-events-none"
              onClick={() => setSelectedId(null)}
            >
              <motion.img
                layoutId={`photo-${selectedId}`}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                style={{ borderRadius: 8 }}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl pointer-events-auto"
                transition={{ type: "spring", stiffness: 400, damping: 45 }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
