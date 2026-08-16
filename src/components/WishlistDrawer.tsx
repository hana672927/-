import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { PerfumeBottle } from './PerfumeBottle';
import type { Product } from '@/lib/types';

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  onView: (p: Product) => void;
}

export function WishlistDrawer({ open, onClose, onView }: WishlistDrawerProps) {
  const { wishlist, products, addToCart, toggleWishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

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
                <Heart className="w-5 h-5" /> Wishlist
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold-300"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-lux p-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <Heart className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                  <p className="text-cream/40 font-serif text-xl">No favourites yet</p>
                  <p className="text-cream/30 text-sm mt-2">Tap the heart on any fragrance</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 50 }}
                      className="glass rounded-xl p-4 flex gap-4 items-center border border-gold-300/10"
                    >
                      <button onClick={() => { onView(item); onClose(); }} className="w-16 h-16 rounded-lg overflow-hidden bg-forest-200/30 flex items-center justify-center shrink-0">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <PerfumeBottle className="w-10 h-auto" label={item.title.charAt(0)} />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-cream">{item.title}</h3>
                        <p className="text-gold-300 text-sm">${item.price.toFixed(0)}</p>
                      </div>
                      <button onClick={() => addToCart(item)} className="text-cream/60 hover:text-gold-300 p-2" aria-label="Add to cart">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleWishlist(item.id)} className="text-cream/40 hover:text-red-400/60 p-2" aria-label="Remove">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
