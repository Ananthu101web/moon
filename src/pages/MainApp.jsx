// MainApp — Assembles all sections in order with Navbar and floating widgets
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";
import SecretMessageModal from "../components/SecretMessageModal";

import LandingSection from "../sections/LandingSection";
import CounterSection from "../sections/CounterSection";
import TimelineSection from "../sections/TimelineSection";
import GallerySection from "../sections/GallerySection";
import LoveReasonsSection from "../sections/LoveReasonsSection";
import OpenWhenSection from "../sections/OpenWhenSection";
import VideoSection from "../sections/VideoSection";
import VoiceNotesSection from "../sections/VoiceNotesSection";
import LongDistanceSection from "../sections/LongDistanceSection";
import GiftBoxSection from "../sections/GiftBoxSection";
import FutureDreamsSection from "../sections/FutureDreamsSection";
import FinalSection from "../sections/FinalSection";
import { useAuth } from "../contexts/AuthContext";
import bgMusic from "../assets/audio/bg-music.mp3";

export default function MainApp() {
  const { isAdmin } = useAuth();

  return (
    <div className="page-wrapper">
      {/* Persistent navigation */}
      <Navbar isAdmin={isAdmin} />

      {/* All sections — single scrollable page */}
      <LandingSection />
      <CounterSection />
      <TimelineSection />
      <GallerySection />
      <LoveReasonsSection />
      <OpenWhenSection />
      <VideoSection />
      <VoiceNotesSection />
      <LongDistanceSection />
      <GiftBoxSection />
      <FutureDreamsSection />
      <FinalSection />

      {/* Floating widgets */}
      {/* 
        HOW TO ADD BACKGROUND MUSIC:
        1. Place your background music file (e.g., bg-music.mp3) in: src/assets/audio/
        2. Import it at the top of this file:
           import bgMusic from "../assets/audio/bg-music.mp3";
        3. Change the src prop below to: src={bgMusic}
      */}
      <MusicPlayer src={bgMusic} />
      <SecretMessageModal />
    </div>
  );
}
