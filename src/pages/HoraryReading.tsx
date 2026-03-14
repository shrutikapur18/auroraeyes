import { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import HoraryQuestionForm from "@/components/HoraryQuestionForm";
import HoraryChartWheel from "@/components/HoraryChartWheel";
import HoraryInterpretation from "@/components/HoraryInterpretation";
import HoraryFollowUpChat from "@/components/HoraryFollowUpChat";
import { supabase } from "@/integrations/supabase/client";
import type { HoraryChartData, HoraryReading as HoraryReadingType } from "@/lib/horaryAstrology";
import { toast } from "@/hooks/use-toast";

const HoraryReading = () => {
  const [reading, setReading] = useState<HoraryReadingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <SEOHead
        title="Horary Astrology Reading – Ask the Stars"
        description="Get a free horary astrology reading. Ask a question and receive an astrological chart cast for the exact moment, with AI-powered interpretation."
        canonicalPath="/horary-reading"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Horary Astrology Reading",
          description: "Free horary astrology chart and interpretation based on the moment a question is asked.",
          applicationCategory: "Lifestyle",
          operatingSystem: "Web",
        }}
      />

      <div className="max-w-4xl mx-auto py-8 md:py-14">
        {/* Hero */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl gold-text tracking-wider mb-3">
            ✦ Horary Astrology ✦
          </h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
            Ask a question and the stars will answer. Horary astrology reads the
            celestial map at the exact moment your question takes form — revealing
            hidden guidance through planetary positions and house placements.
          </p>
        </motion.div>

        {!reading ? (
          <HoraryQuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <div className="space-y-10">
            {/* Chart wheel */}
            <HoraryChartWheel chartData={reading.chartData} />

            {/* Interpretation */}
            <HoraryInterpretation
              question={reading.question}
              chartData={reading.chartData}
              interpretation={reading.interpretation}
              timestamp={reading.timestamp}
            />

            {/* Follow-up chat — reuses same chart */}
            <HoraryFollowUpChat
              originalQuestion={reading.question}
              chartData={reading.chartData}
              interpretation={reading.interpretation}
            />

            {/* Ask another */}
            <div className="text-center">
              <button
                onClick={() => setReading(null)}
                className="font-heading text-xs text-primary/70 hover:text-primary tracking-wider transition-colors"
              >
                ✦ Ask a New Question (generates new chart)
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HoraryReading;
