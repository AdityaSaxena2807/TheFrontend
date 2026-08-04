import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubscribeButton from "../components/channel/SubscribeButton.jsx";
import SortDropdown from "../components/common/SortDropdown.jsx";
import VideoListItem from "../components/video/VideoListItem.jsx";
import { getUserChannelProfile } from "../services/userApi.js";
import { getAllVideos } from "../services/videoApi.js";
import { ToastError } from "../Utils/ToastMessage.js";
function Channel() {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");

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
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <LoadingOutlined className="text-white text-4xl" />
      </div>
    );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="w-full h-48 md:h-60 bg-[#1a1a1a]">
        {channel.coverImage && (
          <img
            src={channel.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={channel.avatar}
              alt={channel.username}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-semibold">{channel.fullName}</p>
              <p className="text-sm text-gray-400">
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

        <div className="border-t border-gray-700 mt-6 mb-4" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Videos</h2>
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
        </div>

        {videos.length === 0 ? (
          <p className="text-gray-500 text-sm">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="cursor-pointer">
                <VideoListItem video={video} variant="grid" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;
