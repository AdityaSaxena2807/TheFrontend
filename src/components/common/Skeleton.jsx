import React from "react";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-surface-elevated animate-pulse rounded-md ${className}`}
    />
  );
}

export default Skeleton;
