import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Kitchen from "./pages/rooms/Kitchen";
import Bedroom from "./pages/rooms/Bedroom";
import MasterBedroom from "./pages/rooms/MasterBedroom";
import Hall from "./pages/rooms/Hall";
import LivingRoom from "./pages/rooms/LivingRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/bedroom" element={<Bedroom />} />
          <Route path="/master-bedroom" element={<MasterBedroom />} />
          <Route path="/hall" element={<Hall />} />
          <Route path="/living-room" element={<LivingRoom />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
