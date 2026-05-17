"use client";

import React, { useState, useEffect, useContext, FormEvent } from "react";
import { UserContext } from "@/context/UserContext";
import ReportButton from "@/ui/ReportButton";
import CommentCard from "./CommentCard";

// --- Types ---

export interface Comment {
  id: string | number;
  content: string;
  parent_id: string | number | null;
  user_id?: string | number;
  user_name?: string;
  created_at?: string;
  // Add any other fields returned by your API
}

export interface User {
  id: string | number;
  name: string;
  // Add other user fields
}

interface CommentSectionProps {
  postId: string | number;
}

// --- Component ---

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Assuming UserContext provides { user: User | null }
  const { user } = useContext(UserContext) as { user: User | null };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/comments/${postId}`)
      .then((r) => r.json())
      .then((data: Comment[]) => setComments(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [postId]);

  /**
   * Handles both top-level comments and replies
   */
  async function handleSubmit(
    text: string,
    parentId: string | number | null = null,
  ): Promise<boolean> {
    if (!text.trim()) return false;
    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: text, parent_id: parentId }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const newComment: Comment = await res.json();

      setComments((prev) => [
        ...prev,
        {
          ...newComment,
          user_id: user?.id,
          user_name: user?.name ?? "You",
          parent_id: parentId,
        },
      ]);
      return true;
    } catch (err) {
      alert("Failed to post comment.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId: string | number): Promise<void> {
    if (!confirm("Delete this comment?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  const topLevel = comments.filter((c) => !c.parent_id);

  return (
    <section className="mt-10 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
        {user && (
          <ReportButton targetType="post" targetId={postId.toString()} />
        )}
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading comments…</p>
      ) : topLevel.length === 0 ? (
        <p className="text-sm text-gray-400">No comments yet.</p>
      ) : (
        topLevel.map((c) => (
          <CommentCard
            key={c.id}
            comment={c}
            user={user}
            allComments={comments}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            submitting={submitting}
          />
        ))
      )}

      {user ? (
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSubmit(content).then((success) => {
              if (success) setContent("");
            });
          }}
          className="mt-6"
        >
          <textarea
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            rows={3}
            placeholder="Write a comment…"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="mt-2 bg-blue-700 text-white rounded-xl px-5 py-2 text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </form>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Log in to comment.</p>
      )}
    </section>
  );
}
