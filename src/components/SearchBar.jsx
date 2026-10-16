function SearchBar({ searchTerm, onSearchChange, onResetFilters, isResetDisabled }) {

    return (
        <>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />

            <button disabled={isResetDisabled} onClick={onResetFilters}>
                Reset Filters
            </button>
        </>
    );
}

export default SearchBar;