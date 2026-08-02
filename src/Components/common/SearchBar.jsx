import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
