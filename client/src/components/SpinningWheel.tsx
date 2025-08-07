import { useState, useRef } from "react";
import { Team } from "../lib/gameData";
import { useAudio } from "../lib/stores/useAudio";

interface SpinningWheelProps {
  teams: Team[];
  onTeamSelected: (team: Team) => void;
}

export default function SpinningWheel({ teams, onTeamSelected }: SpinningWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { playHit, playSuccess } = useAudio();

  const handleSpin = () => {
    if (isSpinning || teams.length === 0) return;

    setIsSpinning(true);
    playHit();

    // Random spin duration between 3-5 seconds
    const spinDuration = 3000 + Math.random() * 2000;
    const randomTeamIndex = Math.floor(Math.random() * teams.length);
    const selectedTeam = teams[randomTeamIndex];

    // Calculate rotation to land on selected team
    const degreesPerTeam = 360 / teams.length;
    const baseRotation = 360 * 5; // 5 full rotations
    const targetRotation = baseRotation + (randomTeamIndex * degreesPerTeam) + (degreesPerTeam / 2);

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${targetRotation}deg)`;
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      playSuccess();
      onTeamSelected(selectedTeam);
    }, spinDuration);
  };

  if (teams.length === 0) {
    return (
      <div className="text-center">
        <div className="text-2xl text-yellow-400 mb-4">No teams available!</div>
        <p className="text-gray-300">All teams have been selected.</p>
      </div>
    );
  }

  const degreesPerTeam = 360 / teams.length;

  return (
    <div className="flex flex-col items-center">
      {/* Flux Capacitor Wheel */}
      <div className="relative mb-8">
        {/* Wheel pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-yellow-400"></div>
        </div>

        {/* Wheel container */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          {/* Wheel segments */}
          <div
            ref={wheelRef}
            className="absolute inset-0 rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden"
            style={{
              backgroundImage: "url('https://stickeredup4lemans.com/cdn/shop/files/SillyStuff12_2048x.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            {teams.map((team, index) => {
              const rotation = index * degreesPerTeam;
              return (
                <div
                  key={team.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded text-xs md:text-sm font-bold text-center max-w-24 md:max-w-28"
                    style={{
                      transform: `rotate(-${rotation}deg)`,
                    }}
                  >
                    {team.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center flux capacitor image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-yellow-300 shadow-lg transform transition-all duration-200 ${
                isSpinning 
                  ? 'scale-95 cursor-not-allowed' 
                  : 'hover:scale-110 cursor-pointer hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-black font-bold">
                <div className="text-xl">⚡</div>
                <div className="text-xs">SPIN</div>
              </div>
            </button>
          </div>

          {/* Glowing effect when spinning */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-pulse shadow-2xl shadow-cyan-400/50"></div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          Flux Capacitor Team Selector
        </h2>
        <p className="text-gray-300 mb-6">
          Click the center button to spin the wheel and select a random team!
        </p>
        <div className="text-sm text-gray-400">
          Teams remaining: {teams.length}
        </div>
      </div>
    </div>
  );
}
