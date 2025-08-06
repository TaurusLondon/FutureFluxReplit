import { useState } from "react";
import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";
import { useAudio } from "./lib/stores/useAudio";
import "./styles/wheel.css";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "game">("landing");
  const { toggleMute, isMuted } = useAudio();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Mute button in top right */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {currentPage === "landing" && (
        <LandingPage onTravelClick={() => setCurrentPage("game")} />
      )}
      
      {currentPage === "game" && (
        <GamePage onBackToStart={() => setCurrentPage("landing")} />
      )}
    </div>
  );
}

export default App;
