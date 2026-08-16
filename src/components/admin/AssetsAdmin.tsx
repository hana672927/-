import { useState } from 'react';
import { Upload, Loader as Loader2, Check, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { uploadImage } from '@/lib/storage';
import { PerfumeBottle } from '@/components/PerfumeBottle';

const ASSET_LABELS: Record<string, string> = {
  hero_background: 'Hero Background Image',
  hero_bottle: 'Hero Bottle Image',
  about_image: 'About Section Image',
  banner_promo: 'Promo Banner',
  cover_niche: 'Niche Family Cover',
  cover_edp: 'EDP Family Cover',
  cover_oil: 'Oil Perfumes Cover',
  cover_giftsets: 'Gift Sets Cover',
  cover_summer: 'Summer Collection Cover',
  cover_winter: 'Winter Collection Cover',
};

export function AssetsAdmin() {
  const { assets, updateAsset } = useStore();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  async function handleUpload(key: string, file: File | undefined) {
    if (!file) return;
    setUploadingKey(key);
    try {
      const url = await uploadImage(file, 'site-assets');
      await updateAsset(key, url);
    } catch (e) {
      console.warn('Upload failed', e);
    } finally {
      setUploadingKey(null);
    }
  }

  return (
    <div>
      <h3 className="font-serif text-2xl text-cream mb-2">Image Asset Manager</h3>
      <p className="text-cream/50 text-sm mb-6">Replace any image across the site. Uploads go to Supabase Storage and sync globally.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(ASSET_LABELS).map(([key, label]) => {
          const value = assets[key] || '';
          return (
            <div key={key} className="glass rounded-xl p-4 border border-gold-300/10">
              <label className="text-gold-300/70 text-xs tracking-widest uppercase mb-3 block">{label}</label>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-forest-200/30 flex items-center justify-center mb-3 border border-gold-300/10">
                {value ? (
                  <img src={value} alt={label} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-cream/30">
                    <PerfumeBottle className="w-12 h-auto mx-auto opacity-40" />
                    <p className="text-xs mt-2">No image set</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <label className="btn-ghost !py-2 !px-3 flex-1 inline-flex items-center justify-center gap-2 cursor-pointer text-[10px]">
                  {uploadingKey === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {value ? 'Replace' : 'Upload'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(key, e.target.files?.[0])} />
                </label>
                {value && (
                  <button onClick={() => updateAsset(key, '')}
                    className="btn-ghost !py-2 !px-3 text-red-400/60 hover:text-red-400" aria-label="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
