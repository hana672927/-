import { useState, useEffect } from 'react';
import { StoreProvider } from './lib/store';
import { LangProvider, useLang } from './lib/lang';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import type { Product } from './lib/types';

function Storefront() {
  const { t, toggleLang } = useLang();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if admin is already authenticated
  useEffect(() => {
    if (sessionStorage.getItem('verdor_admin') === '1') {
      setShowAdmin(true);
    }
  }, []);

  function handleAdminAccess() {
    setShowAdmin(true);
  }

  function handleAdminExit() {
    setShowAdmin(false);
    sessionStorage.removeItem('verdor_admin');
  }

  function handleCheckout() {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }

  if (showAdmin) {
    if (sessionStorage.getItem('verdor_admin') === '1') {
      return <AdminDashboard onExit={handleAdminExit} onLogout={handleAdminExit} />;
    }
    return <AdminLogin onSuccess={() => setShowAdmin(true)} onExit={handleAdminExit} />;
  }

  return (
    <div className="min-h-screen bg-obsidian text-cream">
      {/* Top bar for language switching */}
      <div className="bg-forest-300 border-b border-gold-300/20 px-6 py-2 flex justify-between items-center text-sm">
        <span className="text-cream/70 text-xs tracking-wide">{t.welcome}</span>
        <button
          onClick={toggleLang}
          className="px-3 py-1 border border-gold-300/40 rounded text-gold-200 hover:bg-gold-300 hover:text-obsidian transition text-xs tracking-wider"
        >
          {t.langSwitch}
        </button>
      </div>

      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
        onSearch={setSearchQuery}
        query={searchQuery}
        onAdminAccess={handleAdminAccess}
      />

      <Hero />

      <Catalog
        query={searchQuery}
        categoryFilter={selectedCategory}
        setCategoryFilter={setSelectedCategory}
        onView={setViewProduct}
      />

      <Footer onAdminAccess={handleAdminAccess} />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <ProductModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <StoreProvider>
        <Storefront />
      </StoreProvider>
    </LangProvider>
  );
}
