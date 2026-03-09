import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    console.log('Login attempt:', { username, password });
    navigate('/admin/dashboard');
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
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Masukkan username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan password" />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Masuk</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
