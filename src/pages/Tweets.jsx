import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllTweets } from "../services/tweetApi";
import TweetInput from "../components/tweet/TweetInput";
import TweetCard from "../components/tweet/TweetCard";
import SortDropdown from "../components/common/SortDropdown.jsx";
import { EditOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Button from "../components/common/Button.jsx";

function Tweets() {
  const { user } = useAuthStore();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const fetchTweets = async () => {
    setLoading(true);
    try {
      const res = await getAllTweets({
        page,
        limit: 10,
        sortBy: sortField,
        sortType,
      });
      setTweets(res.data.tweets);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Fetch tweets failed:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [page, sortField, sortType]);

  const handleNewTweet = (newTweet) => {
    setTweets((prev) => [newTweet, ...prev]);
  };

  const handleUpdated = (updatedTweet) => {
    setTweets((prev) =>
      prev.map((t) =>
        t._id === updatedTweet._id ? { ...t, ...updatedTweet } : t,
      ),
    );
  };

  const handleDeleted = (tweetId) => {
    setTweets((prev) => prev.filter((t) => t._id !== tweetId));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <TweetInput onSuccess={handleNewTweet} />
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex justify-end mb-4">
            <SortDropdown
              sortField={sortField}
              sortType={sortType}
              onChange={(field, type) => {
                setSortField(field);
                setSortType(type);
                setPage(1);
              }}
              options={[{ field: "createdAt", label: "Date" }]}
            />
          </div>
        </div>

        {tweets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4">
              <EditOutlined className="text-gray-300 text-2xl" />
            </div>
            <p className="text-white font-medium">No tweets yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Tweets will appear here once posted
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {tweets.map((tweet) => (
                <TweetCard
                  key={tweet._id}
                  tweet={tweet}
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                variant="secondary"
                className="px-3 py-1.5 rounded-md bg-[#2a2a2a] text-white text-sm disabled:opacity-40"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              <Button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                variant="secondary"
                className="px-3 py-1.5 rounded-md bg-[#2a2a2a] text-white text-sm disabled:opacity-40"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tweets;
