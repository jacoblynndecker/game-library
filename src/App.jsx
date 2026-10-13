import { useState } from "react";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (

    <main>

      <h1>Game Catalog</h1>
      <p>Explore games and find your next favorite.</p>

      <input type="text" placeholder="Search games..."
      onChange={(event) => setSearchTerm(event.target.value)}/>

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