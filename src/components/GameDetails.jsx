function GameDetails({ game, onBack }) {
    return (
        <div>
            <button onClick={onBack}>Back</button>

            <h2>{game.title}</h2>
            <p>{game.genre}</p>
            <img src={game.image} alt={game.title} />
            <p>Rating: {game.rating}</p>
            <p>Released: {game.released}</p>
        </div>
    );
}

export default GameDetails;