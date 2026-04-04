import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => navigate(-1)}
      className="fixed top-20 left-4 md:left-8 z-50 rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300 bg-background/95 backdrop-blur-sm border-2"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </Button>
  );
}
