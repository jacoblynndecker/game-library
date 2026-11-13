import SearchBar from "./SearchBar";

import { RotateCcw, ChevronDown, Check } from "lucide-react";

function GameFilters({
  searchTerm,
  onSearchChange,
  darkMode,
  genres,
  selectedGenre,
  setSelectedGenre,
  isGenreMenuOpen,
  setIsGenreMenuOpen,
  selectedCollection,
  setSelectedCollection,
  isCollectionMenuOpen,
  setIsCollectionMenuOpen,
  isResetDisabled,
  resetFilters,
}) {
  return (
    <>
      {/* Search bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        darkMode={darkMode}
      />

      {/* Genre, collection, and reset controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Genre dropdown */}
          <div className="relative w-48">
            <button
              type="button"
              onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {selectedGenre === "All" ? "All Genres" : selectedGenre}

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } ${isGenreMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isGenreMenuOpen && (
              <div
                className={`absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border p-1 shadow-lg ${
                  darkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      setSelectedGenre(genre);
                      setIsGenreMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedGenre === genre
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {genre === "All" ? "All Genres" : genre}

                    {selectedGenre === genre && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collection dropdown */}
          <div className="relative w-48">
            <button
              type="button"
              onClick={() =>
                setIsCollectionMenuOpen(!isCollectionMenuOpen)
              }
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {selectedCollection}

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } ${isCollectionMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCollectionMenuOpen && (
              <div
                className={`absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border p-1 shadow-lg ${
                  darkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                {["All Games", "Favorites"].map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={() => {
                      setSelectedCollection(collection);
                      setIsCollectionMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedCollection === collection
                        ? darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {collection}

                    {selectedCollection === collection && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reset filters button */}
        <button
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            darkMode
              ? "border-gray-600 text-gray-300 hover:bg-gray-800"
              : "border-gray-300 text-gray-700 hover:bg-gray-200"
          }`}
          disabled={isResetDisabled}
          onClick={resetFilters}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </>
  );
}

export default GameFilters;