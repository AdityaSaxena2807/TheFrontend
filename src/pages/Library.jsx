import React, { useState } from "react";
import WatchHistory from "../components/library/WatchHistory.jsx";
import LikedVideos from "../components/library/LikedVideos.jsx";
import Playlists from "../components/library/Playlists.jsx";
import {
  HistoryOutlined,
  LikeFilled,
  PlaySquareOutlined,
} from "@ant-design/icons";
const TABS = [
  {
    key: "history",
    label: (
      <span className="flex items-center gap-2">
        <HistoryOutlined /> History
      </span>
    ),
    component: WatchHistory,
  },
  {
    key: "liked",
    label: (
      <span className="flex items-center gap-2">
        <LikeFilled /> Liked Videos
      </span>
    ),
    component: LikedVideos,
  },
  {
    key: "playlists",
    label: (
      <span className="flex items-center gap-2">
        <PlaySquareOutlined /> Playlists
      </span>
    ),
    component: Playlists,
  },
];

function Library() {
  const [activeTab, setActiveTab] = useState("history");

  const ActiveComponent = TABS.find((tab) => tab.key === activeTab)?.component;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white">
      <div className="flex gap-2 border-b border-gray-800 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-red-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {ActiveComponent && <ActiveComponent />}
    </div>
  );
}

export default Library;
