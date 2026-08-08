import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubscribeButton from "../components/channel/SubscribeButton.jsx";
import SortDropdown from "../components/common/SortDropdown.jsx";
import VideoListItem from "../components/video/VideoListItem.jsx";
import { getUserChannelProfile } from "../services/userApi.js";
import { getAllVideos } from "../services/videoApi.js";
import { ToastError } from "../Utils/ToastMessage.js";
import { getUserTweets } from "../services/tweetApi.js";
import TweetCard from "../components/tweet/TweetCard.jsx";
function Channel() {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [activeTab, setActiveTab] = useState("videos");
  const [tweets, setTweets] = useState([]);
  const [tweetsLoading, setTweetsLoading] = useState(false);
  const [tweetSortField, setTweetSortField] = useState("createdAt");
  const [tweetSortType, setTweetSortType] = useState("desc");
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        const response = await getUserChannelProfile(username);
        setChannel(response.data);
      } catch (err) {
        ToastError("Failed to load channel");
      } finally {
        setLoading(false);
      }
    };
    fetchChannel();
  }, [username]);

  useEffect(() => {
    if (!channel?._id || activeTab !== "tweets") return;

    const fetchTweets = async () => {
      try {
        setTweetsLoading(true);
        const response = await getUserTweets(channel._id, {
          sortBy: tweetSortField,
          sortType: tweetSortType,
        });
        setTweets(response.data);
      } catch (err) {
        ToastError("Failed to load tweets");
      } finally {
        setTweetsLoading(false);
      }
    };

    fetchTweets();
  }, [activeTab, channel?._id, tweetSortField, tweetSortType]);

  useEffect(() => {
    if (!channel?._id) return;
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos({
          userId: channel._id,
          sortBy: sortField,
          sortType,
        });
        setVideos(response.data.docs);
      } catch (err) {
        ToastError("Failed to load videos");
      }
    };
    fetchVideos();
  }, [channel?._id, sortField, sortType]);

  if (loading || !channel)
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <LoadingOutlined className="text-text-primary text-4xl" />
      </div>
    );
  const coverImageUrl =
    typeof channel.coverImage === "string"
      ? channel.coverImage
      : channel.coverImage?.url;

  return (
    <div className="bg-bg min-h-screen text-text-primary">
      <div className="w-full h-48 md:h-60 bg-surface-elevated">
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={
                typeof channel.avatar === "string"
                  ? channel.avatar
                  : channel.avatar?.url
              }
              alt={channel.username}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-heading font-semibold">{channel.fullName}</p>
              <p className="text-sm text-text-secondary">
                @{channel.username} &bull;{" "}
                {new Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(channel.subscribersCount || 0)}{" "}
                subscribers
              </p>
            </div>
          </div>

          <SubscribeButton
            channelId={channel._id}
            isSubscribed={channel.isSubscribed}
          />
        </div>

        <div className="border-t border-border mt-6 mb-4" />
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-8 border-b border-border flex-1">
            <button
              onClick={() => setActiveTab("videos")}
              className={`pb-3 text-sm font-medium transition-colors duration-hover ${
                activeTab === "videos"
                  ? "text-text-primary border-b-2 border-terracotta"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Videos
            </button>

            <button
              onClick={() => setActiveTab("tweets")}
              className={`pb-3 text-sm font-medium transition-colors duration-hover ${
                activeTab === "tweets"
                  ? "text-text-primary border-b-2 border-terracotta"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Tweets
            </button>
          </div>

          {activeTab === "videos" && (
            <SortDropdown
              sortField={sortField}
              sortType={sortType}
              onChange={(field, type) => {
                setSortField(field);
                setSortType(type);
              }}
              options={[
                { field: "createdAt", label: "Date" },
                { field: "views", label: "Views" },
              ]}
            />
          )}

          {activeTab === "tweets" && (
            <SortDropdown
              sortField={tweetSortField}
              sortType={tweetSortType}
              onChange={(field, type) => {
                setTweetSortField(field);
                setTweetSortType(type);
              }}
              options={[{ field: "createdAt", label: "Date" }]}
            />
          )}
        </div>

        {activeTab === "videos" ? (
          videos.length === 0 ? (
            <p className="text-text-disabled text-sm">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div key={video._id}>
                  <VideoListItem video={video} variant="grid" />
                </div>
              ))}
            </div>
          )
        ) : tweetsLoading ? (
          <div className="flex justify-center py-10">
            <LoadingOutlined className="text-3xl text-text-primary" />
          </div>
        ) : tweets.length === 0 ? (
          <p className="text-text-disabled text-sm">No tweets yet.</p>
        ) : (
          <div className="max-w-2xl flex flex-col gap-4">
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweet={tweet}
                onDeleted={(id) =>
                  setTweets((prev) => prev.filter((t) => t._id !== id))
                }
                onUpdated={(updated) =>
                  setTweets((prev) =>
                    prev.map((t) => (t._id === updated._id ? updated : t)),
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;
