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
          className="h-full max-h-[500px] w-full rounded-xl object-cover shadow-md"
          src={game.image}
          alt={game.title}
        />

        <div>
          <h2 className="text-3xl font-bold">
            {game.title}
          </h2>

          <p 
            className={`mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {game.genre}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div
                className={`rounded-lg px-4 py-3 ${
                    darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                }`}
            >
                <p className="text-sm font-medium">Rating</p>
                <p className="mt-1 text-lg font-semibold">
                    ⭐ {game.rating}
                </p>
            </div>

            <div
                className={`rounded-lg px-4 py-3 ${
                    darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                }`}
            >
                <p className="text-sm font-medium">Released</p>
                <p className="mt-1 text-lg font-semibold">
                    {game.released}
                </p>
            </div>

            <div
                className={`rounded-lg px-4 py-3 ${
                    darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                }`}
            >
                <p className="text-sm font-medium">Metacritic</p>
                <p className="mt-1 text-lg font-semibold">
                    {game.metacritic}
                </p>
            </div>

            <div
                className={`rounded-lg px-4 py-3 ${
                    darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                }`}
            >
                <p className="text-sm font-medium">Playtime</p>
                <p className="mt-1 text-lg font-semibold">
                    {game.playtime} hours
                </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Platforms</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {game.platforms.map((item) => (
                <span
                  key={item.platform.id}
                  className={`rounded-full px-3 py-1 text-sm ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.platform.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;