import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleSubscription } from "../../services/subscriptionApi.js";
import { useAuthStore } from "../../store/authStore.js";
import Button from "../common/Button.jsx";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function SubscribeButton({ channelId, isSubscribed }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    setSubscribed(isSubscribed);
  }, [isSubscribed]);
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
      <Button onClick={handleSubscribe} variant="primary" className="text-sm">
        {subscribed ? "Subscribed" : "Subscribe"}
      </Button>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate("/login")}
      />
    </>
  );
}

export default SubscribeButton;
