import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getSubscribedChannels } from "../services/subscriptionApi";
import { getAllVideos } from "../services/videoApi";
import VideoListItem from "../Components/video/VideoListItem";
import EmptyState from "../Components/common/EmptyState";

function Subscriptions() {
	const { user } = useAuthStore();
	const [channels, setChannels] = useState([]);
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (!user?._id) return;
			setLoading(true);
			try {
				const channelRes = await getSubscribedChannels(user._id);
				const channelList = channelRes.data?.channels || [];
				setChannels(channelList);

				if (channelList.length > 0) {
					const channelIds = channelList.map((c) => c._id).join(",");
					const videoRes = await getAllVideos({ channelIds });
					setVideos(videoRes.data?.docs || []);
				} else {
					setVideos([]);
				}
			} catch (error) {
				console.error(
					"Fetch subscriptions failed:",
					error?.response?.data || error,
				);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [user?._id]);

	if (loading)
		return (
			<div className="p-6 text-sm text-text-secondary">
				Loading subscriptions...
			</div>
		);

	if (channels.length === 0) {
		return (
			<EmptyState
				title="No subscriptions yet"
				subtitle="Videos from channels you subscribe to will show up here"
			/>
		);
	}

	return (
		<div className="px-4 sm:px-6 py-6">
			{/* Subscribed channels strip */}
			<div className="mb-6">
				<h2 className="text-text-primary font-semibold text-sm mb-3">
					Subscribed Channels
				</h2>
				<div className="flex gap-4 overflow-x-auto pb-2">
					{channels.map((channel) => (
						<Link
							key={channel._id}
							to={`/channel/${channel.username}`}
							className="flex flex-col items-center gap-1 shrink-0 w-16"
						>
							<img
								src={
									typeof channel.avatar === "string"
										? channel.avatar
										: channel.avatar?.url
								}
								alt={channel.username}
								className="w-12 h-12 rounded-full object-cover"
							/>
							<span className="text-xs text-text-secondary truncate w-full text-center">
								{channel.username}
							</span>
						</Link>
					))}
				</div>
			</div>

			{/* Latest videos grid */}
			<div>
				<h2 className="text-text-primary font-semibold text-sm mb-3">
					Latest Videos
				</h2>
				{videos.length === 0 ? (
					<p className="text-text-disabled text-sm">
						No videos from your subscriptions yet.
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{videos.map((video) => (
							<VideoListItem key={video._id} video={video} variant="card" />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Subscriptions;
