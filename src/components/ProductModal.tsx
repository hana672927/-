import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { PerfumeBottle } from './PerfumeBottle';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, toggleWishlist, isWished, content } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => { setActiveImg(0); setQty(1); }, [product]);

  if (!product) return null;
  const wished = isWished(product.id);
  const images = product.images?.length ? product.images : [];

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-dark rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-lux border border-gold-300/20"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* image side */}
              <div className="relative bg-gradient-to-br from-forest-200/30 to-obsidian/60 p-8 flex items-center justify-center min-h-[400px]">
                <button onClick={onClose} className="absolute top-4 right-4 text-cream/60 hover:text-gold-300 z-10">
                  <X className="w-6 h-6" />
                </button>
                {images.length > 0 ? (
                  <img src={images[activeImg]} alt={product.title} className="max-h-80 rounded-xl object-contain" />
                ) : (
                  <motion.div
                    animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <PerfumeBottle className="w-48 h-auto drop-shadow-2xl" label={product.title.charAt(0)} />
                  </motion.div>
                )}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((src, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImg === i ? 'border-gold-300' : 'border-transparent opacity-60'
                        }`}>
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* info side */}
              <div className="p-8 md:p-10 flex flex-col">
                <p className="text-gold-300/70 text-xs tracking-widest uppercase mb-2">{product.category}</p>
                <h2 className="font-serif text-4xl text-cream mb-3">{product.title}</h2>
                <span className="font-serif text-3xl gold-text mb-5">${product.price.toFixed(0)}</span>

                <p className="text-cream/60 leading-relaxed mb-6">{product.description}</p>

                {/* notes */}
                <div className="space-y-3 mb-6">
                  {[
                    ['Top', product.top_notes],
                    ['Heart', product.mid_notes],
                    ['Base', product.base_notes],
                  ].map(([label, notes]) => notes ? (
                    <div key={label as string} className="flex gap-3 items-start">
                      <span className="text-gold-300 text-xs tracking-widest uppercase w-16 shrink-0 pt-0.5">{label}</span>
                      <span className="text-cream/70 text-sm">{notes}</span>
                    </div>
                  ) : null)}
                </div>

                {/* qty + actions */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gold-300/30 rounded-full">
                      <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-cream/70 hover:text-gold-300">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-cream font-medium">{qty}</span>
                      <button onClick={() => setQty((q) => q + 1)} className="p-2 text-cream/70 hover:text-gold-300">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className={`text-xs tracking-widest uppercase ${product.in_stock ? 'text-emerald-400/80' : 'text-red-400/70'}`}>
                      {product.in_stock ? 'In Stock' : 'Sold Out'}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); onClose(); }}
                      disabled={!product.in_stock}
                      className="btn-gold flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" /> {content.button_add_to_cart}
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`btn-ghost !px-4 ${wished ? 'text-gold-300 border-gold-300' : ''}`}
                    >
                      <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
