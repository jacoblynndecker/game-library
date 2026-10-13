import { useState } from "react";

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "RPG", "Action RPG"];

  const games = [
    {
      id: 1,
      title: "The Witcher 3: Wild Hunt",
      genre: "RPG",
    },
    {
      id: 2,
      title: "Elden Ring",
      genre: "Action RPG",
    },
  ];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (

    <main>

      <h1>Game Catalog</h1>
      <p>Explore games and find your next favorite.</p>

      <input type="text" placeholder="Search games..."
      onChange={(event) => setSearchTerm(event.target.value)}/>

      <select onChange={(event) => setSelectedGenre(event.target.value)}>
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
          />
        ))}
      </section>

    </main>

  );
}

function GameCard(props) {

  return (

    <div>
      <h2>{props.title}</h2>
      <p>{props.genre}</p>
    </div>

  );
}

export default App;