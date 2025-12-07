import { useState, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ChatButton } from "./components/chatbot";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
// ScrollProgress removed for faster UX
import PageTransition from "./components/PageTransition";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Developer = lazy(() => import("./pages/Developer"));
const Documentation = lazy(() => import("./pages/Documentation"));
const About = lazy(() => import("./pages/About"));
const Reseller = lazy(() => import("./pages/Reseller"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLeads = lazy(() => import("./pages/admin/Leads"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/developer" element={<PageTransition><Developer /></PageTransition>} />
          <Route path="/documentation" element={<PageTransition><Documentation /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/reseller" element={<PageTransition><Reseller /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/leads" element={<PageTransition><AdminLeads /></PageTransition>} />
          <Route path="/admin/analytics" element={<PageTransition><AdminAnalytics /></PageTransition>} />
          <Route path="/admin/testimonials" element={<PageTransition><AdminTestimonials /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading on first visit in session
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('hasVisited');
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
            <CustomCursor />
            
            <div className={`min-h-screen flex flex-col ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <Header />
              <main className="flex-1">
                <ErrorBoundary>
                  <AnimatedRoutes />
                </ErrorBoundary>
              </main>
              <Footer />
              <ChatButton />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
