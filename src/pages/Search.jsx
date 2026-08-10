import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastError } from "../utils/ToastMessage.js";
import SearchListItem from "../components/common/SearchListItem.jsx";
import SortDropdown from "../components/common/SortDropdown.jsx";
import { getAllVideos } from "../services/videoApi.js";
import Button from "../components/common/Button.jsx";

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
      <div className="flex items-center justify-center h-[60vh] bg-bg">
        <LoadingOutlined className="text-text-primary text-4xl" />
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
    <div className="bg-bg min-h-screen text-text-primary px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-text-secondary text-base md:text-lg">
          Search results for{" "}
          <span className="text-text-primary font-medium">"{query}"</span>
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
        <p className="text-text-disabled mt-10 text-center">No videos found.</p>
      ) : (
        <div className="flex flex-col gap-2 max-w-5xl">
          {videos.map((video) => (
            <SearchListItem key={video._id} video={video} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            variant="secondary"
            className="px-4 py-2 rounded-sm"
          >
            Prev
          </Button>
          <span className="text-text-secondary text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
            variant="secondary"
            className="px-4 py-2 rounded-sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Search;
