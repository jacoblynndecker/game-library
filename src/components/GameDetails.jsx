function GameDetails({ game, onBack, darkMode }) {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <button
        className={`mb-6 rounded-lg px-4 py-2 font-medium text-white transition ${
          darkMode
            ? "bg-blue-500 hover:bg-blue-400"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        onClick={onBack}
      >
        Back
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <img
          className="w-full rounded-xl object-cover"
          src={game.image}
          alt={game.title}
        />

        <div>
          <h2 className="text-3xl font-bold">
            {game.title}
          </h2>

          <p className="mt-2 text-gray-500">
            {game.genre}
          </p>

          <p className="mt-6">
            <span className="font-semibold">Rating:</span>{" "}
            {game.rating}
          </p>

          <p className="mt-2">
            <span className="font-semibold">Released:</span>{" "}
            {game.released}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;