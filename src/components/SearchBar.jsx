import { Search } from "lucide-react";

function SearchBar({
    searchTerm, 
    onSearchChange, 
    darkMode 
}) {

return (
    <div className="relative">

        {/* Search icon */}
        <Search
            size={20}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
            }`}
        />

        {/* Search input */}
        <input
            className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                    ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
            }`}
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
        />
    </div>
);
}

export default SearchBar;