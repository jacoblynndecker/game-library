import GameCard from "./GameCard";

function GameGrid({
  darkMode,
  loading,
  error,
  gameCountMessage,
  filteredGames,
  favorites,
  setSelectedGame,
  toggleFavorite,
}) {
  return (
    <>
      {/* Game result count */}
      {!loading && !error && (
        <p
          className={`mt-4 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {gameCountMessage}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          className={`mt-6 max-w-sm rounded-lg p-4 ${
            darkMode
              ? "bg-red-950 text-red-300"
              : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </p>
      )}

      {/* Loading message */}
      {loading && (
        <p className="mt-6 text-gray-500">
          Loading games...
        </p>
      )}

      {/* Empty results message */}
      {!loading && !error && filteredGames.length === 0 && (
        <p className="mt-6 text-gray-500">
          No games found. Try adjusting your search or filters.
        </p>
      )}

      {/* Game card grid */}
      {!loading && !error && (
        <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              game={game}
              onSelect={setSelectedGame}
              darkMode={darkMode}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={() => toggleFavorite(game.id)}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default GameGrid;