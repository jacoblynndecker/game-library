import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";

function App() {

  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

  return (

    <main 
      className={`min-h-screen ${
        darkMode ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div className="mx-auto max-w-7xl p-8">
      {selectedGame ? (
        <GameDetails 
          game={selectedGame}
          onBack={() => setSelectedGame(null)}
          darkMode={darkMode}
        />
      ) : (
      <>
        <h1
          className={`text-4xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Game Catalog
        </h1>

        <div className="mt-4 flex items-center gap-2">
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

          <span className="text-base font-medium text-gray-700">
            Dark Mode
          </span>
        </div>

        <p 
          className={`mt-2 mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
            Explore games and find your next favorite.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onResetFilters={resetFilters}
          isResetDisabled={isResetDisabled}
          darkMode={darkMode}
        />

        {!loading && !error && (
          <p
            className={`mt-6 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {gameCountMessage}
          </p>
        )}

        <select
          className={`mt-3 rounded-lg px-4 py-2 ${
            darkMode
              ? "border-gray-600 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`} 
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          
          {genres.map((genre) => 
            <option key={genre} value={genre}>
              {genre}
            </option>
          )}
        </select>

        {error && (
          <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
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
          <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                genre={game.genre}
                game={game}
                onSelect={setSelectedGame}
                darkMode={darkMode}
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