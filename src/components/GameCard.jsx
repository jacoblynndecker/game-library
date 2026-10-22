function GameCard( {title, genre, game, onSelect }) {

  return (
    <div 
      className="game-card"
      onClick={() => onSelect(game)}
    >
      <img src={game.image} alt={game.title} />
      
      <h2>{title}</h2>
      <p>{genre}</p>
    </div>

  );
}

export default GameCard;