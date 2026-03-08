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
import DailyTarotReading from "./pages/DailyTarotReading";
import TarotReadingArchive from "./pages/TarotReadingArchive";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import TarotGuide from "./pages/TarotGuide";
import RuneGuide from "./pages/RuneGuide";
import AngelCardsGuide from "./pages/AngelCardsGuide";
import TarotSpreads from "./pages/TarotSpreads";
import SpreadGuidePage from "./pages/SpreadGuidePage";
import TarotCombinations from "./pages/TarotCombinations";
import TarotCombinationPage from "./pages/TarotCombinationPage";
import TarotCardContext from "./pages/TarotCardContext";
import TarotComparison from "./pages/TarotComparison";
import TarotComparisons from "./pages/TarotComparisons";
import QuestionReadingPage from "./pages/QuestionReadingPage";
import SharedReadingPreview from "./pages/SharedReadingPreview";
import HoraryReading from "./pages/HoraryReading";
import HTMLSitemap from "./pages/HTMLSitemap";
import NotFound from "./pages/NotFound";
import { questionPages } from "./data/seoData";

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
            <Route path="/tarot-card-meanings/:slug/:context" element={<TarotCardContext />} />
            <Route path="/rune-meanings" element={<RuneMeanings />} />
            <Route path="/rune-meanings/:slug" element={<RuneMeaning />} />
            <Route path="/zodiac/:sign" element={<ZodiacTarotReading />} />
            <Route path="/daily-tarot-card" element={<DailyPage />} />
            <Route path="/daily-rune" element={<DailyPage />} />
            <Route path="/daily-angel-message" element={<DailyPage />} />
            {/* Daily tarot reading pages */}
            <Route path="/daily-tarot-reading" element={<DailyTarotReading />} />
            <Route path="/tarot-reading-for-:dateSlug" element={<DailyTarotReading />} />
            <Route path="/tarot-reading-archive" element={<TarotReadingArchive />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            {/* Hub / Pillar pages */}
            <Route path="/tarot-guide" element={<TarotGuide />} />
            <Route path="/rune-guide" element={<RuneGuide />} />
            <Route path="/angel-cards-guide" element={<AngelCardsGuide />} />
            {/* Spread guides */}
            <Route path="/tarot-spreads" element={<TarotSpreads />} />
            <Route path="/tarot-spreads/:slug" element={<SpreadGuidePage />} />
            {/* Combinations */}
            <Route path="/tarot-combinations" element={<TarotCombinations />} />
            <Route path="/tarot-combinations/:slug" element={<TarotCombinationPage />} />
            {/* Comparisons */}
            <Route path="/tarot-comparisons" element={<TarotComparisons />} />
            <Route path="/tarot-comparisons/:slug" element={<TarotComparison />} />
            {/* Question-based reading pages */}
            {questionPages.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<QuestionReadingPage />} />
            ))}
            {/* Horary Astrology */}
            <Route path="/horary-reading" element={<HoraryReading />} />
            {/* HTML Sitemap */}
            <Route path="/sitemap-html" element={<HTMLSitemap />} />
            {/* Shared reading preview */}
            <Route path="/shared-reading" element={<SharedReadingPreview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
