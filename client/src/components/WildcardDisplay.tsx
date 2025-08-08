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
    <div className="max-w-6xl mx-auto text-center">
      {/* Special Wildcard Header with effects */}
      <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce">🎭✨🎭</div>
          <h2 className="text-4xl font-bold mb-2 text-white">WILDCARD CHALLENGE!</h2>
          <p className="text-lg text-pink-200">A special franchise mash-up awaits...</p>
        </div>
        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-70 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
              }}
            />
          ))}
        </div>
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
              className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* Row 1: Theme, Title, Scenario */}
      <div className="mb-8 p-8 bg-gradient-to-br from-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-sm rounded-lg border-2 border-purple-400 shadow-xl">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-500 text-white font-bold rounded-full text-sm mb-4">
            {wildcardQuestion.theme}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6 leading-relaxed">
          {wildcardQuestion.title}
        </h3>
        <p className="text-xl text-pink-200 leading-relaxed">
          {wildcardQuestion.scenario}
        </p>
      </div>

      {/* Row 2: Question and Image */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Question Column */}
        <div className="p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 shadow-xl">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded-full text-sm">
              CHALLENGE QUESTION
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {wildcardQuestion.question}
          </h4>
        </div>

        {/* Image Column */}
        <div className="flex items-center justify-center p-4">
          <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-purple-400 animate-pulse">
            <img
              src={`/images/${wildcardQuestion.image}`}
              alt="Wildcard Challenge"
              className="w-full max-w-sm h-auto object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPldpbGRjYXJkPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-transparent opacity-30"></div>
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
      <div className="mt-8 text-gray-400 text-sm italic">
        "This is heavy, Doc!" - Marty McFly encounters a franchise mash-up
      </div>
    </div>
  );
}