import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CircleCheck as CheckCircle2, Loader as Loader2 } from 'lucide-react';
import { useStore } from '@/lib/store';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, submitOrder, clearCart, content } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    setStatus('loading');
    setError('');
    const ok = await submitOrder({
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      notes: form.notes,
      items: cart,
      total: cartTotal,
    });
    if (ok) {
      setStatus('success');
      clearCart();
      setForm({ name: '', phone: '', address: '', city: '', notes: '' });
      setTimeout(() => { setStatus('idle'); onClose(); }, 3000);
    } else {
      setStatus('error');
      setError('Something went wrong submitting your order. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-dark rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-lux border border-gold-300/20 p-8"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                  <CheckCircle2 className="w-20 h-20 text-gold-300 mx-auto mb-6" />
                </motion.div>
                <h2 className="font-serif text-3xl gold-text mb-3">Order Confirmed</h2>
                <p className="text-cream/60">Thank you, {form.name || 'darling'}. Your fragrance is on its way.</p>
                <p className="text-cream/40 text-sm mt-4">We'll contact you on {form.phone} shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl gold-text">Checkout</h2>
                  <button onClick={onClose} className="text-cream/60 hover:text-gold-300"><X className="w-6 h-6" /></button>
                </div>

                {/* order summary */}
                <div className="glass rounded-xl p-4 mb-6 border border-gold-300/10">
                  <p className="text-gold-300/80 text-xs tracking-widest uppercase mb-3">Order Summary</p>
                  {cart.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm text-cream/70 py-1">
                      <span>{i.title} × {i.quantity}</span>
                      <span>${(i.price * i.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-serif text-xl text-gold-200 mt-3 pt-3 border-t border-gold-300/15">
                    <span>Total</span><span>${cartTotal.toFixed(0)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gold-300/70 text-xs tracking-widest uppercase">Full Name *</label>
                    <input className="input-lux mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-gold-300/70 text-xs tracking-widest uppercase">Phone / WhatsApp *</label>
                    <input className="input-lux mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (800) 555-0199" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gold-300/70 text-xs tracking-widest uppercase">City</label>
                      <input className="input-lux mt-1" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Your city" />
                    </div>
                    <div>
                      <label className="text-gold-300/70 text-xs tracking-widest uppercase">Address</label>
                      <input className="input-lux mt-1" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Delivery address" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gold-300/70 text-xs tracking-widest uppercase">Special Notes</label>
                    <textarea className="input-lux mt-1 resize-none" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Gift wrap, delivery instructions..." />
                  </div>

                  {error && <p className="text-red-400/80 text-sm">{error}</p>}

                  <button type="submit" disabled={status === 'loading'} className="btn-gold w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
                    {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</> : 'Place Order'}
                  </button>
                  <p className="text-cream/30 text-xs text-center">By placing your order, you agree to our terms.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
