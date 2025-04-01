
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlanetPage from "./pages/PlanetPage";
import IntersectionPage from "./pages/IntersectionPage";
import About from "./pages/About";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import CustomPlanetPage from "./pages/CustomPlanetPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planet/:planetId" element={<PlanetPage />} />
          <Route path="/intersection/:intersectionId" element={<IntersectionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/custom-planet/:tagName/:systemName/:planetId" element={<CustomPlanetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
