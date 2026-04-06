import { useState, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || 'Failed to authenticate');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return null; // Don't render layout if still figuring out auth state, as it will auto-redirect.
  }

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements reminiscent of theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-border/50">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
          <CardDescription className="text-base">
            Secure entry restricted to staff only.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Administrative Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline" onClick={(e) => e.preventDefault()}>
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-border/50 pt-6 pb-6 text-sm text-muted-foreground">
          Protected by Leopard Cave & Resort Admin Systems
        </CardFooter>
      </Card>
    </div>
  );
}
