import { useState } from 'react';
import { Save, Loader as Loader2, Check } from 'lucide-react';
import { useStore } from '@/lib/store';
import { CONTENT_KEYS } from '@/lib/types';

const LABELS: Record<string, string> = {
  hero_headline: 'Hero Headline',
  hero_subtitle: 'Hero Subtitle',
  hero_cta: 'Hero Button Text',
  announcement: 'Announcement Bar',
  about_title: 'About Title',
  about_body: 'About Body Text',
  about_stat1_value: 'Stat 1 Value',
  about_stat1_label: 'Stat 1 Label',
  about_stat2_value: 'Stat 2 Value',
  about_stat2_label: 'Stat 2 Label',
  about_stat3_value: 'Stat 3 Value',
  about_stat3_label: 'Stat 3 Label',
  collection_title: 'Collection Title',
  collection_subtitle: 'Collection Subtitle',
  footer_brand: 'Brand Name',
  footer_tagline: 'Footer Tagline',
  footer_email: 'Contact Email',
  footer_phone: 'Contact Phone',
  footer_address: 'Contact Address',
  footer_copyright: 'Copyright Text',
  policy_shipping: 'Shipping Policy',
  policy_returns: 'Returns Policy',
  policy_privacy: 'Privacy Policy',
  button_shop_now: 'Shop Now Button',
  button_add_to_cart: 'Add to Cart Button',
  button_checkout: 'Checkout Button',
  button_view_all: 'View All Button',
  categories_title: 'Families Section Title',
};

export function ContentAdmin() {
  const { content, updateContent } = useStore();
  const [draft, setDraft] = useState(content);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  async function save(key: string) {
    setSavingKey(key);
    await updateContent(key, draft[key] || '');
    setSavingKey(null);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 1500);
  }

  const groups: { title: string; keys: string[] }[] = [
    { title: 'Hero Section', keys: ['hero_headline', 'hero_subtitle', 'hero_cta', 'announcement'] },
    { title: 'About Section', keys: ['about_title', 'about_body', 'about_stat1_value', 'about_stat1_label', 'about_stat2_value', 'about_stat2_label', 'about_stat3_value', 'about_stat3_label'] },
    { title: 'Collection & Categories', keys: ['collection_title', 'collection_subtitle', 'categories_title'] },
    { title: 'Buttons', keys: ['button_shop_now', 'button_add_to_cart', 'button_checkout', 'button_view_all'] },
    { title: 'Footer & Contact', keys: ['footer_brand', 'footer_tagline', 'footer_email', 'footer_phone', 'footer_address', 'footer_copyright'] },
    { title: 'Policies', keys: ['policy_shipping', 'policy_returns', 'policy_privacy'] },
  ];

  return (
    <div>
      <h3 className="font-serif text-2xl text-cream mb-2">Site Content Editor</h3>
      <p className="text-cream/50 text-sm mb-6">Edit any text on the site. Changes save instantly and sync to all devices.</p>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="text-gold-300 text-xs tracking-widest uppercase mb-4 pb-2 border-b border-gold-300/15">{group.title}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {group.keys.map((key) => {
                const isLong = key.includes('body') || key.includes('policy') || key.includes('subtitle') || key.includes('announcement');
                return (
                  <div key={key}>
                    <label className="text-cream/60 text-xs mb-1 block">{LABELS[key] || key}</label>
                    <div className="flex gap-2">
                      {isLong ? (
                        <textarea rows={3} className="input-lux resize-none flex-1" value={draft[key] || ''}
                          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
                      ) : (
                        <input className="input-lux flex-1" value={draft[key] || ''}
                          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
                      )}
                      <button onClick={() => save(key)} disabled={savingKey === key}
                        className="btn-ghost !px-3 shrink-0 inline-flex items-center justify-center disabled:opacity-50">
                        {savingKey === key ? <Loader2 className="w-4 h-4 animate-spin" /> : savedKey === key ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
