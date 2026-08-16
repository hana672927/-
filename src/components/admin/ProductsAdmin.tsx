import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Upload, Star, Loader as Loader2, Save } from 'lucide-react';
import { useStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/types';
import type { Product, ProductCategory } from '@/lib/types';
import { uploadImage, fileToDataUrl } from '@/lib/storage';
import { PerfumeBottle } from '@/components/PerfumeBottle';

interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
}

const blankProduct = (): Product => ({
  id: `new-${Date.now()}`,
  title: '',
  price: 0,
  description: '',
  top_notes: '',
  mid_notes: '',
  base_notes: '',
  in_stock: true,
  category: 'Niche',
  images: [],
  featured: false,
  sort_order: 0,
});

export function ProductEditor({ product, onClose }: ProductEditorProps) {
  const { saveProduct } = useStore();
  const [draft, setDraft] = useState<Product>(product ? { ...product } : blankProduct());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setDraft(product ? { ...product } : blankProduct()); }, [product]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadImage(file, 'products'));
      }
      setDraft((d) => ({ ...d, images: [...d.images, ...urls] }));
    } catch (e) {
      // last-resort base64
      const urls = await Promise.all(Array.from(files).map(fileToDataUrl));
      setDraft((d) => ({ ...d, images: [...d.images, ...urls] }));
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    setDraft((d) => ({ ...d, images: d.images.filter((_, i) => i !== idx) }));
  }

  async function handleSave() {
    setSaving(true);
    await saveProduct(draft);
    setSaving(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {product !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-dark rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-lux border border-gold-300/20 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl gold-text">{draft.title ? 'Edit' : 'New'} Fragrance</h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold-300"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-4">
              {/* images */}
              <div>
                <label className="text-gold-300/70 text-xs tracking-widest uppercase mb-2 block">Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {draft.images.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden glass border border-gold-300/20 group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {draft.images.length === 0 && (
                    <div className="w-20 h-20 rounded-lg glass flex items-center justify-center">
                      <PerfumeBottle className="w-12 h-auto opacity-50" />
                    </div>
                  )}
                  <label className="w-20 h-20 rounded-lg glass border border-dashed border-gold-300/30 flex items-center justify-center cursor-pointer hover:border-gold-300/60 transition-colors">
                    {uploading ? <Loader2 className="w-5 h-5 text-gold-300 animate-spin" /> : <Plus className="w-5 h-5 text-gold-300/70" />}
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                  </label>
                </div>
                <p className="text-cream/30 text-xs">Upload from device — stored in Supabase Storage</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Title</label>
                  <input className="input-lux mt-1" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Price ($)</label>
                  <input type="number" className="input-lux mt-1" value={draft.price} onChange={(e) => setDraft({ ...draft, price: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              <div>
                <label className="text-gold-300/70 text-xs tracking-widest uppercase">Description</label>
                <textarea className="input-lux mt-1 resize-none" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Top Notes</label>
                  <input className="input-lux mt-1" value={draft.top_notes} onChange={(e) => setDraft({ ...draft, top_notes: e.target.value })} />
                </div>
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Heart Notes</label>
                  <input className="input-lux mt-1" value={draft.mid_notes} onChange={(e) => setDraft({ ...draft, mid_notes: e.target.value })} />
                </div>
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Base Notes</label>
                  <input className="input-lux mt-1" value={draft.base_notes} onChange={(e) => setDraft({ ...draft, base_notes: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Category</label>
                  <select className="input-lux mt-1" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as ProductCategory })}>
                    {CATEGORIES.map((c) => <option key={c.key} value={c.key} className="bg-obsidian">{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gold-300/70 text-xs tracking-widest uppercase">Sort Order</label>
                  <input type="number" className="input-lux mt-1" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={draft.in_stock} onChange={(e) => setDraft({ ...draft, in_stock: e.target.checked })} className="accent-gold-300" />
                  <span className="text-cream/70 text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} className="accent-gold-300" />
                  <span className="text-cream/70 text-sm flex items-center gap-1"><Star className="w-3.5 h-3.5 text-gold-300" /> Featured</span>
                </label>
              </div>

              <button onClick={handleSave} disabled={saving || !draft.title} className="btn-gold w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Fragrance</>}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ProductsAdminProps {
  onEdit: (p: Product) => void;
}

export function ProductsAdmin({ onEdit }: ProductsAdminProps) {
  const { products, deleteProduct } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl text-cream">Fragrances ({products.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 border border-gold-300/10 flex gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-forest-200/30 flex items-center justify-center shrink-0">
              {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <PerfumeBottle className="w-10 h-auto" label={p.title.charAt(0)} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg text-cream truncate">{p.title}</h4>
                {p.featured && <Star className="w-3.5 h-3.5 text-gold-300 shrink-0 fill-current" />}
              </div>
              <p className="text-gold-300 text-sm">${p.price.toFixed(0)} · {p.category}</p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => onEdit(p)} className="text-gold-300 hover:text-gold-200 text-xs tracking-widest uppercase transition-colors">Edit</button>
                <button
                  onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteProduct(p.id); }}
                  className="text-red-400/60 hover:text-red-400 text-xs tracking-widest uppercase transition-colors"
                >Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
