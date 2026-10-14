function SearchBar({ searchTerm, onSearchChange, onResetFilters }) {

    return (
        <>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />

            <button onClick={onResetFilters}>
                Reset Filters
            </button>
        </>
    );
}

export default SearchBar;