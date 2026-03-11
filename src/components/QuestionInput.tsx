import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  disabled?: boolean;
}

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

const QuestionInput = ({ question, setQuestion, disabled }: QuestionInputProps) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const speechSupported = !!SpeechRecognition;

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    let finalTranscript = question;

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript = transcript;
        } else {
          interim = transcript;
        }
      }
      setQuestion(finalTranscript || interim);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
    setListening(true);
  }, [listening, question, setQuestion]);

  return (
    <motion.div
      className="max-w-lg lg:max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-10 relative z-10 px-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <label className="block text-sm lg:text-base font-heading text-primary mb-2 tracking-widest uppercase">
        Ask your question
      </label>
      <p className="text-xs lg:text-sm text-muted-foreground mb-3 italic">
        Take a moment to focus on your question before beginning the reading.
      </p>
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled}
          placeholder="What do you seek guidance on?"
          className="w-full px-4 md:px-5 lg:px-6 py-4 lg:py-5 pr-14 rounded-xl bg-muted/60 border border-border/60 text-foreground text-base lg:text-lg placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all disabled:opacity-50 backdrop-blur-sm"
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
          background: "linear-gradient(135deg, hsl(var(--gold) / 0.03), transparent, hsl(var(--gold) / 0.03))",
        }} />

        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            disabled={disabled}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all z-10 ${
              listening
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-muted/40 active:bg-primary/15"
            } disabled:opacity-50`}
            title={listening ? "Stop listening" : "Speak your question"}
          >
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {listening && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-3"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-primary"
                  animate={{ height: [4, 16, 4] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-heading text-primary tracking-widest animate-pulse">
              Listening…
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionInput;
