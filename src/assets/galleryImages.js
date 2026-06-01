/**
 * galleryImages.js — Centralized gallery configuration
 *
 * HOW TO ADD PHOTOS:
 * 1. Drop your .jpg / .jpeg / .png / .webp files into:
 *    src/assets/photos/
 *
 * 2. They are automatically picked up by Vite's glob import below.
 *    No code changes needed — just add the files and rebuild.
 *
 * 3. To set a custom caption, rename the file descriptively:
 *    "our-first-photo.jpg" → caption becomes "our first photo"
 *
 * After adding files, run: npm run build (or npm run dev to preview)
 */

// Vite glob — scans src/assets/photos/ at build time and bundles all images
const modules = import.meta.glob(
  "./photos/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}",
  { eager: true }
);

const galleryImages = Object.entries(modules).map(([path, mod], i) => {
  // Convert filename to a human-readable caption
  const filename = path.split("/").pop().replace(/\.[^.]+$/, "");
  const caption = filename.replace(/[-_]/g, " ");

  return {
    id: i + 1,
    src: mod.default,
    caption,
    alt: caption,
  };
});

export default galleryImages;
