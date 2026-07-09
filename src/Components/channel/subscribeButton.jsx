import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { toggleSubscription } from "../../services/subscritionApi.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function SubscribeButton({ channelId, isSubscribed }) {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [subscribed, setSubscribed] = useState(isSubscribed);
	const [showLoginModal, setShowLoginModal] = useState(false);

	const handleSubscribe = async () => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		try {
			await toggleSubscription(channelId);
			setSubscribed((prev) => !prev);
		} catch (err) {
			console.error("Failed to toggle subscription");
		}
	};

	return (
		<>
			<button
				onClick={handleSubscribe}
				className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
					${
						subscribed
							? "bg-[#272727] text-white hover:bg-[#3f3f3f]"
							: "bg-white text-black hover:bg-gray-200"
					}`}
			>
				{subscribed ? "Subscribed" : "Subscribe"}
			</button>

			<LoginPromptModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
				onLogin={() => navigate("/login")}
			/>
		</>
	);
}

export default SubscribeButton;
