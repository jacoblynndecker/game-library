function SearchBar({ searchTerm, onSearchChange, onResetFilters, isResetDisabled }) {

    return (
        <>
            <input
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />

            <button 
                className="mt-3 rounded-lg bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isResetDisabled} 
                onClick={onResetFilters}
            >
                Reset Filters
            </button>
        </>
    );
}

export default SearchBar;