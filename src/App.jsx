function App() {

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

  return (

    <main>

      <h1>Game Catalog</h1>
      <p>Explore games and find your next favorite.</p>

      <section>
        {games.map((game) => (
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