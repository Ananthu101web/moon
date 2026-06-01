# 🌙 Moon's Birthday Website

A luxury, romantic birthday website built with React, Firebase, Bootstrap 5, and Framer Motion.

---

## ✅ One-Time Setup (Do This First!)

### 1. Create the Firebase Auth User

Go to **Firebase Console → Authentication → Users → Add User**:

| Field | Value |
|-------|-------|
| Email | `moon@birthdaylove.app` |
| Password | Her birthday (e.g. `19052002` — whatever format you choose) |

> ⚠️ This password must match `VITE_LOGIN_PASSWORD` in your `.env` file.

### 2. Configure `.env`

Open `d:\moon\.env` and set:

```env
VITE_LOGIN_PASSWORD=HerActualBirthday   # Replace with her birthday
```

All other values are already filled in with your Firebase project.

### 3. Enable Firebase Services

In **Firebase Console**, enable:
- **Authentication** → Sign-in method → Email/Password ✅
- **Firestore Database** → Create database (Start in test mode initially)
- **Storage** → Get started (Start in test mode initially)

### 4. Set Firestore & Storage Rules (after testing)

**Firestore Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Storage Rules:**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🚀 Running Locally

```bash
cd d:\moon
npm run dev
```

Open http://localhost:5173

**Login with:**
- Username: `MOON`
- Password: Her birthday (whatever you set in `.env`)

---

## 📦 Deploying to Firebase Hosting

```bash
# 1. Install Firebase CLI (once)
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Build production bundle
npm run build

# 4. Deploy
firebase deploy
```

Your site will be live at: `https://moon-birthday-9ac13.web.app`

---

## 🔐 Admin Panel

To access the Admin Panel (`/admin`):
1. Go to Firebase Console → Authentication → Users
2. Create a second user with the email matching `VITE_ADMIN_EMAIL` (default: `admin@birthdaylove.app`)
3. Set any password for the admin
4. Log in with admin credentials → You'll see the "Admin ⚙️" button in the navbar

**Admin capabilities:**
- 📸 Upload photos → Gallery section
- 🎬 Upload video message
- 🎙️ Upload voice notes
- 📅 Add timeline events
- ❤️ Add/update love reasons

---

## 🎵 Adding Background Music

1. Upload an audio file to Firebase Storage manually (or via Admin panel in future)
2. Get its download URL
3. In `src/pages/MainApp.jsx`, update line ~36:
   ```jsx
   <MusicPlayer src="YOUR_AUDIO_DOWNLOAD_URL" />
   ```

---

## 📁 Project Structure

```
src/
├── components/         # Reusable: Navbar, Stars, Hearts, MusicPlayer, SecretModal
├── contexts/           # AuthContext — Firebase auth state
├── data/               # defaults.js — 100 love reasons, letters, timeline, dreams
├── firebase/           # config.js — Firebase SDK init
├── pages/
│   ├── Login.jsx       # Dark glassmorphism login
│   ├── MainApp.jsx     # Page assembler
│   └── admin/
│       └── AdminDashboard.jsx
├── sections/           # All scrollable sections
│   ├── LandingSection.jsx
│   ├── CounterSection.jsx
│   ├── TimelineSection.jsx
│   ├── GallerySection.jsx
│   ├── LoveReasonsSection.jsx
│   ├── OpenWhenSection.jsx
│   ├── VideoSection.jsx
│   ├── VoiceNotesSection.jsx
│   ├── LongDistanceSection.jsx
│   ├── GiftBoxSection.jsx
│   ├── FutureDreamsSection.jsx
│   └── FinalSection.jsx
└── styles/
    ├── global.css      # Design system, buttons, glass cards
    ├── theme.css       # Color tokens, fonts
    └── animations.css  # All keyframe animations
```

---

## 💌 Customizing Content

All placeholder content lives in `src/data/defaults.js`:
- `loveReasons` — 100 love reasons (edit freely!)
- `openWhenLetters` — 5 letters (edit the `content` fields)
- `timelineEvents` — Add real dates and memories
- `futureDreams` — Edit the dream cards

---

Made with ❤️ for Moon 🌙
