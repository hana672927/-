import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import { useStore } from '@/lib/store';

interface AdminLoginProps {
  onSuccess: () => void;
  onExit: () => void;
}

export function AdminLogin({ onSuccess, onExit }: AdminLoginProps) {
  const { adminPassword } = useStore();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === adminPassword) {
      sessionStorage.setItem('verdor_admin', '1');
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full radial-gold opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-3xl p-8 max-w-md w-full border border-gold-300/20 relative z-10"
      >
        <button onClick={onExit} className="text-cream/50 hover:text-gold-300 text-sm flex items-center gap-2 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to store
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full glass border border-gold-300/30 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-gold-300" />
          </div>
          <h1 className="font-serif text-3xl gold-text mb-2">Admin Panel</h1>
          <p className="text-cream/50 text-sm">Enter your password to manage the store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Admin password"
            className="input-lux text-center"
          />
          {error && <p className="text-red-400/80 text-sm text-center">Incorrect password. Try again.</p>}
          <button type="submit" className="btn-gold w-full">Enter</button>
        </form>
        <p className="text-cream/30 text-xs text-center mt-6">Default password: batttt</p>
      </motion.div>
    </div>
  );
}
