// import React, { useRef, useEffect } from "react";

// const VideoPlayer = ({ videoUrl }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//     }
//   }, [videoUrl]);

//   return (
//     <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
//       <video
//         ref={videoRef}
//         className="w-full h-full"
//         controls
//       >
//         <source src={videoUrl} />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;
// videoPlayer.jsx
'use client';

import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';

const Player = createPlayer({ features: videoFeatures });

export function VideoPlayer({ videoUrl, thumbnail }) {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
      <Player.Provider>
        <VideoSkin
          poster={thumbnail}
          className="w-full h-full"
        >
          <Video
            src={videoUrl}
            playsInline
            className="w-full h-full object-cover"
          />
        </VideoSkin>
      </Player.Provider>
    </div>
  );
}

export default VideoPlayer;