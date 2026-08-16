import { supabase } from './supabase';

const BUCKET = 'perfume-assets';

/** Upload a file to the perfume-assets bucket and return its public URL. */
export async function uploadImage(file: File, folder = 'products'): Promise<string> {
  if (!supabase) {
    // fallback: base64 data URL for when Supabase is not configured
    return fileToDataUrl(file);
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) {
    // fallback to base64 so the admin never loses the upload
    console.warn('Storage upload failed, using base64 fallback:', error.message);
    return fileToDataUrl(file);
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
