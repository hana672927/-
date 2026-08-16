import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Sparkles, Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useLang } from '@/lib/lang';
import { useContent } from '@/lib/useContent';

interface FooterProps {
  onAdminAccess: () => void;
}

export function Footer({ onAdminAccess }: FooterProps) {
  const { content } = useStore();
  const { t } = useLang();
  const getContent = useContent();

  return (
    <footer id="contact" className="bg-obsidian border-t border-gold-300/15 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold-300" />
              <span className="font-serif text-2xl gold-text">{getContent(content, 'footer_brand')}</span>
            </div>
            <p className="text-cream/50 max-w-sm leading-relaxed mb-6">{getContent(content, 'footer_tagline')}</p>
            <div className="flex gap-3">
              {['IG', 'FB', 'PIN'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold-300 text-xs tracking-wider hover:border-gold-300/50 transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 className="text-gold-300 text-xs tracking-widest uppercase mb-5">{getContent(content, 'footer_contact')}</h4>
            <ul className="space-y-3 text-cream/60 text-sm">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold-300/70" /> {getContent(content, 'footer_email')}</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold-300/70" /> {getContent(content, 'footer_phone')}</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold-300/70" /> {getContent(content, 'footer_address')}</li>
            </ul>
          </div>

          {/* policies */}
          <div>
            <h4 className="text-gold-300 text-xs tracking-widest uppercase mb-5">{getContent(content, 'footer_client_care')}</h4>
            <ul className="space-y-3 text-cream/60 text-sm">
              <li><a href="#" className="hover:text-gold-200 transition-colors">{getContent(content, 'footer_shipping')}</a></li>
              <li><a href="#" className="hover:text-gold-200 transition-colors">{getContent(content, 'footer_returns')}</a></li>
              <li><a href="#" className="hover:text-gold-200 transition-colors">{getContent(content, 'footer_privacy')}</a></li>
              <li><a href="#" className="hover:text-gold-200 transition-colors">{getContent(content, 'footer_faq')}</a></li>
            </ul>
          </div>
        </div>

        {/* policy text expandable */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-cream/40 text-xs leading-relaxed">
          <div className="glass rounded-xl p-4"><strong className="text-gold-300/80 block mb-2 tracking-wider uppercase text-[10px]">{getContent(content, 'footer_shipping')}</strong>{getContent(content, 'policy_shipping')}</div>
          <div className="glass rounded-xl p-4"><strong className="text-gold-300/80 block mb-2 tracking-wider uppercase text-[10px]">{getContent(content, 'footer_returns')}</strong>{getContent(content, 'policy_returns')}</div>
          <div className="glass rounded-xl p-4"><strong className="text-gold-300/80 block mb-2 tracking-wider uppercase text-[10px]">{getContent(content, 'footer_privacy')}</strong>{getContent(content, 'policy_privacy')}</div>
        </div>

        <div className="border-t border-gold-300/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">{getContent(content, 'footer_copyright')}</p>
          {/* admin access */}
          <button
            onClick={onAdminAccess}
            className="text-gold-300/70 hover:text-gold-300 hover:bg-gold-300/10 px-3 py-1.5 rounded-full border border-gold-300/30 text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5"
            aria-label={t.footer_admin_access}
            title={t.footer_admin_access}
          >
            <Lock className="w-3 h-3" /> {t.footer_admin_access}
          </button>
        </div>
      </div>
    </footer>
  );
}
