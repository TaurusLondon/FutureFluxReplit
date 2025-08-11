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
  onNewSpin,
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
    <div className="h-screen overflow-y-auto">
      <div className="max-w-5xl mx-auto text-center">
        {/* Compact Wildcard Header */}
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-4xl mb-2 animate-bounce">🎭</div>
            <h2 className="text-xl font-bold mb-1 text-white">
              WILDCARD CHALLENGE!
            </h2>
            <p className="text-2xl text-pink-200">{wildcardQuestion.theme}</p>
          </div>
        </div>
        {/* Image */}
        <div className="flex items-center justify-center">
          <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-purple-400 mb-6">
            <img
              src={`/images/${wildcardQuestion.image}`}
              alt="Wildcard Challenge"
              className="w-full max-w-screen-lg max-h-68 h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPldpbGRjYXJkPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          </div>
        </div>

        {/* Row 1: Title and Scenario - Compact */}
        <div className="mb-4 p-4 bg-gradient-to-br from-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-sm rounded-lg border-2 border-purple-400 shadow-xl">
          <div className="mb-3">
            {/* <span className="inline-block px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-xs">
            QUESTION
          </span> */}
            <h3 className="text-lg font-bold text-yellow-300 mb-3 leading-tight">
              {wildcardQuestion.title}
            </h3>
            <p className="text-base text-pink-200 leading-relaxed">
              {wildcardQuestion.scenario}
            </p>
            <h4 className="text-base font-bold text-white leading-relaxed">
              {wildcardQuestion.question}
            </h4>
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
    </div>
  );
}
