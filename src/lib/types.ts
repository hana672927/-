export type ProductCategory =
  | 'Niche'
  | 'EDP'
  | 'Oil Perfumes'
  | 'Oud'
  | 'Gift Sets'
  | 'Summer'
  | 'Winter';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  top_notes: string;
  mid_notes: string;
  base_notes: string;
  in_stock: boolean;
  category: ProductCategory | string;
  images: string[];
  featured: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  created_at: string;
}

export interface SiteContentMap {
  [key: string]: string;
}

export interface SiteAssetMap {
  [key: string]: string;
}

export const CATEGORIES: { key: ProductCategory; label: string; blurb: string }[] = [
  { key: 'Niche', label: 'Niche', blurb: 'Rare compositions for the connoisseur' },
  { key: 'EDP', label: 'Eau de Parfum', blurb: 'Long-lasting signature scents' },
  { key: 'Oil Perfumes', label: 'Perfume Oils', blurb: 'Alcohol-free, intimate, concentrated' },
  { key: 'Oud', label: 'Oud', blurb: 'Aged agarwood & precious resins' },
  { key: 'Gift Sets', label: 'Gift Sets', blurb: 'Curated trios in lacquered boxes' },
  { key: 'Summer', label: 'Summer', blurb: 'Luminous aquatics & bright citrus' },
  { key: 'Winter', label: 'Winter', blurb: 'Warm ambers, tobacco & spice' },
];

export const CONTENT_KEYS = [
  'hero_headline',
  'hero_subtitle',
  'hero_cta',
  'hero_established',
  'hero_our_story',
  'announcement',
  'about_title',
  'about_body',
  'about_stat1_value',
  'about_stat1_label',
  'about_stat2_value',
  'about_stat2_label',
  'about_stat3_value',
  'about_stat3_label',
  'collection_title',
  'collection_subtitle',
  'collection_boutique',
  'collection_signature',
  'categories_title',
  'footer_brand',
  'footer_tagline',
  'footer_email',
  'footer_phone',
  'footer_address',
  'footer_copyright',
  'footer_contact',
  'footer_client_care',
  'footer_shipping',
  'footer_returns',
  'footer_privacy',
  'footer_faq',
  'policy_shipping',
  'policy_returns',
  'policy_privacy',
  'button_shop_now',
  'button_add_to_cart',
  'button_checkout',
  'button_view_all',
  'nav_collection',
  'nav_families',
  'nav_about',
  'nav_contact',
  'cart_title',
  'cart_empty',
  'cart_empty_hint',
  'cart_total',
  'cart_clear',
  'checkout_title',
  'checkout_summary',
  'checkout_name',
  'checkout_phone',
  'checkout_city',
  'checkout_address',
  'checkout_notes',
  'checkout_place_order',
  'checkout_placing',
  'checkout_terms',
  'checkout_confirmed',
  'checkout_thank_you',
  'checkout_contact_you',
  'checkout_name_placeholder',
  'checkout_phone_placeholder',
  'checkout_city_placeholder',
  'checkout_address_placeholder',
  'checkout_notes_placeholder',
  'product_signature',
  'product_sold_out',
  'product_in_stock',
  'product_top_notes',
  'product_heart_notes',
  'product_base_notes',
  'sort_featured',
  'sort_price_asc',
  'sort_price_desc',
  'sort_name',
  'sort_label',
  'no_results',
  'all_categories',
] as const;

export const ASSET_KEYS = [
  'hero_background',
  'hero_bottle',
  'about_image',
  'banner_promo',
  'cover_niche',
  'cover_edp',
  'cover_oil',
  'cover_giftsets',
  'cover_summer',
  'cover_winter',
] as const;
