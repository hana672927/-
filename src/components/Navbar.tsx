import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useLang } from '@/lib/lang';
import { useContent } from '@/lib/useContent';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (q: string) => void;
  query: string;
  onAdminAccess: () => void;
}

export function Navbar({ onOpenCart, onOpenWishlist, onSearch, query, onAdminAccess }: NavbarProps) {
  const { cartCount, wishlist, content } = useStore();
  const { t } = useLang();
  const getContent = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: getContent(content, 'nav_collection'), href: '#collection' },
    { label: getContent(content, 'nav_families'), href: '#families' },
    { label: getContent(content, 'nav_about'), href: '#about' },
    { label: getContent(content, 'nav_contact'), href: '#contact' },
  ];

  return (
    <>
      {/* announcement bar */}
      <div className="bg-forest-300 border-b border-gold-300/20 text-center py-2 text-xs tracking-widest text-gold-200/90 px-4">
        {getContent(content, 'announcement') || ''}
      </div>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'glass-dark shadow-lg shadow-black/30' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* logo */}
            <a href="#top" className="flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-2xl font-semibold gold-text tracking-wide">
                {getContent(content, 'footer_brand') || 'Maison Verdor'}
              </span>
            </a>

            {/* desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}
                  className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold-300 transition-colors relative group">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-300 group-hover:w-full transition-all duration-400" />
                </a>
              ))}
            </div>

            {/* actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button onClick={() => setSearchOpen((s) => !s)} aria-label={t.search_placeholder}
                className="text-cream/80 hover:text-gold-300 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={onOpenWishlist} aria-label="Wishlist" className="relative text-cream/80 hover:text-gold-300 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-300 text-obsidian text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button onClick={onOpenCart} aria-label={t.cart_title} className="relative text-cream/80 hover:text-gold-300 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-300 text-obsidian text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={onAdminAccess} aria-label="Admin" title="Admin Panel"
                className="ml-1 px-3 py-1.5 rounded-full border border-gold-300/30 text-gold-200 hover:bg-gold-300 hover:text-obsidian transition-all text-[10px] tracking-widest uppercase font-medium flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Admin
              </button>
              <button onClick={() => setMobileOpen(true)} className="md:hidden text-cream/80 hover:text-gold-300" aria-label="Menu">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gold-300/10"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder={t.search_placeholder}
                  className="w-full bg-transparent border-b border-gold-300/30 focus:border-gold-300 outline-none py-2 text-cream placeholder:text-cream/40 font-serif text-lg"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 glass-dark md:hidden flex flex-col p-8"
          >
            <button onClick={() => setMobileOpen(false)} className="self-end text-gold-300 mb-8">
              <X className="w-7 h-7" />
            </button>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-cream hover:text-gold-300 transition-colors py-4 border-b border-gold-300/10">
                {l.label}
              </a>
            ))}
            <button onClick={() => { setMobileOpen(false); onAdminAccess(); }}
              className="font-serif text-3xl text-gold-300 hover:text-gold-200 transition-colors py-4 border-b border-gold-300/10 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Admin Panel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


export { Navbar }