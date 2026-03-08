import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { DrawnCard } from "@/data/tarotDeck";
import ReadingAudioPlayer from "@/components/ReadingAudioPlayer";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface FollowUpChatProps {
  originalQuestion: string;
  drawnCards: DrawnCard[];
  initialReading: string;
  type?: "tarot" | "rune" | "angel";
  runes?: Array<{
    name: string;
    symbol: string;
    orientation: string;
    position: string;
    meaning: string;
    keywords: string;
  }>;
  angelCards?: Array<{
    name: string;
    position: string;
    meaning: string;
    keywords: string;
  }>;
}

const FollowUpChat = ({
  originalQuestion,
  drawnCards,
  initialReading,
  type = "tarot",
  runes,
  angelCards,
}: FollowUpChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const buildCardData = () => {
    return drawnCards
      .filter((dc) => dc.isRevealed)
      .map((dc) => ({
        name: dc.card.name,
        orientation: dc.isReversed ? "reversed" : "upright",
        position: dc.position || "Selected Card",
        meaning: dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up,
      }));
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const body: Record<string, unknown> = {
        question: originalQuestion,
        type,
        followUp: true,
        conversationHistory: updatedMessages,
      };

      if (type === "tarot") {
        body.cards = buildCardData();
      } else if (type === "rune" && runes) {
        body.runes = runes;
      } else if (type === "angel" && angelCards) {
        body.cards = angelCards;
      }

      const { data, error } = await supabase.functions.invoke("divination-reading", { body });

      if (error) throw error;

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data?.reading || "The spirits are quiet for now. Try rephrasing your question.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error("Follow-up error:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm unable to channel guidance right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-6 py-4 rounded-xl bg-muted/30 border border-primary/20 text-primary font-heading text-sm tracking-widest hover:bg-primary/10 transition-all flex items-center justify-center gap-3"
        >
          <span className="text-lg">✦</span>
          Ask a question about this reading
        </button>
      ) : (
        <motion.div
          className="reading-panel rounded-xl overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
            <h3 className="font-heading text-sm gold-text tracking-wider flex items-center gap-2">
              <span>✦</span> Continue Your Reading
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Minimize
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="max-h-80 overflow-y-auto px-6 py-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-4">
                Ask anything about the {type === "rune" ? "runes" : "cards"} drawn for you. Your reader remembers every detail of your spread.
              </p>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/15 text-foreground border border-primary/20"
                        : "bg-muted/40 text-foreground border border-border/20"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="text-xs text-primary/60 font-heading block mb-1">Your Reader</span>
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.role === "assistant" && (
                      <div className="mt-2">
                        {activeAudio === msg.content ? (
                          <ReadingAudioPlayer reading={msg.content} />
                        ) : (
                          <button
                            onClick={() => setActiveAudio(msg.content)}
                            className="text-xs text-primary/50 hover:text-primary transition-colors flex items-center gap-1"
                          >
                            🔊 Listen
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-muted/40 border border-border/20 rounded-lg px-4 py-3">
                  <span className="text-xs text-primary/60 font-heading block mb-1">Your Reader</span>
                  <div className="flex gap-1.5 items-center py-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-border/30">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What does the reversed card mean for my love life?"
                className="flex-1 bg-muted/20 border border-border/30 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 font-body"
                disabled={isLoading}
                maxLength={500}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 rounded-lg bg-primary/20 border border-primary/30 text-primary font-heading text-xs tracking-wider hover:bg-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ask
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FollowUpChat;
