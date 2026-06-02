import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FloralDivider from "./FloralDivider";

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
    <section className="py-14 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="font-body text-[10px] tracking-[0.4em] uppercase mb-3"
          style={{ color: "hsl(var(--wedding-text))", opacity: 0.65 }}
        >
          Un vistazo a nuestra historia
        </p>
        <h2
          className="font-brittany text-5xl md:text-6xl"
          style={{ color: "hsl(var(--wedding-olive-light))" }}
        >
          Galería
        </h2>
        <FloralDivider className="mt-4" />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            onClick={() => setSelectedId(photo.id)}
            className={`relative rounded-md overflow-hidden cursor-pointer group
              ${i === 0 ? "col-span-2 md:col-span-1" : ""}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="aspect-[3/4] w-full bg-gray-100">
              <motion.img
                layoutId={`photo-${photo.id}`}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                style={{ borderRadius: 6 }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-md"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            <motion.button
              key="close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed top-6 right-6 z-[60] text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all"
            >
              <X size={22} />
            </motion.button>

            <div
              className="fixed inset-0 z-[55] flex items-center justify-center p-4 pointer-events-none"
              onClick={() => setSelectedId(null)}
            >
              <motion.img
                layoutId={`photo-${selectedId}`}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                style={{ borderRadius: 8 }}
                className="max-w-full max-h-[88vh] object-contain shadow-2xl pointer-events-auto"
                transition={{ type: "spring", stiffness: 380, damping: 42 }}
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
