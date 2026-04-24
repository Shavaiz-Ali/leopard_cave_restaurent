import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import IntersectObserver from '@/components/common/IntersectObserver';
import ScrollToTop from '@/components/common/ScrollToTop';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Toaster } from '@/components/ui/sonner';
import BaseLayout from '@/components/layout/BaseLayout';
import routes from './routes';
import adminRoutes from './adminRoutes';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReservationProvider } from '@/contexts/ReservationContext';
import ReservationPopup from '@/components/common/ReservationPopup';

const App: React.FC = () => {
  const isAdminDomain = window.location.hostname.includes('admin');
  // const isAdminDomain = true;

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ReservationProvider>
            <LoadingScreen />
            <ScrollToTop />
            <IntersectObserver />
            {isAdminDomain ? (
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-background text-foreground">Loading...</div>}>
              <Routes>
                {adminRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          ) : (
            <BaseLayout>
              <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-background text-foreground">Loading...</div>}>
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </BaseLayout>
          )}
          <Toaster />
          <ReservationPopup />
          </ReservationProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
