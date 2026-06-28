import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function CommentItem({ comment }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-200 mt-1">{comment.content}</p>
        <div className="flex items-center gap-1 mt-1">
          {comment.isLiked ? (
            <HeartFilled className="text-red-500 text-sm" />
          ) : (
            <HeartOutlined className="text-gray-400 text-sm" />
          )}
          <span className="text-xs text-gray-400">{comment.likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;