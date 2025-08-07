import { useState } from "react";
import { useAudio } from "../lib/stores/useAudio";

interface MysteryBoxesProps {
  onTimePeriodSelected: (period: "past" | "present" | "future") => void;
}

type TimePeriod = "past" | "present" | "future";

export default function MysteryBoxes({ onTimePeriodSelected }: MysteryBoxesProps) {
  const [revealedBox, setRevealedBox] = useState<TimePeriod | null>(null);
  const { playHit } = useAudio();

  // Randomize the order of time periods
  const [boxOrder] = useState(() => {
    const periods: TimePeriod[] = ["past", "present", "future"];
    return periods.sort(() => Math.random() - 0.5);
  });

  const handleBoxClick = (boxIndex: number) => {
    if (revealedBox) return;

    const selectedPeriod = boxOrder[boxIndex];
    setRevealedBox(selectedPeriod);
    playHit();

    setTimeout(() => {
      onTimePeriodSelected(selectedPeriod);
    }, 1500);
  };

  const getBoxContent = (period: TimePeriod) => {
    switch (period) {
      case "past":
        return { emoji: "⏪", title: "PAST", subtitle: "1885 - Wild West", color: "from-amber-600 to-orange-700" };
      case "present":
        return { emoji: "⏸️", title: "PRESENT", subtitle: "1985 - Hill Valley", color: "from-green-600 to-emerald-700" };
      case "future":
        return { emoji: "⏩", title: "FUTURE", subtitle: "2015 - Flying Cars", color: "from-purple-600 to-indigo-700" };
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">
        Choose Your Time Period! 🕰️
      </h2>
      <p className="text-gray-300 text-2xl mb-8 max-w-2xl mx-auto">
        Three mysterious boxes appear before you. Each contains questions from a different era. 
        Choose wisely, time travelers!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[0, 1, 2].map((boxIndex) => {
          const isRevealed = revealedBox && boxOrder[boxIndex] === revealedBox;
          const boxContent = isRevealed ? getBoxContent(revealedBox) : null;

          return (
            <div key={boxIndex} className="flex flex-col items-center">
              <button
                onClick={() => handleBoxClick(boxIndex)}
                disabled={!!revealedBox}
                className={`relative w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-2xl transform transition-all duration-500 ${
                  revealedBox 
                    ? (isRevealed ? 'scale-110 rotate-3' : 'scale-95 opacity-50')
                    : 'hover:scale-105 hover:shadow-cyan-400/30'
                } ${
                  !revealedBox ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                {!isRevealed ? (
                  /* Mystery box */
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border-4 border-gray-500 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📦</div>
                      <div className="text-yellow-400 font-bold text-sm">MYSTERY</div>
                      <div className="text-gray-300 text-3xl">Box {boxIndex + 1}</div>
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-yellow-400 rounded-full opacity-70 animate-ping"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 2 + 1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Revealed box */
                  <div className={`absolute inset-0 bg-gradient-to-br ${boxContent!.color} rounded-lg border-4 border-yellow-400 flex flex-col items-center justify-center text-white animate-pulse`}>
                    <div className="text-5xl mb-2">{boxContent!.emoji}</div>
                    <div className="font-bold text-xl mb-1">{boxContent!.title}</div>
                    <div className="text-sm opacity-90">{boxContent!.subtitle}</div>
                  </div>
                )}
              </button>

              {isRevealed && (
                <div className="mt-4 text-center animate-bounce">
                  <div className="text-yellow-400 font-bold text-lg">Selected!</div>
                  <div className="text-gray-300 text-sm">Preparing questions...</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!revealedBox && (
        <div className="mt-8 text-gray-400 text-2xl">
          Click on any box to reveal its time period and get your question!
        </div>
      )}
    </div>
  );
}
