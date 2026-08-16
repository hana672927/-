import { useState } from 'react';
import { Lock, Loader as Loader2, Check, CircleAlert as AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export function SettingsAdmin() {
  const { adminPassword, updateAdminPassword, connected } = useStore();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (current !== adminPassword) { setError('Current password is incorrect.'); setStatus('error'); return; }
    if (next.length < 4) { setError('New password must be at least 4 characters.'); setStatus('error'); return; }
    if (next !== confirm) { setError('New passwords do not match.'); setStatus('error'); return; }
    setStatus('loading');
    await updateAdminPassword(next);
    setStatus('done');
    setCurrent(''); setNext(''); setConfirm('');
    setTimeout(() => setStatus('idle'), 2000);
  }

  return (
    <div className="max-w-lg">
      <h3 className="font-serif text-2xl text-cream mb-2">Settings</h3>
      <p className="text-cream/50 text-sm mb-6">Manage your admin password and store configuration.</p>

      <div className="glass rounded-xl p-4 mb-8 border border-gold-300/10">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-cream/30'}`} />
          <div>
            <p className="text-cream text-sm">{connected ? 'Connected to Supabase' : 'Running in demo mode (mock data)'}</p>
            <p className="text-cream/40 text-xs">{connected ? 'All changes sync in real-time across devices.' : 'Connect Supabase to enable real-time sync.'}</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 border border-gold-300/10">
        <h4 className="text-gold-300 text-sm tracking-widest uppercase mb-4 flex items-center gap-2"><Lock className="w-4 h-4" /> Change Admin Password</h4>
        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="text-cream/60 text-xs mb-1 block">Current Password</label>
            <input type="password" className="input-lux" value={current} onChange={(e) => { setCurrent(e.target.value); setStatus('idle'); }} />
          </div>
          <div>
            <label className="text-cream/60 text-xs mb-1 block">New Password</label>
            <input type="password" className="input-lux" value={next} onChange={(e) => { setNext(e.target.value); setStatus('idle'); }} />
          </div>
          <div>
            <label className="text-cream/60 text-xs mb-1 block">Confirm New Password</label>
            <input type="password" className="input-lux" value={confirm} onChange={(e) => { setConfirm(e.target.value); setStatus('idle'); }} />
          </div>
          {status === 'error' && <p className="text-red-400/80 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
          {status === 'done' && <p className="text-emerald-400 text-sm flex items-center gap-2"><Check className="w-4 h-4" /> Password updated successfully.</p>}
          <button type="submit" disabled={status === 'loading'} className="btn-gold inline-flex items-center gap-2 disabled:opacity-50">
            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
