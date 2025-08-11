import { Team } from "../lib/gameData";
import { useAudio } from "../lib/stores/useAudio";

interface QuestionDisplayProps {
  team: Team;
  timePeriod: "past" | "present" | "future";
  question: string;
  onNextQuestion: () => void;
  onNewSpin: () => void;
}

export default function QuestionDisplay({
  team,
  timePeriod,
  question,
  onNextQuestion,
  onNewSpin,
}: QuestionDisplayProps) {
  const { playSuccess } = useAudio();

  const handleNextQuestion = () => {
    playSuccess();
    onNextQuestion();
  };

  const handleNewSpin = () => {
    playSuccess();
    onNewSpin();
  };

  const getTimePeriodInfo = () => {
    switch (timePeriod) {
      case "past":
        return {
          emoji: "⏪",
          title: "THE PAST",
          subtitle:
            "We time-travelled back to ancient Rome. Caesar said, 'Et tu, UX?",
          bgColor: "from-amber-600 to-orange-700",
          textColor: "text-orange-200",
        };
      case "present":
        return {
          emoji: "⏸️",
          title: "THE PRESENT",
          subtitle:
            "We’re not just thinking outside the box—we’re thinking outside the timeline.",
          bgColor: "from-green-600 to-emerald-700",
          textColor: "text-green-200",
        };
      case "future":
        return {
          emoji: "⏩",
          title: "THE FUTURE",
          subtitle: "Where we’re going, we don’t need roadmaps",
          bgColor: "from-purple-600 to-indigo-700",
          textColor: "text-purple-200",
        };
    }
  };

  const periodInfo = getTimePeriodInfo();

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Time Period Header */}
      <div
        className={`mb-8 p-6 rounded-lg bg-gradient-to-r ${periodInfo.bgColor} shadow-2xl`}
      >
        <div className="text-6xl mb-4">{periodInfo.emoji}</div>
        <h2 className="text-4xl font-bold mb-2 text-white">
          {periodInfo.title}
        </h2>
        <p className="text-lg ${periodInfo.textColor}">{periodInfo.subtitle}</p>
      </div>

      {/* Team Info */}
      <div className="mb-8 p-4 bg-gray-800 bg-opacity-80 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-cyan-400">
          Team: {team.name}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {team.members.map((member, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* Question Display */}
      <div className="mb-8 p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 shadow-xl">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded-full text-sm">
            QUESTION
          </span>
        </div>
        {/* Theme */}
        <h3 className="text-xl md:text-2xl font-semibold text-yellow-300 mb-2">
          {question.split(" - ")[0]}
        </h3>

        {/* Actual Question */}
        <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
          {question.split(" - ")[1]}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleNextQuestion}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors transform hover:scale-105 shadow-lg"
        >
          Another Question 🎲
        </button>
        <button
          onClick={handleNewSpin}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors transform hover:scale-105 shadow-lg"
        >
          Spin Wheel Again 🎡
        </button>
      </div>

      {/* Decorative elements */}
      <div className="mt-8 text-gray-400 text-3xl italic">
        "Great Scott! That's a challenging question!" - Doc Brown
      </div>
    </div>
  );
}
