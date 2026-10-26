function GameCard( {title, genre, game, onSelect, darkMode }) {

  return (
    <div 
      className={`cursor-pointer overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        darkMode
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white"
      }`}
      onClick={() => onSelect(game)}
    >
      <img
        className="h-48 w-full object-cover"
        src={game.image} 
        alt={game.title} 
      />

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