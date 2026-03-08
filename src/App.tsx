import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Index from "./pages/Index";
import FreeTarotReading from "./pages/FreeTarotReading";
import YesNoTarotReading from "./pages/YesNoTarotReading";
import PickACardReading from "./pages/PickACardReading";
import RuneReading from "./pages/RuneReading";
import AngelCardReading from "./pages/AngelCardReading";
import TarotCardMeanings from "./pages/TarotCardMeanings";
import TarotCardMeaning from "./pages/TarotCardMeaning";
import RuneMeanings from "./pages/RuneMeanings";
import RuneMeaning from "./pages/RuneMeaning";
import ZodiacTarotReading from "./pages/ZodiacTarotReading";
import DailyPage from "./pages/DailyPage";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/free-tarot-reading" element={<FreeTarotReading />} />
            <Route path="/yes-no-tarot-reading" element={<YesNoTarotReading />} />
            <Route path="/pick-a-card-reading" element={<PickACardReading />} />
            <Route path="/rune-reading" element={<RuneReading />} />
            <Route path="/angel-card-reading" element={<AngelCardReading />} />
            <Route path="/tarot-card-meanings" element={<TarotCardMeanings />} />
            <Route path="/tarot-card-meanings/:slug" element={<TarotCardMeaning />} />
            <Route path="/rune-meanings" element={<RuneMeanings />} />
            <Route path="/rune-meanings/:slug" element={<RuneMeaning />} />
            <Route path="/zodiac/:sign" element={<ZodiacTarotReading />} />
            <Route path="/daily-tarot-card" element={<DailyPage />} />
            <Route path="/daily-rune" element={<DailyPage />} />
            <Route path="/daily-angel-message" element={<DailyPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
