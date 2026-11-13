function GameHeader({
  darkMode, 
  onToggleDarkMode 
}) {

return (
  <>
    {/* Page title and dark mode toggle */}
    <div className="flex items-center justify-between">
      <h1
        className={`text-4xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Game Catalog
      </h1>

      {/* Dark mode toggle */}
      <div className="flex items-center gap-2">
        <button
          className={`relative h-8 w-13 rounded-full transition-colors ${
            darkMode ? "bg-blue-400" : "bg-gray-400"
          }`}
          onClick={onToggleDarkMode}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white transition-transform ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        <span
          className={`text-base font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Dark Mode
        </span>
      </div>
    </div>

    {/* Page subtitle */}
    <p
      className={`mt-4 mb-8 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      Explore games and find your next favorite.
    </p>
  </>
);
}

export default GameHeader;