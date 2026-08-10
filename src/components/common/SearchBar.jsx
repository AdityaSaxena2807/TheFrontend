import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button.jsx";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-surface-elevated rounded-md px-4 py-2 shadow-sm border border-border focus-within:ring-1 focus-within:ring-terracotta focus-within:border-terracotta transition-all duration-hover"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 bg-transparent text-text-primary placeholder-text-disabled outline-none px-2 py-1"
      />
      <Button
        type="submit"
        variant="ghost"
        className="rounded-md px-2 py-1 text-text-secondary hover:text-text-primary"
        aria-label="Search"
      >
        <SearchOutlined />
      </Button>
    </form>
  );
}

export default SearchBar;
