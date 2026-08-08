import React, { useState } from "react";
import WatchHistory from "../Components/library/WatchHistory.jsx";
import LikedVideos from "../Components/library/LikedVideos.jsx";
import Playlists from "../Components/library/Playlists.jsx";
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
    <div className="max-w-6xl mx-auto px-4 py-6 text-text-primary">
      <div className="flex gap-2 border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-hover border-b-2 ${
              activeTab === tab.key
                ? "border-terracotta text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
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
