import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Components from "./pages/Components";
import Circuit from "./pages/Circuit";
import Code from "./pages/Code";
import Working from "./pages/Working";
import Team from "./pages/Team";
import Benefits from "./pages/Benefits";
import Future from "./pages/Future";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/components" element={<Components />} />
            <Route path="/circuit" element={<Circuit />} />
            <Route path="/code" element={<Code />} />
            <Route path="/working" element={<Working />} />
            <Route path="/team" element={<Team />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/future" element={<Future />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
