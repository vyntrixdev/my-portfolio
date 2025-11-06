// uploadImage.ts
import { supabase } from '../lib/supabase';

export async function uploadProjectImage(file: File, filename: string) {
  const { data, error } = await supabase.storage
    .from('portfolio-images')
    .upload(filename, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  // get public URL (if bucket is public)
  const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(data.path);
  return publicUrl;
}
