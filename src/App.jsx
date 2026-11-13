import { useState, useEffect } from "react";

import GameDetails from "./components/GameDetails";
import GameHeader from "./components/GameHeader";
import GameFilters from "./components/GameFilters";
import GameGrid from "./components/GameGrid";

function App() {

  // Game data and search/filter state
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All Games");

  // Dropdown menu state
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const [isCollectionMenuOpen, setIsCollectionMenuOpen] = useState(false);

  // Selected game and API loading/error state
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Favorites state, initialized from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  // Dark mode state, initialized from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Fetch game data when the app first loads
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

  // Save dark mode preference whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Save favorites whenever the favorites list changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Create a list of unique genres from the game data
  const genres = [
    "All",
    ...new Set(games.map((game) => game.genre)),
  ];

  // Filter games based on search, genre, and selected collection
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.
      toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre = 
      selectedGenre === "All" || game.genre === selectedGenre;

    const matchesCollection = 
      selectedCollection === "All Games" 
      || favorites.includes(game.id);

    return matchesSearch && matchesGenre && matchesCollection;
  });

  // Create the result count message
  let gameCountMessage;

  if (filteredGames.length === 0) {
    gameCountMessage = "No results";
  } else if (filteredGames.length === 1) {
    gameCountMessage = "1 result"; 
  } else {
    gameCountMessage = `${filteredGames.length} results`;
  }

  // Determine whether the reset button should be disabled
  const isResetDisabled = 
    searchTerm === "" && 
    selectedGenre === "All" &&
    selectedCollection === "All Games";

  // Reset all search and collection filters
  function resetFilters() {
    setSearchTerm("");
    setSelectedGenre("All");
    setSelectedCollection("All Games");
  }

  // Add or remove a game from the favorites list
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
        <GameHeader
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <GameFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          isGenreMenuOpen={isGenreMenuOpen}
          setIsGenreMenuOpen={setIsGenreMenuOpen}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          isCollectionMenuOpen={isCollectionMenuOpen}
          setIsCollectionMenuOpen={setIsCollectionMenuOpen}
          isResetDisabled={isResetDisabled}
          resetFilters={resetFilters}
        />

        <GameGrid
          darkMode={darkMode}
          loading={loading}
          error={error}
          gameCountMessage={gameCountMessage}
          filteredGames={filteredGames}
          favorites={favorites}
          setSelectedGame={setSelectedGame}
          toggleFavorite={toggleFavorite}
        />
      </>
      )}
      </div>
    </main>
  );
}

export default App;