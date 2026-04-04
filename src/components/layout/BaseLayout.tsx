import { Navbar, Footer } from './Navbar';
import { ReactNode } from 'react';

export default function BaseLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
