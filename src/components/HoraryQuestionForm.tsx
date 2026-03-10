import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, HelpCircle, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getTimezoneOffset } from "@/lib/horaryAstrology";
import { toast } from "@/hooks/use-toast";

interface HoraryQuestionFormProps {
  onSubmit: (data: {
    question: string;
    location: string;
    latitude: number;
    longitude: number;
    dateTime: Date;
    timezone: number;
  }) => void;
  isLoading: boolean;
}

const HoraryQuestionForm = ({ onSubmit, isLoading }: HoraryQuestionFormProps) => {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [useCurrentTime, setUseCurrentTime] = useState(true);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCustomDate(now.toISOString().split("T")[0]);
    setCustomTime(now.toTimeString().slice(0, 5));
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Unavailable",
        description: "Your browser does not support geolocation. Please enter your city manually.",
        variant: "destructive",
      });
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(4));
        setLongitude(pos.coords.longitude.toFixed(4));
        setLocation("Current Location");
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        toast({
          title: "Location Detection Failed",
          description: "Location detection failed. Please enter your city manually.",
          variant: "destructive",
        });
      },
      { timeout: 10000 }
    );
  };

  const lookupCity = useCallback(async () => {
    const city = location.trim();
    if (!city || city === "Current Location") return;
    setCityLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,
        { headers: { "User-Agent": "MysticDivination/1.0" } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLatitude(parseFloat(data[0].lat).toFixed(4));
        setLongitude(parseFloat(data[0].lon).toFixed(4));
      } else {
        toast({
          title: "City Not Found",
          description: "Could not find coordinates for that city. Please check the spelling or enter coordinates manually.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Lookup Failed",
        description: "Could not look up city coordinates. Please enter them manually.",
        variant: "destructive",
      });
    } finally {
      setCityLoading(false);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !latitude || !longitude) return;

    const dateTime = useCurrentTime
      ? new Date()
      : new Date(`${customDate}T${customTime}`);

    onSubmit({
      question: question.trim(),
      location: location || "Unknown",
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      dateTime,
      timezone: getTimezoneOffset(),
    });
  };

  const isValid = question.trim().length > 5 && latitude && longitude;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Question */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-heading text-sm text-primary tracking-wider">
          <HelpCircle className="w-4 h-4" />
          Your Question
        </label>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a specific yes/no question… e.g. 'Will I get the job offer this month?'"
          className="bg-card/50 border-border/40 text-foreground placeholder:text-muted-foreground/50 min-h-[100px] font-body"
          maxLength={300}
        />
        <p className="text-[10px] text-muted-foreground">
          Horary astrology works best with specific, time-sensitive questions.
        </p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-heading text-sm text-primary tracking-wider">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <div className="flex gap-2">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name (e.g. London, New York)"
            className="bg-card/50 border-border/40 text-foreground placeholder:text-muted-foreground/50 font-body"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                lookupCity();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={lookupCity}
            disabled={cityLoading || !location.trim()}
            className="shrink-0 border-primary/30 text-primary hover:bg-primary/10"
            title="Look up city coordinates"
          >
            {cityLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={detectLocation}
            disabled={geoLoading}
            className="shrink-0 border-primary/30 text-primary hover:bg-primary/10"
          >
            {geoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Detect"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude (e.g. 40.7128)"
            className="bg-card/50 border-border/40 text-foreground placeholder:text-muted-foreground/50 text-xs font-body"
          />
          <Input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude (e.g. -74.0060)"
            className="bg-card/50 border-border/40 text-foreground placeholder:text-muted-foreground/50 text-xs font-body"
          />
        </div>
      </div>

      {/* Date/Time */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-heading text-sm text-primary tracking-wider">
          <Clock className="w-4 h-4" />
          Question Time
        </label>
        <div className="flex gap-3 items-center">
          <label className="flex items-center gap-2 text-xs text-foreground/80 cursor-pointer">
            <input
              type="radio"
              checked={useCurrentTime}
              onChange={() => setUseCurrentTime(true)}
              className="accent-primary"
            />
            Now
          </label>
          <label className="flex items-center gap-2 text-xs text-foreground/80 cursor-pointer">
            <input
              type="radio"
              checked={!useCurrentTime}
              onChange={() => setUseCurrentTime(false)}
              className="accent-primary"
            />
            Custom
          </label>
        </div>
        {!useCurrentTime && (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="bg-card/50 border-border/40 text-foreground font-body text-xs"
            />
            <Input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="bg-card/50 border-border/40 text-foreground font-body text-xs"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wider"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Casting Chart…
          </span>
        ) : (
          "✦ Cast Horary Chart"
        )}
      </Button>
    </motion.form>
  );
};

export default HoraryQuestionForm;
