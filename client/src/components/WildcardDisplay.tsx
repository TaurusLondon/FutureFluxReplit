import { Team } from "../lib/gameData";
import { WildcardQuestion } from "../lib/questions";
import { useAudio } from "../lib/stores/useAudio";

interface WildcardDisplayProps {
  team: Team;
  wildcardQuestion: WildcardQuestion;
  onNextQuestion: () => void;
  onNewSpin: () => void;
}

export default function WildcardDisplay({ 
  team, 
  wildcardQuestion, 
  onNextQuestion, 
  onNewSpin 
}: WildcardDisplayProps) {
  const { playSuccess } = useAudio();

  const handleNextQuestion = () => {
    playSuccess();
    onNextQuestion();
  };

  const handleNewSpin = () => {
    playSuccess();
    onNewSpin();
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
      {/* Compact Wildcard Header */}
      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-2 animate-bounce">🎭</div>
          <h2 className="text-2xl font-bold mb-1 text-white">WILDCARD CHALLENGE!</h2>
          <p className="text-sm text-pink-200">{wildcardQuestion.theme}</p>
        </div>
      </div>

      {/* Team Info - Compact */}
      <div className="mb-4 p-3 bg-gray-800 bg-opacity-80 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">
          Team: {team.name}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {team.members.map((member, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs"
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* Row 1: Title and Scenario - Compact */}
      <div className="mb-4 p-4 bg-gradient-to-br from-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-sm rounded-lg border-2 border-purple-400 shadow-xl">
        <h3 className="text-lg font-bold text-yellow-300 mb-3 leading-tight">
          {wildcardQuestion.title}
        </h3>
        <p className="text-base text-pink-200 leading-relaxed">
          {wildcardQuestion.scenario}
        </p>
      </div>

      {/* Row 2: Question and Image - Side by Side */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Question Column */}
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 shadow-xl">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-xs">
              CHALLENGE QUESTION
            </span>
          </div>
          <h4 className="text-base font-bold text-white leading-relaxed">
            {wildcardQuestion.question}
          </h4>
        </div>

        {/* Image Column */}
        <div className="flex items-center justify-center p-2">
          <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-purple-400">
            <img
              src={`/images/${wildcardQuestion.image}`}
              alt="Wildcard Challenge"
              className="w-full max-w-xs h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPldpbGRjYXJkPC90ZXh0Pjwvc3ZnPg=="
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleNextQuestion}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold rounded-full transition-colors transform hover:scale-105 shadow-lg"
        >
          Another Question 🎲
        </button>
        <button
          onClick={handleNewSpin}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-full transition-colors transform hover:scale-105 shadow-lg"
        >
          Spin Wheel Again 🎡
        </button>
      </div>

      {/* Decorative elements */}
      <div className="mt-6 text-gray-400 text-2xl italic">
        "This is heavy, Doc!" - Marty McFly encounters a franchise mash-up
      </div>
    </div>
  );
}