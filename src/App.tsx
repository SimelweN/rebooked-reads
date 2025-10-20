import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

import ErrorBoundary from "./components/ErrorBoundary";
import NetworkErrorBoundary from "./components/NetworkErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import GoogleMapsProvider from "./contexts/GoogleMapsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BookDetails from "./pages/BookDetails";
import SellBook from "./pages/SellBook";
import MyBooks from "./pages/MyBooks";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary level="app">
      <NetworkErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <GoogleMapsProvider>
              <BrowserRouter>
                <AuthProvider>
                  <CartProvider>
                    <ScrollToTop />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/book/:id" element={<BookDetails />} />
                      <Route
                        path="/sell"
                        element={
                          <ProtectedRoute>
                            <SellBook />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/my-books"
                        element={
                          <ProtectedRoute>
                            <MyBooks />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <Orders />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                    <Toaster />
                  </CartProvider>
                </AuthProvider>
              </BrowserRouter>
            </GoogleMapsProvider>
          </ThemeProvider>
        </QueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </NetworkErrorBoundary>
    </ErrorBoundary>
  );
}

export default App;
