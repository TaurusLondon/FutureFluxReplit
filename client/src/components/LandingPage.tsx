import { useEffect, useState } from "react";
import { useAudio } from "../lib/stores/useAudio";

interface LandingPageProps {
  onTravelClick: () => void;
}

export default function LandingPage({ onTravelClick }: LandingPageProps) {
  const { setBackgroundMusic, isMuted } = useAudio();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load background music
    const audio = new Audio("/sounds/background.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    setBackgroundMusic(audio);

    // Play music if not muted
    if (!isMuted) {
      audio.play().catch(console.log);
    }

    setIsLoaded(true);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [setBackgroundMusic, isMuted]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 text-center max-w-4xl px-4">
        {/* Movie poster */}
        <div className="w-80 h-96 mx-auto mb-8 rounded-lg shadow-2xl relative overflow-hidden">
          <img 
            src="https://www.cinemapostergallery.co.uk/wp-content/uploads/2024/08/Back-to-the-Future-1985-Original-US-One-Sheet-Re-Release-Poster-framed.jpg"
            alt="Back to the Future Movie Poster"
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              // Fallback to styled div if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback styled div (hidden by default) */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-red-600 flex flex-col items-center justify-center text-black font-bold rounded-lg" style={{ display: 'none' }}>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="z-10 text-center p-4">
              <h1 className="text-4xl mb-4 text-white drop-shadow-lg">BACK TO THE</h1>
              <h1 className="text-6xl mb-6 text-yellow-300 drop-shadow-lg">FUTURE</h1>
              <div className="text-white text-lg">
                <p>A Team Selection</p>
                <p>Adventure Game</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse">
          Time Travel Team Selector
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Journey through time to select your team and answer questions from the Past, Present, and Future!
        </p>

        {/* Travel button */}
        <button
          onClick={onTravelClick}
          className="group relative px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center gap-4">
            <span>Let's Travel!</span>
            <span className="text-3xl animate-bounce">🚗💨</span>
          </div>
        </button>

        {/* Footer text */}
        <p className="mt-8 text-sm text-gray-400">
          "Roads? Where we're going, we don't need roads!" - Doc Brown
        </p>
      </div>
    </div>
  );
}
