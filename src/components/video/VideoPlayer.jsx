// videoPlayer.jsx
"use client";
import { createPlayer } from "@videojs/react";
import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";
import "@videojs/react/video/skin.css";

const Player = createPlayer({ features: videoFeatures });

export function VideoPlayer({ videoUrl, thumbnail }) {
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
      <Player.Provider>
        <VideoSkin poster={thumbnail} className="w-full h-full">
          <Video
            src={videoUrl}
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </VideoSkin>
      </Player.Provider>
    </div>
  );
}

export default VideoPlayer;
