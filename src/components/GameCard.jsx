import { Heart } from "lucide-react";

function GameCard({
  title, 
  genre, 
  game, 
  onSelect, 
  darkMode, 
  isFavorite, 
  onToggleFavorite, 
}) {

return (
  
  // Main game card
  <div 
    className={`cursor-pointer overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
      darkMode
        ? "border-gray-700 bg-gray-800"
        : "border-gray-200 bg-white"
    }`}
    onClick={() => onSelect(game)}
  >

  {/* Game image and favorite button */}
  <div className="relative">
    <img
      className="h-48 w-full object-cover"
      src={game.image}
      alt={game.title}
    />

    {/* Favorite toggle */}
    <button
      type="button"
      onClick={(event) => {
        // Prevent the card click from opening game details
        event.stopPropagation();
        onToggleFavorite();
      }}
      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-md transition hover:scale-110"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={20}
        fill={isFavorite ? "currentColor" : "none"}
        className={isFavorite ? "text-red-500" : "text-gray-600"}
      />
    </button>
  </div>

  {/* Game information */}
  <div className="p-4">
    <h2 
      className={`text-xl font-semibold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h2>
    <p 
      className={`mt-1 text-sm ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {genre}
    </p>
  </div>
  </div>
);
}

export default GameCard;