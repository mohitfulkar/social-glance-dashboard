import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideNavigation } from "./components/SideNavigation";
import Home from "./pages/Home";
import Index from "./pages/Index";
import SocialMediaDashboard from "./pages/SocialMediaDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Client Browse page */}
          <Route path="/clients" element={<Index />} />

          {/* Routes with sidebar */}
          <Route path="/dashboard/:clientId" element={<ClientDashboard />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Legacy route - will be removed */}
          <Route
            path="/dashboard/old/:clientId"
            element={<SocialMediaDashboard />}
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
