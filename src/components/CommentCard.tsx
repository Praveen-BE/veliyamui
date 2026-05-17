"use client";

import ReportButton from "@/ui/ReportButton";
import React, { useState, FormEvent, ChangeEvent } from "react";

// --- Types ---

interface Comment {
  id: string | number;
  content: string;
  parent_id: string | number | null;
  user_id?: string | number;
  user_name?: string;
  created_at?: string;
}

interface User {
  id: string | number;
  name: string;
}

interface CommentCardProps {
  comment: Comment;
  user: User | null;
  allComments: Comment[];
  handleSubmit: (
    text: string,
    parentId: string | number | null,
  ) => Promise<boolean>;
  handleDelete: (commentId: string | number) => Promise<void>;
  submitting: boolean;
  isReply?: boolean;
}

// --- Component ---

export default function CommentCard({
  comment,
  user,
  allComments,
  handleSubmit,
  handleDelete,
  submitting,
  isReply = false,
}: CommentCardProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [localReplyContent, setLocalReplyContent] = useState<string>("");

  const isOwn = user?.id === comment.user_id;

  // Filter replies for this specific comment
  const nestedReplies = allComments.filter((c) => c.parent_id === comment.id);

  const onReplySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pass the content and the parentId up to the main submit handler
    const success = await handleSubmit(localReplyContent, comment.id);
    if (success) {
      setLocalReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div
      className={`${isReply ? "ml-8 mt-2" : "mt-4"} border border-gray-200 rounded-xl p-4 bg-white`}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="font-semibold text-sm text-gray-800">
            {comment.user_name || "Anonymous"}
          </span>
          <span className="text-xs text-gray-400 ml-2">
            {comment?.created_at
              ? new Date(comment?.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user && !isOwn && (
            <ReportButton targetType="comment" targetId={comment.id} />
          )}
          {isOwn && (
            <button
              onClick={() => handleDelete(comment.id)}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
        {comment.content}
      </p>

      {user && (
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-xs text-blue-500 hover:text-blue-700 mt-2 font-medium"
        >
          {isReplying ? "Cancel reply" : "Reply"}
        </button>
      )}

      {isReplying && (
        <form onSubmit={onReplySubmit} className="mt-3 flex gap-2">
          <textarea
            autoFocus
            value={localReplyContent}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setLocalReplyContent(e.target.value)
            }
            rows={2}
            placeholder={`Replying to ${comment.user_name || "user"}…`}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={submitting || !localReplyContent.trim()}
            className="self-end bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity"
          >
            {submitting ? "…" : "Post"}
          </button>
        </form>
      )}

      {/* Recursive Rendering */}
      {nestedReplies.length > 0 && (
        <div className="mt-2">
          {nestedReplies.map((r) => (
            <CommentCard
              key={r.id}
              comment={r}
              user={user}
              allComments={allComments}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              submitting={submitting}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}
