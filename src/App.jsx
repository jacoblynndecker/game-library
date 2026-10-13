function App() {

  return (

    <main>

      <h1>Game Catalog</h1>
      <p>Explore games and find your next favorite.</p>

      <section>
        <GameCard title="The Witcher 3: Wild Hunt" genre="RPG"/>
        <GameCard title="Elden Ring" genre="Action RPG"/>
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