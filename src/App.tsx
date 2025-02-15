
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import TicketBooking from "./pages/TicketBooking";
import StudentVisa from "./pages/StudentVisa";
import BusinessVisa from "./pages/BusinessVisa";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BestDeals from "./pages/BestDeals";
import ItineraryGenerator from "./pages/ItineraryGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tickets" element={<TicketBooking />} />
          <Route path="/visa/student" element={<StudentVisa />} />
          <Route path="/visa/business" element={<BusinessVisa />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/deals" element={<BestDeals />} />
          <Route path="/planner" element={<ItineraryGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
