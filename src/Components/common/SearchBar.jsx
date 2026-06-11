import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-[#121212] rounded-full px-4 py-2 shadow-lg shadow-black/50"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2 py-1 rounded-l-full"
      />
      <button
        type="submit"
        className="bg-[#3636368c] hover:bg-[#706e6e] text-white font-semibold px-4 py-1 rounded-r-full transition"
      >
        <SearchOutlined />
      </button>
    </form>
  );
}

export default SearchBar;