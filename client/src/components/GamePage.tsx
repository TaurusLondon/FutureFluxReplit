import { useState, useEffect } from "react";
import SpinningWheel from "./SpinningWheel";
import MysteryBoxes from "./MysteryBoxes";
import QuestionDisplay from "./QuestionDisplay";
import { Team, teams as initialTeams } from "../lib/gameData";
import { questions, QuestionType } from "../lib/questions";
import { useAudio } from "../lib/stores/useAudio";

interface GamePageProps {
  onBackToStart: () => void;
}

type GameState = "wheel" | "boxes" | "question";
type TimePeriod = "past" | "present" | "future";

export default function GamePage({ onBackToStart }: GamePageProps) {
  const [gameState, setGameState] = useState<GameState>("wheel");
  const [availableTeams, setAvailableTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimePeriod | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [availableQuestions, setAvailableQuestions] = useState(questions);
  const { setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Load sound effects
    const hitAudio = new Audio("/sounds/hit.mp3");
    const successAudio = new Audio("/sounds/success.mp3");
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [setHitSound, setSuccessSound]);

  const handleTeamSelected = (team: Team) => {
    setSelectedTeam(team);
    setAvailableTeams((prev) => prev.filter((t) => t.id !== team.id));
    setGameState("boxes");
  };

  const handleTimePeriodSelected = (period: TimePeriod) => {
    setSelectedTimePeriod(period);

    // Get a random question from the selected time period
    const periodQuestions = availableQuestions[period];
    if (periodQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * periodQuestions.length);
      const question = periodQuestions[randomIndex];
      setCurrentQuestion(question);

      // Remove the question from available questions
      setAvailableQuestions((prev) => ({
        ...prev,
        [period]: prev[period].filter((_, index) => index !== randomIndex),
      }));

      setGameState("question");
    }
  };

  const handleNewSpin = () => {
    // Reset questions for new spin
    setAvailableQuestions(questions);
    setSelectedTeam(null);
    setSelectedTimePeriod(null);
    setCurrentQuestion("");
    setGameState("wheel");
  };

  const handleNextQuestion = () => {
    setGameState("boxes");
    setSelectedTimePeriod(null);
    setCurrentQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400 rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Future Products - I&P
          </h1>
          <button
            onClick={onBackToStart}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
          >
            Back to Start
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {gameState === "wheel" && (
          <div className="text-center">
            <SpinningWheel
              teams={availableTeams}
              onTeamSelected={handleTeamSelected}
            />
            {availableTeams.length === 0 && (
              <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                  All Teams Selected! 🎉
                </h2>
                <p className="mb-4 text-gray-300">
                  You've gone through all the teams. Ready for another round?
                </p>
                <button
                  onClick={() => setAvailableTeams(initialTeams)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                >
                  Reset Teams
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === "boxes" && selectedTeam && (
          <div className="text-center max-w-4xl w-full">
            <div className="mb-8 p-6 bg-gray-800 bg-opacity-80 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                Project Selected: {selectedTeam.name}
              </h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  Team Members:
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedTeam.members.map((member, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <MysteryBoxes onTimePeriodSelected={handleTimePeriodSelected} />
          </div>
        )}

        {gameState === "question" && selectedTeam && selectedTimePeriod && (
          <QuestionDisplay
            team={selectedTeam}
            timePeriod={selectedTimePeriod}
            question={currentQuestion}
            onNextQuestion={handleNextQuestion}
            onNewSpin={handleNewSpin}
          />
        )}
      </div>
    </div>
  );
}
