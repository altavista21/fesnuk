import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Friends from "./pages/Friends";
import Watch from "./pages/Watch";
import Marketplace from "./pages/Marketplace";
import Groups from "./pages/Groups";
import Pages from "./pages/Pages";
import { UserProvider } from "@/context/UserContext";
import { NotificationProvider } from "@/context/NotificationContext";

const queryClient = new QueryClient();

const App = () => (
  <NotificationProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/pages" element={<Pages />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </UserProvider>
  </NotificationProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
