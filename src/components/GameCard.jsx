function GameCard( {title, genre, game, onSelect }) {

  return (

    <div onClick={() => onSelect(game)}>
      <h2>{title}</h2>
      <p>{genre}</p>
    </div>

  );
}

export default GameCard;