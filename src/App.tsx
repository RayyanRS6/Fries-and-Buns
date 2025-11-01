import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import MenuManagement from "./pages/admin/MenuManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<><Header /><Index /><Footer /></>} />
                <Route path="/menu" element={<><Header /><Menu /><Footer /></>} />
                <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
                <Route path="/checkout" element={<><Header /><Checkout /><Footer /></>} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Admin routes - protected */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/menu"
                  element={
                    <ProtectedRoute requireAdmin>
                      <MenuManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                
                {/* 404 route */}
                <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
