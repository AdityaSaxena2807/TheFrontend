import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CommentItem from "./CommentItem.jsx";
import CommentInput from "./CommentInput.jsx";

function CommentList({
  comments,
  loading,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) {
  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold mb-4">
        {comments.length} Comments
      </h2>

      <CommentInput onSubmit={onAddComment} />

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <LoadingOutlined className="text-white text-2xl" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
