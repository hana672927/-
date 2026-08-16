import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useLang } from '@/lib/lang';
import { useContent } from '@/lib/useContent';
import { CATEGORIES } from '@/lib/types';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  query: string;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  onView: (p: Product) => void;
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export function Catalog({ query, categoryFilter, setCategoryFilter, onView }: CatalogProps) {
  const { products, content } = useStore();
  const { t } = useLang();
  const getContent = useContent();
  const [sort, setSort] = useState<SortKey>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryFilter !== getContent(content, 'all_categories')) {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.top_notes.toLowerCase().includes(q) ||
        p.mid_notes.toLowerCase().includes(q) ||
        p.base_notes.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.sort_order - b.sort_order);
    }
    return list;
  }, [products, categoryFilter, query, sort, content, getContent]);

  const allLabel = getContent(content, 'all_categories');
  const cats = [allLabel, ...CATEGORIES.map((c) => c.key)];

  const sortOptions: [SortKey, string][] = [
    ['featured', getContent(content, 'sort_featured')],
    ['price-asc', getContent(content, 'sort_price_asc')],
    ['price-desc', getContent(content, 'sort_price_desc')],
    ['name', getContent(content, 'sort_name')],
  ];

  return (
    <section id="collection" className="py-24 px-6 bg-gradient-to-b from-obsidian to-forest-500 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-gold-300 tracking-[0.3em] uppercase text-xs mb-4"
          >
            {getContent(content, 'collection_boutique')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl font-light gold-text"
          >
            {getContent(content, 'collection_signature')}
          </motion.h2>
        </div>

        {/* toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
          {/* category pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {cats.map((c, i) => {
              const isActive = (i === 0 && categoryFilter === allLabel) || categoryFilter === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-gold-300 text-obsidian border-gold-300'
                      : 'border-gold-300/20 text-cream/60 hover:border-gold-300/50 hover:text-gold-200'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* sort */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 text-cream/60 hover:text-gold-300 transition-colors text-xs tracking-widest uppercase"
            >
              <SlidersHorizontal className="w-4 h-4" /> {getContent(content, 'sort_label')}
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                className="flex gap-2"
              >
                {sortOptions.map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => { setSort(k); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase border transition-all ${
                      sort === k ? 'border-gold-300 text-gold-300' : 'border-gold-300/20 text-cream/50 hover:text-gold-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-cream/40 font-serif text-xl">
            {getContent(content, 'no_results')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onView={onView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
