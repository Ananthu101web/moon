/**
 * videoAssets.js — Centralized video configuration
 *
 * HOW TO ADD YOUR VIDEO MESSAGE:
 * 1. Place your video file in:
 *    src/assets/videos/
 *    (Recommended format: .mp4, H.264 codec, ≤ 50 MB for best Vite bundling)
 *
 * 2. Uncomment the import below and update the filename:
 *    import mainMessageVideo from "./videos/message.mp4";
 *
 * 3. Replace `null` with the imported variable:
 *    export const mainVideoSrc = mainMessageVideo;
 *
 * 4. Run: npm run build
 *
 * NOTE: For very large videos (> 100 MB), consider hosting externally
 * and pasting the direct URL string instead of importing the file.
 */

import mainMessageVideo from "./videos/message.mp4"; // ← uncomment when ready

/**
 * Set to your imported video variable, or a direct URL string.
 * When null, the video section shows a beautiful placeholder card.
 */
export const mainVideoSrc = mainMessageVideo;

/**
 * Optional poster image shown before the video plays.
 * import videoPoster from "./photos/video-poster.jpg";
 * export const mainVideoPoster = videoPoster;
 */
export const mainVideoPoster = null;
