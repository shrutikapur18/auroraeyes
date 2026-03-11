import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic } from "lucide-react";

interface ReadingAudioPlayerProps {
  reading: string;
}

type PlayerStatus = "idle" | "playing" | "paused" | "error";

const ReadingAudioPlayer = ({ reading }: ReadingAudioPlayerProps) => {
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [ambientOn, setAmbientOn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const ambientRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      ambientRef.current?.stop?.();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const getCalmerVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Karen", "Moira", "Fiona", "Google UK English Female", "Microsoft Zira"];
    for (const name of preferred) {
      const v = voices.find((v) => v.name.includes(name));
      if (v) return v;
    }
    return voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) || voices.find((v) => v.lang.startsWith("en")) || null;
  }, []);

  const handleSpeak = useCallback(() => {
    if (!speechSupported) return;

    if (status === "paused" && utteranceRef.current) {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = reading.replace(/\*\*/g, "").replace(/[✦🔮]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.85;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    const voice = getCalmerVoice();
    if (voice) utterance.voice = voice;

    const words = cleanText.split(/\s+/).length;
    let wordIndex = 0;

    utterance.onboundary = (e) => {
      if (e.name === "word") {
        wordIndex++;
        setProgress((wordIndex / words) * 100);
      }
    };

    utterance.onend = () => {
      setStatus("idle");
      setProgress(0);
    };

    utterance.onerror = () => {
      setStatus("error");
      setErrorMsg("Speech synthesis failed. Please try again.");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  }, [reading, status, speechSupported, getCalmerVoice]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setStatus("paused");
  }, []);

  const handleRestart = useCallback(() => {
    window.speechSynthesis.cancel();
    setStatus("idle");
    setProgress(0);
    setTimeout(() => handleSpeak(), 50);
  }, [handleSpeak]);

  const toggleAmbient = useCallback(() => {
    if (!ambientRef.current) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(174, ctx.currentTime);
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
      ambientRef.current = { ctx, stop: () => { osc.stop(); osc2.stop(); ctx.close(); } };
      setAmbientOn(true);
    } else {
      ambientRef.current.stop?.();
      ambientRef.current = null;
      setAmbientOn(false);
    }
  }, []);

  if (!speechSupported) return null;

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
          onClick={handleSpeak}
          className="mx-auto flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-heading text-sm tracking-widest hover:bg-primary/20 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Volume2 className="w-4 h-4" />
          Listen to Your Reading
        </motion.button>
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
            <div className="w-full h-1 rounded-full bg-muted/30 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="p-2 rounded-full hover:bg-muted/30 text-muted-foreground hover:text-primary transition-all"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={status === "playing" ? handlePause : handleSpeak}
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
              Voice reading · Browser TTS
              {ambientOn ? " · ♫ Ambient tones" : ""}
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
