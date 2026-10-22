function GameDetails({ game, onBack }) {
    return (
        <div>
            <button onClick={onBack}>Back</button>
            
            <h2>{game.title}</h2>
            <p>{game.genre}</p>
        </div>
    );
}

export default GameDetails;