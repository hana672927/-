import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { TiltCard } from './TiltCard';
import { PerfumeBottle } from './PerfumeBottle';

interface ProductCardProps {
  product: Product;
  onView: (p: Product) => void;
  index?: number;
}

export function ProductCard({ product, onView, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWished, content } = useStore();
  const wished = isWished(product.id);
  const img = product.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group"
    >
      <TiltCard className="relative rounded-2xl overflow-hidden glass card-hover h-full" intensity={8}>
        {/* image / bottle */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-forest-200/40 to-obsidian/60 flex items-center justify-center"
          style={{ transform: 'translateZ(40px)' }}>
          {img ? (
            <img src={img} alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <PerfumeBottle className="w-32 h-auto drop-shadow-2xl" label={product.title.charAt(0)} />
            </motion.div>
          )}

          {/* badge */}
          {product.featured && (
            <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-gold-300/90 text-obsidian px-3 py-1 rounded-full font-semibold">
              Signature
            </span>
          )}
          {!product.in_stock && (
            <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-obsidian/90 text-cream/70 px-3 py-1 rounded-full border border-gold-300/30">
              Sold Out
            </span>
          )}

          {/* quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`w-9 h-9 rounded-full glass-dark flex items-center justify-center transition-all hover:scale-110 ${wished ? 'text-gold-300' : 'text-cream/70'}`}
            >
              <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onView(product)}
              aria-label="Quick view"
              className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-cream/70 hover:text-gold-300 transition-all hover:scale-110"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* info */}
        <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-gold-300/70 text-[10px] tracking-widest uppercase mb-1">{product.category}</p>
          <h3 className="font-serif text-2xl text-cream mb-1 group-hover:text-gold-200 transition-colors">{product.title}</h3>
          <p className="text-cream/50 text-sm line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl gold-text">${product.price.toFixed(0)}</span>
            <button
              onClick={() => addToCart(product)}
              disabled={!product.in_stock}
              className="btn-gold !py-2 !px-4 !text-[10px] inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> {content.button_add_to_cart}
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
