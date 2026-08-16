export type Lang = 'ar' | 'en';

export interface UITranslations {
  // top bar
  welcome: string;
  langSwitch: string;

  // nav
  nav_collection: string;
  nav_families: string;
  nav_about: string;
  nav_contact: string;
  search_placeholder: string;

  // hero
  hero_established: string;
  hero_our_story: string;

  // catalog
  collection_boutique: string;
  collection_signature: string;
  sort_label: string;
  sort_featured: string;
  sort_price_asc: string;
  sort_price_desc: string;
  sort_name: string;
  no_results: string;
  all_categories: string;

  // product card / modal
  product_signature: string;
  product_sold_out: string;
  product_in_stock: string;
  product_top_notes: string;
  product_heart_notes: string;
  product_base_notes: string;

  // cart
  cart_title: string;
  cart_empty: string;
  cart_empty_hint: string;
  cart_total: string;
  cart_clear: string;

  // checkout
  checkout_title: string;
  checkout_summary: string;
  checkout_name: string;
  checkout_phone: string;
  checkout_city: string;
  checkout_address: string;
  checkout_notes: string;
  checkout_place_order: string;
  checkout_placing: string;
  checkout_terms: string;
  checkout_confirmed: string;
  checkout_thank_you: string;
  checkout_contact_you: string;
  checkout_name_placeholder: string;
  checkout_phone_placeholder: string;
  checkout_city_placeholder: string;
  checkout_address_placeholder: string;
  checkout_notes_placeholder: string;
  checkout_error: string;

  // footer
  footer_contact: string;
  footer_client_care: string;
  footer_shipping: string;
  footer_returns: string;
  footer_privacy: string;
  footer_faq: string;
  footer_admin_access: string;

  // admin
  admin_panel: string;
  admin_enter_password: string;
  admin_password: string;
  admin_enter: string;
  admin_incorrect: string;
  admin_default_hint: string;
  admin_back: string;
  admin_products: string;
  admin_orders: string;
  admin_content: string;
  admin_assets: string;
  admin_settings: string;
  admin_view_store: string;
  admin_logout: string;
  admin_add_fragrance: string;
  admin_new_fragrance: string;
  admin_edit_fragrance: string;
  admin_images: string;
  admin_upload_device: string;
  admin_title: string;
  admin_price: string;
  admin_description: string;
  admin_top_notes: string;
  admin_heart_notes: string;
  admin_base_notes: string;
  admin_category: string;
  admin_sort_order: string;
  admin_in_stock: string;
  admin_featured: string;
  admin_save: string;
  admin_saving: string;
  admin_edit: string;
  admin_delete: string;
  admin_delete_confirm: string;
  admin_no_orders: string;
  admin_items: string;
  admin_status_pending: string;
  admin_status_completed: string;
  admin_status_cancelled: string;
  admin_content_editor: string;
  admin_content_desc: string;
  admin_assets_manager: string;
  admin_assets_desc: string;
  admin_settings_title: string;
  admin_settings_desc: string;
  admin_connected: string;
  admin_demo_mode: string;
  admin_connected_desc: string;
  admin_demo_desc: string;
  admin_change_password: string;
  admin_current_password: string;
  admin_new_password: string;
  admin_confirm_password: string;
  admin_password_incorrect: string;
  admin_password_short: string;
  admin_password_mismatch: string;
  admin_password_updated: string;
  admin_update_password: string;
  admin_no_image: string;
  admin_replace: string;
  admin_upload: string;
  admin_remove: string;

  // content group labels (admin)
  group_hero: string;
  group_about: string;
  group_collection: string;
  group_buttons: string;
  group_footer: string;
  group_policies: string;
  group_navigation: string;
  group_checkout: string;
  group_cart: string;
  group_product: string;
  group_sort: string;
}

