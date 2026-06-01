/**
 * audioAssets.js — Centralized audio / voice notes configuration
 *
 * HOW TO ADD VOICE NOTES:
 * 1. Place your audio files in:
 *    src/assets/audio/
 *    (Recommended format: .mp3 or .m4a)
 *
 * 2. Import each file at the top of this file:
 *    import goodnightAudio from "./audio/goodnight.mp3";
 *
 * 3. Add an entry to the `audioAssets` array below:
 *    {
 *      id: "note1",
 *      title: "Goodnight, my love",
 *      src: goodnightAudio,
 *      duration: "1:15",       // optional display duration
 *    }
 *
 * 4.  Run: npm run build
 */

// ── Import your audio files here ──────────────────────────────────────────
import goodnightAudio from "./audio/goodnight.mp3";
import missingYouAudio from "./audio/missyou.mp3";
import birthdayAudio from "./audio/happybirthday.mp3";

/**
 * audioAssets — the live list shown in the Voice Notes section.
 * Add entries here once you have audio files imported above.
 */
const audioAssets = [
  { id: "note1", title: "Goodnight, my love", src: goodnightAudio, duration: "00:15" },
  { id: "note2", title: "Missing you today", src: missingYouAudio, duration: "0:24" },
  { id: "note3", title: "Happy Birthday, love", src: birthdayAudio, duration: "0:32" },
];

/**
 * Placeholder entries — shown when audioAssets is empty.
 * These display the player UI but have no audio loaded.
 */
export const placeholderAudioNotes = [
  { id: "p1", title: "A little note just for you", src: null, duration: "0:42" },
  { id: "p2", title: "Goodnight, my love", src: null, duration: "1:15" },
  { id: "p3", title: "Missing you today", src: null, duration: "0:58" },
];

export default audioAssets;
