import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";
import { RotateCcw, ChevronDown, Check } from "lucide-react";

function App() {

  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("/api/games");

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();

        setGames(data);
      } catch (error) {
        console.error("Error fetching games: ", error);
        setError("Unable to load games. Please try again later.");

      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const genres = [
    "All",
    ...new Set(games.map((game) => game.genre)),
  ];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  let gameCountMessage;

  if (filteredGames.length === 0) {
    gameCountMessage = "No results";
  } else if (filteredGames.length === 1) {
    gameCountMessage = "1 result"; 
  } else {
    gameCountMessage = `${filteredGames.length} results`;
  }

  const isResetDisabled = searchTerm === "" && selectedGenre === "All";

  function resetFilters() {
    setSearchTerm("");
    setSelectedGenre("All");
  }

  function toggleFavorite(gameId) {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(gameId)
        ? prevFavorites.filter((id) => id !== gameId)
        : [...prevFavorites, gameId]
    );
  }

  return (

    <main 
      className={`min-h-screen ${
        darkMode ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-8 py-10">
      {selectedGame ? (
        <GameDetails 
          game={selectedGame}
          onBack={() => setSelectedGame(null)}
          darkMode={darkMode}
        />
      ) : (
      <>
        <div className="flex items-center justify-between">
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Game Catalog
          </h1>

          <div className="flex items-center gap-2">
            <button
              className={`relative h-8 w-13 rounded-full transition-colors ${
                darkMode ? "bg-blue-400" : "bg-gray-400"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>

            <span className={`text-base font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Dark Mode
            </span>
          </div>
        </div>

        <p 
          className={`mt-4 mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
            Explore games and find your next favorite.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="relative w-48">
            <button
              type="button"
              onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {selectedGenre === "All" ? "All Genres" : selectedGenre}

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } ${isGenreMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isGenreMenuOpen && (
              <div
                className={`absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border p-1 shadow-lg ${
                  darkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}           
              > 
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      setSelectedGenre(genre);
                      setIsGenreMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedGenre === genre
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {genre === "All" ? "All Genres" : genre}

                    {selectedGenre === genre && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                : "border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
            disabled={isResetDisabled}
            onClick={resetFilters}
          >

          <RotateCcw size={16} />

            Reset
          </button>
        </div>

        {!loading && !error && (
          <p
            className={`mt-4 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {gameCountMessage}
          </p>
        )}

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

        {loading && (
          <p className="mt-6 text-gray-500">
            Loading games...
          </p>
        )}

        {!loading && !error && filteredGames.length === 0 && (
          <p className="mt-6 text-gray-500">
            No games found. Try adjusting your search or filters.
          </p>
        )}

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
      )}
      </div>
    </main>

  );
}

export default App;