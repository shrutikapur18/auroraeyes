import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Loader2 } from "lucide-react";

interface ReadingAudioPlayerProps {
  reading: string;
}

const ReadingAudioPlayer = ({ reading }: ReadingAudioPlayerProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [ambientOn, setAmbientOn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval>>();

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(progressInterval.current);
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      ambientRef.current?.pause();
    };
  }, []);

  const startProgressTracking = useCallback(() => {
    clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    }, 200);
  }, []);

  const handleListen = useCallback(async () => {
    // If we already have audio loaded, just play it
    if (audioRef.current && status === "paused") {
      audioRef.current.play();
      setStatus("playing");
      startProgressTracking();
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: reading }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setStatus("idle");
        setProgress(0);
        clearInterval(progressInterval.current);
      };

      await audio.play();
      setStatus("playing");
      startProgressTracking();
    } catch (err) {
      console.error("TTS error:", err);
      setErrorMsg("Could not generate audio. Please try again.");
      setStatus("error");
    }
  }, [reading, status, startProgressTracking]);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setStatus("paused");
    clearInterval(progressInterval.current);
  }, []);

  const handleRestart = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setStatus("playing");
      startProgressTracking();
    }
  }, [startProgressTracking]);

  const toggleAmbient = useCallback(() => {
    if (!ambientRef.current) {
      // Use a gentle ambient tone via Web Audio API
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(174, ctx.currentTime); // Solfeggio healing frequency
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(285, ctx.currentTime);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.02, ctx.currentTime);
      osc.connect(gain).connect(ctx.destination);
      osc2.connect(gain2).connect(ctx.destination);
      osc.start();
      osc2.start();
      // Store context for cleanup
      (ambientRef as any).current = { ctx, stop: () => { osc.stop(); osc2.stop(); ctx.close(); } };
      setAmbientOn(true);
    } else {
      (ambientRef.current as any).stop?.();
      ambientRef.current = null;
      setAmbientOn(false);
    }
  }, []);

  return (
    <motion.div
      className="mt-6 pt-6 border-t border-primary/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {/* Main listen button */}
      {status === "idle" && (
        <motion.button
          onClick={handleListen}
          className="mx-auto flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-heading text-sm tracking-widest hover:bg-primary/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Volume2 className="w-4 h-4" />
          Listen to Your Reading
        </motion.button>
      )}

      {/* Loading state */}
      {status === "loading" && (
        <div className="flex items-center justify-center gap-3 text-primary/70">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="font-heading text-xs tracking-widest animate-pulse">Preparing your reading...</span>
        </div>
      )}

      {/* Player controls */}
      <AnimatePresence>
        {(status === "playing" || status === "paused") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Progress bar */}
            <div className="w-full h-1 rounded-full bg-muted/30 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="p-2 rounded-full hover:bg-muted/30 text-muted-foreground hover:text-primary transition-all"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={status === "playing" ? handlePause : handleListen}
                className="p-3 rounded-full bg-primary/15 border border-primary/30 text-primary hover:bg-primary/25 transition-all"
                title={status === "playing" ? "Pause" : "Play"}
              >
                {status === "playing" ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleAmbient}
                className={`p-2 rounded-full hover:bg-muted/30 transition-all ${ambientOn ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                title={ambientOn ? "Turn off ambient sound" : "Turn on ambient sound"}
              >
                {ambientOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-center text-[10px] text-muted-foreground/60">
              {ambientOn ? "♫ Ambient healing tones" : "Ambient sound off"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {status === "error" && (
        <div className="text-center space-y-2">
          <p className="text-xs text-destructive">{errorMsg}</p>
          <button
            onClick={() => { setStatus("idle"); setErrorMsg(""); }}
            className="text-xs text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReadingAudioPlayer;
