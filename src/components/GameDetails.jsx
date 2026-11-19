import { ArrowLeft, Star, CalendarDays } from "lucide-react";
import PlatformIcon from "./PlatformIcon";
import { platformFamilies } from "../utils/PlatformIcons";

function GameDetails({
  game,
  onBack,
  darkMode
}) {

  const uniquePlatforms = [
    ...new Map(
      (game.platforms ?? []).map((item) => {
        const family = platformFamilies[item.platform.id];

        return [family ?? item.platform.id, { ...item, family }];
      })
    ).values(),
  ];

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
              <div className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3">

                {/* Five-star rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = (game.rating ?? 0) / 20;
                    const fillPercentage = Math.max(
                      0,
                      Math.min(100, (rating - star + 1) * 100)
                    );

                    return (
                      <span key={star} className="relative">
                        {/* Empty Star */}
                        <Star
                          size={25}
                          className="text-gray-600"
                        />

                        {/* Filled portion */}
                        <span 
                          className="absolute inset-0 overflow-hidden"
                          style={{width: `${fillPercentage}%` }}
                        >
                          <Star
                            size={25}
                            className="fill-purple-500 text-purple-500"
                          />
                        </span>
                      </span>
                    );
                  })}
                </div>

                {/* Numerical rating */}
                <div>
                  <p className="text-2xl font-extrabold text-purple-400">
                    {game.rating != null
                      ? `${(game.rating /20).toFixed(1)}`
                      : "N/A"}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    IGDB Rating
                  </p>
                </div>

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

            {/* Platforms */}
            <div className="mt-6 flex flex-wrap items-center gap-5">
              {uniquePlatforms.map((item) => (
                <PlatformIcon
                  key={item.family ?? item.platform.id}
                  platform={item.platform}
                  family={item.family}
                  darkMode={darkMode}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Additional Game information */}
      <div className="p-8 md:p-12">
        <section className="mb-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Developers */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Developer
              </h4>

              <p className="mt-2">
                {game.developers?.length
                  ? game.developers.join(", ")
                  : "Unknown"}
              </p>
            </div>

            {/* Publishers */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Publisher
              </h4>

              <p className="mt-2">
                {game.publishers?.length
                  ? game.publishers.join(", ")
                  : "Unknown"}
              </p>
            </div>
          </div>
        </section>

        {/* Game description */}
        <section className="mb-10">
          <h3 className="text-xl font-bold">
            About
          </h3>

          <p className={`mt-4 max-w-4xl leading-7 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {game.description}
          </p>
        </section>

      </div>
    </div>
  );
}

export default GameDetails;