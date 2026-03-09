import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  src: string;
  volume?: number;
};

const BackgroundMusic = ({ src, volume = 0.15 }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Creamos el audio
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    // Intentamos reproducir automáticamente
    const playAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        // Si el autoplay es bloqueado, esperamos interacción del usuario
        console.log("Autoplay bloqueado, esperando interacción del usuario:", err);
        setPlaying(false);
        
        // Agregamos un event listener para reproducir cuando el usuario interactúe
        const handleFirstInteraction = async () => {
          try {
            await audio.play();
            setPlaying(true);
            setHasInteracted(true);
            // Removemos los event listeners después de la primera interacción exitosa
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
          } catch (error) {
            console.log("Error al reproducir después de interacción:", error);
          }
        };

        // Solo agregamos los listeners si no ha habido interacción aún
        if (!hasInteracted) {
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('touchstart', handleFirstInteraction);
          document.addEventListener('keydown', handleFirstInteraction);
        }

        // Limpieza de los event listeners
        return () => {
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
        };
      }
    };

    playAudio();

    // Limpieza al desmontar
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume, hasInteracted]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
        setHasInteracted(true);
      } catch (err) {
        setPlaying(false);
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 9999,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "hsl(var(--wedding-olive-light) / 0.9)",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.background = "hsl(var(--wedding-olive))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "hsl(var(--wedding-olive-light) / 0.9)";
      }}
    >
      {playing ? (
        <Pause size={20} strokeWidth={2} />
      ) : (
        <Play size={20} strokeWidth={2} />
      )}
    </motion.button>
  );
};

export default BackgroundMusic;