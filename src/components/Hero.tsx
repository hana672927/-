import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useLang } from '@/lib/lang';
import { useContent } from '@/lib/useContent';
import { PerfumeBottle } from './PerfumeBottle';

export function Hero() {
  const { content, assets } = useStore();
  const { t } = useLang();
  const getContent = useContent();

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        {assets.hero_background ? (
          <img src={assets.hero_background} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-forest-300 via-forest-500 to-obsidian" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
        <div className="absolute inset-0 radial-gold" />
      </div>

      {/* floating decorative bottles */}
      <motion.div
        className="absolute left-[8%] top-[20%] hidden lg:block opacity-40"
        animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PerfumeBottle className="w-28 h-auto drop-shadow-2xl" liquidColor="#062C21" label="V" />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[28%] hidden lg:block opacity-30"
        animate={{ y: [0, 25, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <PerfumeBottle className="w-24 h-auto drop-shadow-2xl" liquidColor="#041A13" label="M" />
      </motion.div>

      {/* content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-200 tracking-[0.3em] uppercase text-xs sm:text-sm mb-6"
        >
          {getContent(content, 'hero_established')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
        >
          <span className="gold-text">{getContent(content, 'hero_headline')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-cream/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          {getContent(content, 'hero_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#collection" className="btn-gold inline-flex items-center gap-2">
            {getContent(content, 'hero_cta')} <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#about" className="btn-ghost">
            {getContent(content, 'hero_our_story')}
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-300/60"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
