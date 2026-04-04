import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for page to fully load
    const handleLoad = () => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="animate-fade-pulse">
          <img
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg"
            alt="Leopard Cave Restaurant Logo"
            className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-full shadow-2xl"
          />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Leopard Cave Restaurant</h2>
          <p className="text-sm md:text-base text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
