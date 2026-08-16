import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/types';
import { useStore } from '@/lib/store';
import { PerfumeBottle } from './PerfumeBottle';

interface FamiliesProps {
  onSelect: (cat: string) => void;
}

export function Families({ onSelect }: FamiliesProps) {
  const { content, assets } = useStore();
  const assetKeyMap: Record<string, string> = {
    'Niche': 'cover_niche',
    'EDP': 'cover_edp',
    'Oil Perfumes': 'cover_oil',
    'Oud': 'cover_oil',
    'Gift Sets': 'cover_giftsets',
    'Summer': 'cover_summer',
    'Winter': 'cover_winter',
  };

  return (
    <section id="families" className="py-24 px-6 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 radial-gold opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-gold-300 tracking-[0.3em] uppercase text-xs mb-4"
          >
            {content.categories_title}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl font-light gold-text"
          >
            {content.collection_title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-cream/60 mt-4 max-w-xl mx-auto"
          >
            {content.collection_subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => {
            const assetKey = assetKeyMap[cat.key] || '';
            const img = assetKey ? assets[assetKey] : '';
            return (
              <motion.button
                key={cat.key}
                onClick={() => { onSelect(cat.key); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass card-hover text-left"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {img ? (
                    <img src={img} alt={cat.label} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" />
                  ) : (
                    <div className="opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                      <PerfumeBottle className="w-20 h-auto" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-2xl text-gold-200 group-hover:text-gold-300 transition-colors">{cat.label}</h3>
                  <p className="text-cream/50 text-xs mt-1">{cat.blurb}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-gold-300/40 rounded-2xl transition-colors duration-500" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
