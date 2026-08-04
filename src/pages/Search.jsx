import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastError } from "../Utils/ToastMessage.js";
import SearchListItem from "../components/common/SearchListItem.jsx";
import SortDropdown from "../components/common/SortDropdown.jsx";
import { getAllVideos } from "../services/videoApi.js";

function Search() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const sortField = searchParams.get("sortField") || "relevance";
  const sortType = searchParams.get("sortType") || "desc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const sortParams =
          sortField === "relevance"
            ? {} // relevance → omit sortBy/sortType so $search's own ranking wins
            : { sortBy: sortField, sortType };

        const response = await getAllVideos({
          query,
          page,
          limit: 12,
          ...sortParams,
        });

        const data = response.data;
        setVideos(data.docs);
        setTotalPages(data.totalPages);
      } catch (err) {
        ToastError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, sortField, sortType]);

  const goToPage = (newPage) => {
    setSearchParams({ query, page: newPage, sortField, sortType });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-[#0f0f0f]">
        <LoadingOutlined className="text-white text-4xl" />
      </div>
    );
  }
  const handleSortChange = (field, type) => {
    setSearchParams((prev) => {
      prev.set("sortField", field);
      prev.set("sortType", type);
      return prev;
    });
  };
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-base md:text-lg">
          Search results for{" "}
          <span className="text-white font-medium">"{query}"</span>
        </p>
        <SortDropdown
          sortField={sortField}
          sortType={sortType}
          onChange={handleSortChange}
          options={[
            { field: "relevance", label: "Relevance" },
            { field: "createdAt", label: "Date" },
            { field: "views", label: "Views" },
          ]}
        />
      </div>

      {videos.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">No videos found.</p>
      ) : (
        <div className="flex flex-col gap-2 max-w-5xl">
          {videos.map((video) => (
            <SearchListItem key={video._id} video={video} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className="px-4 py-2 rounded bg-[#212121] hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
          <span className="text-gray-400 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
            className="px-4 py-2 rounded bg-[#212121] hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
