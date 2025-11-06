import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * 
 * @param file - The image file to upload.
 * @returns The public URL of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Get the current session (user must be logged in)
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    const session = sessionData?.session;
    if (!session) {
      toast.error("You must be logged in to upload.");
      return null;
    }

    // Generate unique file name using user ID + timestamp
    const fileName = `${session.user.id}/${Date.now()}_${file.name}`;

    // Upload the file to your Supabase bucket
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images") // ✅ your bucket name
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    // Get the public URL after upload
    const { data: publicData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(fileName);

    if (!publicData?.publicUrl) throw new Error("Failed to get image URL");

    toast.success("Image uploaded successfully!");
    return publicData.publicUrl;
  } catch (error: any) {
    console.error("Upload failed:", error.message);
    toast.error("Upload failed!");
    return null;
  }
}
