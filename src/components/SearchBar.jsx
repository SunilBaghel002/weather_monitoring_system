import { useState, useContext } from "react";
import debounce from "lodash/debounce";
import { DataContext } from "../context/DataContext";

const SearchBar = () => {
  const { searchLocation } = useContext(DataContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = debounce(async (input) => {
    if (input.length > 2) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        input
      )}&format=json&limit=5`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      searchLocation(query);
      setSuggestions([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto center-se padding">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Search city (e.g., Delhi, Paris)..."
        className="w-full pl-12 pr-14 rounded-full search-input text-white placeholder-white/50 focus:outline-none text-lg padding"
      />
      <button
        type="submit"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col gap-1 padding">
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              onClick={() => {
                setQuery(sug.display_name);
                setSuggestions([]);
                searchLocation(sug.display_name);
              }}
              className="p-3 cursor-pointer hover:bg-white/20 text-white transition"
            >
              {sug.display_name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
