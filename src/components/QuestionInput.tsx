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
      className="max-w-lg lg:max-w-2xl mx-auto mb-8 md:mb-10 lg:mb-12 relative z-10 px-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      {/* Decorative line */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/20" />
        <span className="text-primary/30 text-xs">✦</span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/20" />
      </div>

      <label className="block text-sm lg:text-base font-heading text-primary/80 mb-2 tracking-[0.15em] text-center">
        Focus on your question
      </label>
      <p className="text-[11px] lg:text-xs text-muted-foreground/60 mb-4 italic text-center">
        Your intention deepens the reading — but it is not required
      </p>
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled}
          placeholder="What truth do you seek..."
          className="w-full px-5 md:px-6 lg:px-8 py-4 lg:py-5 pr-14 rounded-xl bg-card/40 border border-border/30 text-foreground text-base lg:text-lg placeholder:text-muted-foreground/40 font-body focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/20 transition-all duration-500 disabled:opacity-50 backdrop-blur-xl"
        />

        {speechSupported && (
          <button
            type="button"
            onClick={toggleListening}
            disabled={disabled}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 z-10 ${
              listening
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground/40 hover:text-primary/60 hover:bg-muted/20"
            } disabled:opacity-50`}
            title={listening ? "Stop listening" : "Speak your question"}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
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
                  className="w-0.5 rounded-full bg-primary/60"
                  animate={{ height: [3, 14, 3] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-heading text-primary/50 tracking-[0.2em]">
              Listening...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionInput;
