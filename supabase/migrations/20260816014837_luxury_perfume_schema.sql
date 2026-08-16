/*
# Luxury Perfume E-Commerce Schema

Single-tenant (no customer sign-in) luxury perfume storefront with admin CMS.

1. New Tables: products, orders, site_content, site_assets, admin_settings
2. Storage: public bucket `perfume-assets`
3. Security: RLS on all tables, anon+authenticated CRUD (single-tenant, public/shared)
*/

-- ---------- products ----------
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  description text DEFAULT '',
  top_notes text DEFAULT '',
  mid_notes text DEFAULT '',
  base_notes text DEFAULT '',
  in_stock boolean NOT NULL DEFAULT true,
  category text NOT NULL DEFAULT 'Niche',
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE TO anon, authenticated USING (true);

-- ---------- orders ----------
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text DEFAULT '',
  city text DEFAULT '',
  notes text DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE TO anon, authenticated USING (true);

-- ---------- site_content ----------
CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_site_content" ON site_content;
CREATE POLICY "anon_select_site_content" ON site_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_site_content" ON site_content;
CREATE POLICY "anon_insert_site_content" ON site_content FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_site_content" ON site_content;
CREATE POLICY "anon_update_site_content" ON site_content FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_site_content" ON site_content;
CREATE POLICY "anon_delete_site_content" ON site_content FOR DELETE TO anon, authenticated USING (true);

-- ---------- site_assets ----------
CREATE TABLE IF NOT EXISTS site_assets (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_site_assets" ON site_assets;
CREATE POLICY "anon_select_site_assets" ON site_assets FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_site_assets" ON site_assets;
CREATE POLICY "anon_insert_site_assets" ON site_assets FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_site_assets" ON site_assets;
CREATE POLICY "anon_update_site_assets" ON site_assets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_site_assets" ON site_assets;
CREATE POLICY "anon_delete_site_assets" ON site_assets FOR DELETE TO anon, authenticated USING (true);

-- ---------- admin_settings ----------
CREATE TABLE IF NOT EXISTS admin_settings (
  id int PRIMARY KEY DEFAULT 1,
  admin_password text NOT NULL DEFAULT 'batttt',
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_admin_settings" ON admin_settings;
CREATE POLICY "anon_select_admin_settings" ON admin_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_update_admin_settings" ON admin_settings;
CREATE POLICY "anon_update_admin_settings" ON admin_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_insert_admin_settings" ON admin_settings;
CREATE POLICY "anon_insert_admin_settings" ON admin_settings FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO admin_settings (id, admin_password) VALUES (1, 'batttt')
ON CONFLICT (id) DO NOTHING;

-- ---------- storage bucket ----------
INSERT INTO storage.buckets (id, name, public)
VALUES ('perfume-assets', 'perfume-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_read_perfume_assets" ON storage.objects;
CREATE POLICY "anon_read_perfume_assets" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'perfume-assets');

DROP POLICY IF EXISTS "anon_write_perfume_assets" ON storage.objects;
CREATE POLICY "anon_write_perfume_assets" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'perfume-assets');

DROP POLICY IF EXISTS "anon_update_perfume_assets" ON storage.objects;
CREATE POLICY "anon_update_perfume_assets" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'perfume-assets') WITH CHECK (bucket_id = 'perfume-assets');

DROP POLICY IF EXISTS "anon_delete_perfume_assets" ON storage.objects;
CREATE POLICY "anon_delete_perfume_assets" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'perfume-assets');
