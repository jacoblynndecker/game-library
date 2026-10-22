function GameDetails({ game }) {
    return (
        <div>
            <h2>{game.title}</h2>
            <p>{game.genre}</p>
        </div>
    );
}

export default GameDetails;