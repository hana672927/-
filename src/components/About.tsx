import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { PerfumeBottle } from './PerfumeBottle';

export function About() {
  const { content, assets } = useStore();

  const stats = [
    { value: content.about_stat1_value, label: content.about_stat1_label },
    { value: content.about_stat2_value, label: content.about_stat2_label },
    { value: content.about_stat3_value, label: content.about_stat3_label },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-forest-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 radial-gold opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 radial-gold" />
            {assets.about_image ? (
              <img src={assets.about_image} alt="Atelier" className="rounded-2xl max-h-[500px] object-cover glass p-2" />
            ) : (
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <PerfumeBottle className="w-56 h-auto drop-shadow-[0_25px_50px_rgba(212,175,55,0.2)]" label="V" />
                <div className="absolute -inset-10 radial-gold -z-10" />
              </motion.div>
            )}
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-300 tracking-[0.3em] uppercase text-xs mb-4">Our Heritage</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light gold-text mb-6">{content.about_title}</h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-10">{content.about_body}</p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center glass rounded-xl p-4 border border-gold-300/10"
                >
                  <div className="font-serif text-3xl gold-text mb-1">{s.value}</div>
                  <div className="text-cream/50 text-xs tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
