import { ArrowLeft, Star, CalendarDays } from "lucide-react";

function GameDetails({
  game,
  onBack,
  darkMode
}) {

  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-xl ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
    >

      {/* Hero section */}
      <div
        className="relative min-h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${game.heroImage || game.image})`, 
        }}
      >

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-black/20" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-8 md:p-12">

        {/* Back button */}
        <button
          className="absolute left-8 top-8 flex items-center gap-2 rounded-lg bg-black/40 px-4 py-2 font-medium text-white backdrop-blur-sm transition hover:bg-black/60 md:left-12 md:top-12"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back
        </button>

          {/* Game information */}
          <div className="max-w-3xl">

            {/* Genre */}
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              {game.genre}
            </p>

            {/* Game title */}
            <h2 className="text-4xl font-extrabold text-white md:text-6xl">
              {game.title}
            </h2>

            {/* Game metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-200">

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold text-white">
                  {game.rating ?? "N/A"}
                </span>

                <span className="text-gray-400">
                  IGDB Rating
                </span>
              </div>

              <div className="hidden h-5 w-px bg-gray-600 sm:block" />

              {/* Release date */}
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-gray-400"
                />

                <span>
                  {game.released
                    ? new Date(game.released).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Release date unknown"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Additional game information */}
      <div className="p-8 md:p-12">

        {/* Platforms */}
        <section>
          <h3 className="text-xl font-bold">
            Available Platforms
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {(game.platforms ?? []).map((item) => (
              <span
                key={item.platform.id}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                  darkMode
                    ? "border-gray-700 bg-gray-800 text-gray-200"
                    : "border-gray-200 bg-gray-100 text-gray-700"
                }`}
              >
                {item.platform.name}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default GameDetails;