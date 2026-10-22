import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";

function App() {

  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      const apiKey = import.meta.env.VITE_RAWG_API_KEY;
      const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`;

      const response = await fetch(url);
      const data = await response.json();
      
      const mappedGames = data.results.map((game) => {
        return {
          id: game.id,
          title: game.name,
          genre: game.genres[0].name,
          image: game.background_image,
          rating: game.rating,
          released: game.released
        };
      });

      setGames(mappedGames);
    }

    fetchGames();
  }, []);

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

    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-8">
      {selectedGame ? (
        <GameDetails 
          game={selectedGame}
          onBack={() => setSelectedGame(null)}
        />
      ) : (
      <>
        <h1 className="text-4xl font-bold text-gray-900">
          Game Catalog
        </h1>

        <p className="mt-2 mb-6 text-gray-600">
          Explore games and find your next favorite.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onResetFilters={resetFilters}
          isResetDisabled={isResetDisabled}
        />

        <p className="mt-6 text-sm text-gray-500">
          {gameCountMessage}
        </p>

        <select
          className="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900" 
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}>
          
          {genres.map((genre) => 
            <option key={genre} value={genre}>
              {genre}
            </option>
          )}
        </select>

        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              game={game}
              onSelect={setSelectedGame}
            />
          ))}
        </section>
        </>
      )}
      </div>
    </main>

  );
}

export default App;