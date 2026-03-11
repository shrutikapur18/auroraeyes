import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import HoraryQuestionForm from "@/components/HoraryQuestionForm";
import HoraryChartWheel from "@/components/HoraryChartWheel";
import HoraryInterpretation from "@/components/HoraryInterpretation";
import HoraryPostReadingCTA from "@/components/HoraryPostReadingCTA";
import { supabase } from "@/integrations/supabase/client";
import type { HoraryReading } from "@/lib/horaryAstrology";
import { toast } from "@/hooks/use-toast";

const HoraryHomepageSection = () => {
  const [reading, setReading] = useState<HoraryReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (data: {
    question: string;
    location: string;
    latitude: number;
    longitude: number;
    dateTime: Date;
    timezone: number;
  }) => {
    setIsLoading(true);
    setReading(null);

    try {
      const { data: result, error } = await supabase.functions.invoke("horary-reading", {
        body: {
          question: data.question,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          year: data.dateTime.getFullYear(),
          month: data.dateTime.getMonth() + 1,
          date: data.dateTime.getDate(),
          hours: data.dateTime.getHours(),
          minutes: data.dateTime.getMinutes(),
          seconds: data.dateTime.getSeconds(),
          timezone: data.timezone,
        },
      });

      if (error) throw error;

      setReading({
        chartData: result.chartData,
        interpretation: result.interpretation,
        question: data.question,
        timestamp: data.dateTime.toISOString(),
      });

      setTimeout(() => {
        readingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } catch (err: any) {
      console.error("Horary reading error:", err);
      toast({
        title: "Chart Casting Failed",
        description: err.message || "Could not generate the horary chart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => setReading(null);

  return (
    <section id="horary-section" className="max-w-5xl lg:max-w-6xl mx-auto mt-14 md:mt-20 lg:mt-24 mb-10 lg:mb-14 px-2">
      {/* Section header */}
      <motion.div
        className="text-center mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-4 h-4 text-primary/60" />
          <span className="text-[10px] lg:text-xs font-heading text-primary/60 tracking-[0.3em] uppercase">
            Celestial Guidance
          </span>
          <Star className="w-4 h-4 text-primary/60" />
        </div>

        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl gold-text tracking-wider mb-3 lg:mb-4">
          ✦ Ask a Horary Question ✦
        </h2>

        <p className="text-sm lg:text-base text-muted-foreground font-body max-w-lg lg:max-w-xl mx-auto leading-relaxed">
          Horary astrology answers a specific question based on the exact moment the question is asked.
          The positions of the planets at that instant hold the key to your answer.
        </p>
      </motion.div>

      {/* Desktop: two-column layout / Mobile: stacked */}
      <AnimatePresence mode="wait">
        {!reading ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Two-column layout on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
              {/* Left: description & guidance */}
              <motion.div
                className="hidden lg:block space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-5">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-3">
                    <p className="text-sm text-foreground/80 font-body leading-relaxed">
                      Focus carefully on your question. Horary astrology works best when the question is sincere
                      and clearly defined. Think of a specific yes/no or outcome-based question before you begin.
                    </p>
                    <div className="border-t border-primary/10 pt-3 space-y-2">
                      <p className="text-xs text-foreground/60 font-heading tracking-wider uppercase">Good questions:</p>
                      <ul className="space-y-1.5 text-xs text-muted-foreground italic">
                        <li>• "Will I get the job offer this month?"</li>
                        <li>• "Should I move to a new city?"</li>
                        <li>• "Will this relationship lead to commitment?"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile guidance (unchanged) */}
              <motion.div
                className="lg:hidden max-w-xl mx-auto mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-4">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/70 font-body leading-relaxed italic">
                    Focus carefully on your question. Horary astrology works best when the question is sincere
                    and clearly defined. Think of a specific yes/no or outcome-based question before you begin.
                  </p>
                </div>
              </motion.div>

              {/* Right: question form */}
              <div>
                <HoraryQuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            ref={readingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HoraryChartWheel chartData={reading.chartData} />
            </motion.div>

            <HoraryInterpretation
              question={reading.question}
              chartData={reading.chartData}
              interpretation={reading.interpretation}
              timestamp={reading.timestamp}
            />

            <HoraryPostReadingCTA
              reading={reading}
              onAskAnother={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HoraryHomepageSection;
