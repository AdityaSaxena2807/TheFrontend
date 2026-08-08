import React, { useEffect, useState } from "react";
import { getAllVideos } from "../services/videoApi";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../Utils/ToastMessage.js";
import VideoListItem from "../Components/video/VideoListItem.jsx";

function Home() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await getAllVideos();
				setVideos(response.data.docs);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch videos");
				ToastError(err?.response?.data?.message || "Failed to fetch videos");
			} finally {
				setLoading(false);
			}
		};
		fetchVideos();
	}, []);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen text-text-secondary bg-bg">
				<LoadingOutlined />
			</div>
		);

	if (error)
		return (
			<div className="flex justify-center items-center h-screen text-crimson bg-bg">
				{error}
			</div>
		);

	return (
		<div className=" min-h-screen">
			<div className="container mx-auto px-4 py-6">
				{/* <h1 className="text-3xl font-bold mb-6 text-white">Recommended Videos</h1> */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{videos.map((video) => (
						<VideoListItem key={video._id} video={video} variant="card" />
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