export const translations: Record<Lang, UITranslations> = {
  ar: {
    welcome: 'مرحباً بك في متجرنا الفاخر',
    langSwitch: 'English',

    nav_collection: 'المجموعة',
    nav_families: 'العائلات',
    nav_about: 'من نحن',
    nav_contact: 'تواصل معنا',
    search_placeholder: 'ابحث عن عطور، نوتات، عائلات...',

    hero_established: 'Maison de Parfum · تأسست 1926',
    hero_our_story: 'قصتنا',

    collection_boutique: 'بوتيك',
    collection_signature: 'عطور مميزة',
    sort_label: 'ترتيب',
    sort_featured: 'المميزة',
    sort_price_asc: 'السعر ↑',
    sort_price_desc: 'السعر ↓',
    sort_name: 'أ-ي',
    no_results: 'لم يتم العثور على عطور. جرب بحثاً أو عائلة مختلفة.',
    all_categories: 'الكل',

    product_signature: 'مميز',
    product_sold_out: 'نفذت الكمية',
    product_in_stock: 'متوفر',
    product_top_notes: 'الطبقة العليا',
    product_heart_notes: 'طبقة القلب',
    product_base_notes: 'الطبقة الأساسية',

    cart_title: 'سلة التسوق',
    cart_empty: 'سلتك فارغة',
    cart_empty_hint: 'اكتشف عطرك المميز',
    cart_total: 'المجموع',
    cart_clear: 'إفراغ السلة',

    checkout_title: 'إتمام الشراء',
    checkout_summary: 'ملخص الطلب',
    checkout_name: 'الاسم الكامل *',
    checkout_phone: 'الهاتف / واتساب *',
    checkout_city: 'المدينة',
    checkout_address: 'العنوان',
    checkout_notes: 'ملاحظات خاصة',
    checkout_place_order: 'تأكيد الطلب',
    checkout_placing: 'جاري تأكيد الطلب...',
    checkout_terms: 'بإتمامك الطلب، فإنك توافق على شروطنا.',
    checkout_confirmed: 'تم تأكيد الطلب',
    checkout_thank_you: 'شكراً لك، سيتم شحن عطرك قريباً.',
    checkout_contact_you: 'سنتواصل معك على الرقم',
    checkout_name_placeholder: 'اسمك',
    checkout_phone_placeholder: '+1 (800) 555-0199',
    checkout_city_placeholder: 'مدينتك',
    checkout_address_placeholder: 'عنوان التوصيل',
    checkout_notes_placeholder: 'تغليف هدايا، تعليمات التوصيل...',
    checkout_error: 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.',

    footer_contact: 'تواصل معنا',
    footer_client_care: 'خدمة العملاء',
    footer_shipping: 'الشحن والتوصيل',
    footer_returns: 'الإرجاع',
    footer_privacy: 'سياسة الخصوصية',
    footer_faq: 'الأسئلة الشائعة',
    footer_admin_access: 'وصول المسؤول',

    admin_panel: 'لوحة التحكم',
    admin_enter_password: 'أدخل كلمة المرور لإدارة المتجر',
    admin_password: 'كلمة مرور المسؤول',
    admin_enter: 'دخول',
    admin_incorrect: 'كلمة مرور غير صحيحة. حاول مرة أخرى.',
    admin_default_hint: 'كلمة المرور الافتراضية: batttt',
    admin_back: 'العودة إلى المتجر',
    admin_products: 'المنتجات',
    admin_orders: 'الطلبات',
    admin_content: 'المحتوى',
    admin_assets: 'الصور',
    admin_settings: 'الإعدادات',
    admin_view_store: 'عرض المتجر',
    admin_logout: 'تسجيل الخروج',
    admin_add_fragrance: 'إضافة عطر',
    admin_new_fragrance: 'عطر جديد',
    admin_edit_fragrance: 'تعديل العطر',
    admin_images: 'الصور',
    admin_upload_device: 'ارفع من جهازك — يُخزن في Supabase',
    admin_title: 'الاسم',
    admin_price: 'السعر ($)',
    admin_description: 'الوصف',
    admin_top_notes: 'الطبقة العليا',
    admin_heart_notes: 'طبقة القلب',
    admin_base_notes: 'الطبقة الأساسية',
    admin_category: 'الفئة',
    admin_sort_order: 'ترتيب',
    admin_in_stock: 'متوفر',
    admin_featured: 'مميز',
    admin_save: 'حفظ',
    admin_saving: 'جاري الحفظ...',
    admin_edit: 'تعديل',
    admin_delete: 'حذف',
    admin_delete_confirm: 'حذف',
    admin_no_orders: 'لا توجد طلبات بعد',
    admin_items: 'العناصر',
    admin_status_pending: 'قيد الانتظار',
    admin_status_completed: 'مكتمل',
    admin_status_cancelled: 'ملغي',
    admin_content_editor: 'محرر محتوى الموقع',
    admin_content_desc: 'عدّل أي نص على الموقع. تُحفظ التغييرات فوراً وتتزامن عبر جميع الأجهزة.',
    admin_assets_manager: 'مدير الصور',
    admin_assets_desc: 'استبدل أي صورة في الموقع. تُرفع الصور إلى Supabase Storage وتتزامن عالمياً.',
    admin_settings_title: 'الإعدادات',
    admin_settings_desc: 'إدارة كلمة مرور المسؤول وإعدادات المتجر.',
    admin_connected: 'متصل بـ Supabase',
    admin_demo_mode: 'وضع تجريبي (بيانات وهمية)',
    admin_connected_desc: 'جميع التغييرات تتزامن فوراً عبر الأجهزة.',
    admin_demo_desc: 'اربط Supabase لتفعيل المزامنة الفورية.',
    admin_change_password: 'تغيير كلمة مرور المسؤول',
    admin_current_password: 'كلمة المرور الحالية',
    admin_new_password: 'كلمة المرور الجديدة',
    admin_confirm_password: 'تأكيد كلمة المرور الجديدة',
    admin_password_incorrect: 'كلمة المرور الحالية غير صحيحة.',
    admin_password_short: 'كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل.',
    admin_password_mismatch: 'كلمتا المرور غير متطابقتين.',
    admin_password_updated: 'تم تحديث كلمة المرور بنجاح.',
    admin_update_password: 'تحديث كلمة المرور',
    admin_no_image: 'لا توجد صورة',
    admin_replace: 'استبدال',
    admin_upload: 'رفع',
    admin_remove: 'إزالة',

    group_hero: 'القسم الرئيسي',
    group_about: 'قسم من نحن',
    group_collection: 'المجموعة والعائلات',
    group_buttons: 'الأزرار',
    group_footer: 'التذييل والتواصل',
    group_policies: 'السياسات',
    group_navigation: 'التنقل',
    group_checkout: 'الدفع',
    group_cart: 'السلة',
    group_product: 'المنتج',
    group_sort: 'الترتيب',
  },

  en: {
    welcome: 'Welcome to Maison Verdor',
    langSwitch: 'العربية',

    nav_collection: 'Collection',
    nav_families: 'Families',
    nav_about: 'About',
    nav_contact: 'Contact',
    search_placeholder: 'Search fragrances, notes, families...',

    hero_established: 'Maison de Parfum · Est. 1926',
    hero_our_story: 'Our Story',

    collection_boutique: 'Boutique',
    collection_signature: 'Signature Fragrances',
    sort_label: 'Sort',
    sort_featured: 'Featured',
    sort_price_asc: 'Price ↑',
    sort_price_desc: 'Price ↓',
    sort_name: 'A–Z',
    no_results: 'No fragrances found. Try a different search or family.',
    all_categories: 'All',

    product_signature: 'Signature',
    product_sold_out: 'Sold Out',
    product_in_stock: 'In Stock',
    product_top_notes: 'Top',
    product_heart_notes: 'Heart',
    product_base_notes: 'Base',

    cart_title: 'Your Cart',
    cart_empty: 'Your cart is empty',
    cart_empty_hint: 'Discover your signature scent',
    cart_total: 'Total',
    cart_clear: 'Clear cart',

    checkout_title: 'Checkout',
    checkout_summary: 'Order Summary',
    checkout_name: 'Full Name *',
    checkout_phone: 'Phone / WhatsApp *',
    checkout_city: 'City',
    checkout_address: 'Address',
    checkout_notes: 'Special Notes',
    checkout_place_order: 'Place Order',
    checkout_placing: 'Placing Order...',
    checkout_terms: 'By placing your order, you agree to our terms.',
    checkout_confirmed: 'Order Confirmed',
    checkout_thank_you: 'Thank you. Your fragrance is on its way.',
    checkout_contact_you: "We'll contact you on",
    checkout_name_placeholder: 'Your name',
    checkout_phone_placeholder: '+1 (800) 555-0199',
    checkout_city_placeholder: 'Your city',
    checkout_address_placeholder: 'Delivery address',
    checkout_notes_placeholder: 'Gift wrap, delivery instructions...',
    checkout_error: 'Something went wrong submitting your order. Please try again.',

    footer_contact: 'Contact',
    footer_client_care: 'Client Care',
    footer_shipping: 'Shipping & Delivery',
    footer_returns: 'Returns',
    footer_privacy: 'Privacy Policy',
    footer_faq: 'FAQ',
    footer_admin_access: 'Admin Access',

    admin_panel: 'Admin Panel',
    admin_enter_password: 'Enter your password to manage the store',
    admin_password: 'Admin password',
    admin_enter: 'Enter',
    admin_incorrect: 'Incorrect password. Try again.',
    admin_default_hint: 'Default password: batttt',
    admin_back: 'Back to store',
    admin_products: 'Products',
    admin_orders: 'Orders',
    admin_content: 'Content',
    admin_assets: 'Assets',
    admin_settings: 'Settings',
    admin_view_store: 'View Store',
    admin_logout: 'Logout',
    admin_add_fragrance: 'Add Fragrance',
    admin_new_fragrance: 'New Fragrance',
    admin_edit_fragrance: 'Edit Fragrance',
    admin_images: 'Images',
    admin_upload_device: 'Upload from device — stored in Supabase Storage',
    admin_title: 'Title',
    admin_price: 'Price ($)',
    admin_description: 'Description',
    admin_top_notes: 'Top Notes',
    admin_heart_notes: 'Heart Notes',
    admin_base_notes: 'Base Notes',
    admin_category: 'Category',
    admin_sort_order: 'Sort Order',
    admin_in_stock: 'In Stock',
    admin_featured: 'Featured',
    admin_save: 'Save',
    admin_saving: 'Saving...',
    admin_edit: 'Edit',
    admin_delete: 'Delete',
    admin_delete_confirm: 'Delete',
    admin_no_orders: 'No orders yet',
    admin_items: 'Items',
    admin_status_pending: 'Pending',
    admin_status_completed: 'Completed',
    admin_status_cancelled: 'Cancelled',
    admin_content_editor: 'Site Content Editor',
    admin_content_desc: 'Edit any text on the site. Changes save instantly and sync to all devices.',
    admin_assets_manager: 'Image Asset Manager',
    admin_assets_desc: 'Replace any image across the site. Uploads go to Supabase Storage and sync globally.',
    admin_settings_title: 'Settings',
    admin_settings_desc: 'Manage your admin password and store configuration.',
    admin_connected: 'Connected to Supabase',
    admin_demo_mode: 'Running in demo mode (mock data)',
    admin_connected_desc: 'All changes sync in real-time across devices.',
    admin_demo_desc: 'Connect Supabase to enable real-time sync.',
    admin_change_password: 'Change Admin Password',
    admin_current_password: 'Current Password',
    admin_new_password: 'New Password',
    admin_confirm_password: 'Confirm New Password',
    admin_password_incorrect: 'Current password is incorrect.',
    admin_password_short: 'New password must be at least 4 characters.',
    admin_password_mismatch: 'New passwords do not match.',
    admin_password_updated: 'Password updated successfully.',
    admin_update_password: 'Update Password',
    admin_no_image: 'No image set',
    admin_replace: 'Replace',
    admin_upload: 'Upload',
    admin_remove: 'Remove',

    group_hero: 'Hero Section',
    group_about: 'About Section',
    group_collection: 'Collection & Categories',
    group_buttons: 'Buttons',
    group_footer: 'Footer & Contact',
    group_policies: 'Policies',
    group_navigation: 'Navigation',
    group_checkout: 'Checkout',
    group_cart: 'Cart',
    group_product: 'Product',
    group_sort: 'Sort',
  },
};
