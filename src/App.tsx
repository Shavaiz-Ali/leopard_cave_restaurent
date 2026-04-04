import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import IntersectObserver from '@/components/common/IntersectObserver';
import ScrollToTop from '@/components/common/ScrollToTop';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Toaster } from '@/components/ui/sonner';
import BaseLayout from '@/components/layout/BaseLayout';
import routes from './routes';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <LoadingScreen />
        <ScrollToTop />
        <IntersectObserver />
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
        <Toaster />
      </Router>
    </HelmetProvider>
  );
};

export default App;
