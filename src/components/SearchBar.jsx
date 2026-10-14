function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
        />
    );
}

export default SearchBar;