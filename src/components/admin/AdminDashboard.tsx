import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, FileText, Image, Settings, LogOut, Plus, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ProductsAdmin, ProductEditor } from './ProductsAdmin';
import { OrdersAdmin } from './OrdersAdmin';
import { ContentAdmin } from './ContentAdmin';
import { AssetsAdmin } from './AssetsAdmin';
import { SettingsAdmin } from './SettingsAdmin';
import type { Product } from '@/lib/types';

interface AdminDashboardProps {
  onExit: () => void;
  onLogout: () => void;
}

type Tab = 'products' | 'orders' | 'content' | 'assets' | 'settings';

export function AdminDashboard({ onExit, onLogout }: AdminDashboardProps) {
  const { content, orders } = useStore();
  const [tab, setTab] = useState<Tab>('products');
  const [editing, setEditing] = useState<Product | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const tabs: { key: Tab; label: string; icon: typeof Package; badge?: number }[] = [
    { key: 'products', label: 'Products', icon: Package },
    { key: 'orders', label: 'Orders', icon: ShoppingCart, badge: orders.length },
    { key: 'content', label: 'Content', icon: FileText },
    { key: 'assets', label: 'Assets', icon: Image },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  function openNew() { setEditing(null); setShowEditor(true); }
  function openEdit(p: Product) { setEditing(p); setShowEditor(true); }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col lg:flex-row">
      {/* sidebar */}
      <aside className="lg:w-64 glass-dark border-r border-gold-300/15 lg:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gold-300/15">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-gold-300" />
            <span className="font-serif text-xl gold-text">{content.footer_brand}</span>
          </div>
          <p className="text-cream/40 text-xs tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide transition-all ${
                  tab === t.key ? 'bg-gold-300/15 text-gold-300 border border-gold-300/30' : 'text-cream/60 hover:text-gold-200 hover:bg-gold-300/5 border border-transparent'
                }`}>
                <Icon className="w-5 h-5" />
                {t.label}
                {t.badge ? <span className="ml-auto bg-gold-300 text-obsidian text-[10px] font-bold rounded-full px-2 py-0.5">{t.badge}</span> : null}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold-300/15 space-y-2">
          <button onClick={onExit} className="w-full text-left px-4 py-2.5 rounded-lg text-cream/60 hover:text-gold-200 text-sm transition-colors">
            View Store
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400/60 hover:text-red-400 text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* main */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        {/* mobile tab bar */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase border whitespace-nowrap transition-all ${
                  tab === t.key ? 'border-gold-300 text-gold-300' : 'border-gold-300/20 text-cream/50'
                }`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* header with new button for products */}
        {tab === 'products' && (
          <div className="flex justify-end mb-6">
            <button onClick={openNew} className="btn-gold inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Fragrance
            </button>
          </div>
        )}

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'products' && <ProductsAdmin onEdit={openEdit} />}
          {tab === 'orders' && <OrdersAdmin />}
          {tab === 'content' && <ContentAdmin />}
          {tab === 'assets' && <AssetsAdmin />}
          {tab === 'settings' && <SettingsAdmin />}
        </motion.div>
      </main>

      {/* product editor modal */}
      <ProductEditor product={showEditor ? (editing ?? { id: `new-${Date.now()}`, title: '', price: 0, description: '', top_notes: '', mid_notes: '', base_notes: '', in_stock: true, category: 'Niche', images: [], featured: false, sort_order: 0 }) : null} onClose={() => setShowEditor(false)} />
    </div>
  );
}
