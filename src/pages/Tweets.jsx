import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllTweets } from "../services/tweetApi";
import TweetInput from "../components/tweet/TweetInput";
import TweetCard from "../components/tweet/TweetCard";

function Tweets() {
  const { user } = useAuthStore();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const res = await getAllTweets();
      setTweets(res.data);
    } catch (error) {
      console.error("Fetch tweets failed:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

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
    return <div className="p-6 text-sm text-gray-400">Loading tweets...</div>;

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-2xl">
        {user && (
          <div className="mb-6">
            <TweetInput onSuccess={handleNewTweet} />
          </div>
        )}
        {tweets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <p className="text-white font-medium">No tweets yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Tweets will appear here once posted
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Tweets;
