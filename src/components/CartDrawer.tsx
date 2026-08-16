import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, updateQty, removeFromCart, cartTotal, clearCart, content } = useStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[50] bg-obsidian/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-[51] w-full sm:w-[440px] glass-dark border-l border-gold-300/20 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gold-300/15">
              <h2 className="font-serif text-2xl gold-text flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold-300"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-lux p-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                  <p className="text-cream/40 font-serif text-xl">Your cart is empty</p>
                  <p className="text-cream/30 text-sm mt-2">Discover your signature scent</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 50 }}
                      className="glass rounded-xl p-4 flex gap-4 items-center border border-gold-300/10"
                    >
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-cream">{item.title}</h3>
                        <p className="text-gold-300 text-sm">${item.price.toFixed(0)}</p>
                      </div>
                      <div className="flex items-center border border-gold-300/30 rounded-full">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1.5 text-cream/70 hover:text-gold-300">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-cream text-sm w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1.5 text-cream/70 hover:text-gold-300">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-cream/40 hover:text-red-400/70 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                  <button onClick={clearCart} className="text-cream/40 hover:text-red-400/60 text-xs tracking-widest uppercase transition-colors">
                    Clear cart
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gold-300/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-cream/60 text-sm tracking-widest uppercase">Total</span>
                  <span className="font-serif text-3xl gold-text">${cartTotal.toFixed(0)}</span>
                </div>
                <button onClick={onCheckout} className="btn-gold w-full">
                  {content.button_checkout}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
