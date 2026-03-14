import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-primary-foreground font-display text-xl font-bold">DS</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Panel Admin</h1>
          <p className="text-muted-foreground text-sm">Desa Wisata Semayang</p>
        </div>
        <form onSubmit={handleLogin} className="bg-card p-6 rounded-xl shadow-md border border-border space-y-4">
          {errorMsg && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 text-center">
              Email atau password salah.
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@desa.com" required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={loading} />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
