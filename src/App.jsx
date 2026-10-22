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
          genre: game.genres[0].name
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

    <main>
      {selectedGame ? (
        <GameDetails game={selectedGame} />
      ) : (
      <>
        <h1>Game Catalog</h1>
        <p>Explore games and find your next favorite.</p>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onResetFilters={resetFilters}
          isResetDisabled={isResetDisabled}
        />

        <p>{gameCountMessage}</p>

        <select 
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}>
          
          {genres.map((genre) => 
            <option key={genre} value={genre}>
              {genre}
            </option>
          )}
        </select>

        <section>
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
    </main>

  );
}

export default App;