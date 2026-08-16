import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_PRODUCTS, MOCK_CONTENT, MOCK_ASSETS, DEFAULT_ADMIN_PASSWORD } from '@/lib/mockData';
import type { Product, Order, SiteContentMap, SiteAssetMap, OrderItem, OrderStatus } from '@/lib/types';

interface StoreContextValue {
  // data
  products: Product[];
  orders: Order[];
  content: SiteContentMap;
  assets: SiteAssetMap;
  adminPassword: string;
  loading: boolean;
  connected: boolean;

  // cart
  cart: OrderItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;

  // products CRUD
  saveProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // orders
  submitOrder: (o: Omit<Order, 'id' | 'created_at' | 'status'>) => Promise<boolean>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  // content
  updateContent: (key: string, value: string) => Promise<void>;

  // assets
  updateAsset: (key: string, value: string) => Promise<void>;

  // admin
  updateAdminPassword: (pw: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

const CART_KEY = 'verdor_cart';
const WISH_KEY = 'verdor_wishlist';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [content, setContent] = useState<SiteContentMap>(MOCK_CONTENT);
  const [assets, setAssets] = useState<SiteAssetMap>(MOCK_ASSETS);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const [cart, setCart] = useState<OrderItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); } catch { return []; }
  });

  // persist cart & wishlist
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); }, [wishlist]);

 const loadAll = useCallback(async () => {
    // إذا لم يكن Supabase متصلاً أو كانت القيمة null، اعتمد بيانات Mock فوراً
    if (!supabase) {
      setLoading(false);
      setConnected(false);
      return;
    }

    try {
      // استخدام optional chaining (?.) لتفادي أخطاء null
      const [pRes, oRes, cRes, aRes, sRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('content').select('*'),
        supabase.from('assets').select('*'),
        supabase.from('settings').select('*'),
      ]);

      if (pRes.data && pRes.data.length > 0) setProducts(pRes.data);
      if (oRes.data && oRes.data.length > 0) setOrders(oRes.data);
      
      if (cRes.data && cRes.data.length > 0) {
        const map: SiteContentMap = {};
        cRes.data.forEach((item: any) => { map[item.key] = item.value; });
        setContent(map);
      }

      if (aRes.data && aRes.data.length > 0) {
        const map: SiteAssetMap = {};
        aRes.data.forEach((item: any) => { map[item.key] = item.value; });
        setAssets(map);
      }

      if (sRes.data && sRes.data.length > 0) {
        const pass = sRes.data.find((s: any) => s.key === 'admin_password');
        if (pass) setAdminPassword(pass.value);
      }

      setConnected(true);
    } catch (e) {
      console.error("Supabase load error:", e);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const client = supabase;
    if (!client) return;
    const ch = client
      .channel('store-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_assets' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_settings' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, () => loadAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assets' }, () => loadAll())
      .subscribe();
    return () => { client.removeChannel(ch); };
  }, [loadAll]);

  // ---- cart ----
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  }, []);
  const removeFromCart = useCallback((id: string) => setCart((p) => p.filter((i) => i.id !== id)), []);
  const updateQty = useCallback((id: string, qty: number) => {
    setCart((p) => qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);

  // ---- wishlist ----
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  }, []);
  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  // ---- products CRUD ----
  const saveProduct = useCallback(async (p: Product) => {
    const row = {
      title: p.title, price: p.price, description: p.description,
      top_notes: p.top_notes, mid_notes: p.mid_notes, base_notes: p.base_notes,
      in_stock: p.in_stock, category: p.category, images: p.images,
      featured: p.featured, sort_order: p.sort_order,
    };
    if (supabase) {
      if (p.id && p.id.length < 36) {
        // mock id → insert
        const { data, error } = await supabase.from('products').insert(row).select().single();
        if (!error && data) setProducts((prev) => [...prev.filter((x) => x.id !== p.id), { ...data, images: data.images || [] }]);
      } else {
        const { error } = await supabase.from('products').update(row).eq('id', p.id);
        if (!error) setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, ...p } : x));
      }
    } else {
      setProducts((prev) => prev.some((x) => x.id === p.id) ? prev.map((x) => x.id === p.id ? p : x) : [...prev, p]);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    if (supabase) await supabase.from('products').delete().eq('id', id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  // ---- orders ----
  const submitOrder = useCallback(async (o: Omit<Order, 'id' | 'created_at' | 'status'>) => {
    if (supabase) {
      const { data, error } = await supabase.from('orders').insert({ ...o, status: 'Pending' }).select().single();
      if (error) return false;
      setOrders((prev) => [{ ...data }, ...prev]);
      return true;
    }
    const newOrder: Order = { ...o, id: `local-${Date.now()}`, status: 'Pending', created_at: new Date().toISOString() };
    setOrders((prev) => [newOrder, ...prev]);
    return true;
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    if (supabase) await supabase.from('orders').update({ status }).eq('id', id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    if (supabase) await supabase.from('orders').delete().eq('id', id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  // ---- content ----
  const updateContent = useCallback(async (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    if (supabase) {
      await supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
  }, []);

  // ---- assets ----
  const updateAsset = useCallback(async (key: string, value: string) => {
    setAssets((prev) => ({ ...prev, [key]: value }));
    if (supabase) {
      await supabase.from('site_assets').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
  }, []);

  // ---- admin ----
  const updateAdminPassword = useCallback(async (pw: string) => {
    setAdminPassword(pw);
    if (supabase) {
      await supabase.from('admin_settings').update({ admin_password: pw, updated_at: new Date().toISOString() }).eq('id', 1);
    }
  }, []);

  const value: StoreContextValue = {
    products, orders, content, assets, adminPassword, loading, connected: connected || isSupabaseConfigured,
    cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
    wishlist, toggleWishlist, isWished,
    saveProduct, deleteProduct,
    submitOrder, updateOrderStatus, deleteOrder,
    updateContent, updateAsset, updateAdminPassword,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
