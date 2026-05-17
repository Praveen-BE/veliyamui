"use client";
import { useAuth } from "@/context/UserContext";
import fetchRatingData from "@/lib/post/getUserRatingForPost";
import postUserRatingPostAPI from "@/lib/post/postUserRatingPostAPI";
import React, { useState, useEffect } from "react";

interface RatingSectionProps {
  postId: number | string;
  avg_rating: number;
  total_ratings: number;
}

interface MessageState {
  type: "success" | "error" | "";
  text: string;
}

export default function RatingSection({
  postId,
  avg_rating,
  total_ratings,
}: RatingSectionProps) {
  const [avgRating, setAvgRating] = useState<number>(avg_rating);
  const [totalRatings, setTotalRatings] = useState<number>(total_ratings);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" });
  const { user } = useAuth();
  // 1. Fetch initial post details (average and count)
  useEffect(() => {
    const fetchRate = async () => {
      const data = await fetchRatingData({ postId });
      if (data?.rating) {
        setUserRating(data?.rating);
      }
    };
    if (postId && user) {
      fetchRate();
    }
  }, [user]);

  // 2. Submit rating payload data to Express API
  const handleRatingSubmit = async (selectedRating: number) => {
    if (loading) return;
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = await postUserRatingPostAPI({ postId, selectedRating });
      // Sync UI state dynamically with returned database metrics calculation
      if (data) {
        setAvgRating(data?.avgRating);
        setTotalRatings(data?.totalRatings);
        setUserRating(selectedRating);
        setMessage({ type: "success", text: "Thank you for rating!" });
      }
    } catch (error) {
      const err = error as Error;
      setMessage({
        type: "error",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        padding: "24px",
        margin: "24px 0",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: 600,
          color: "#1e293b",
        }}
      >
        Rate this article
      </h3>

      {/* Metrics Header Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Custom SVG Inline Star Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#fbbf24"
            stroke="#fbbf24"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b" }}>
            {avgRating > 0 ? avgRating : "0.0"}
          </span>
        </div>
        <span style={{ fontSize: "14px", color: "#94a3b8" }}>
          ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
        </span>
      </div>

      {/* Star Interactive Controls */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled =
            hoverRating >= starValue ||
            (!hoverRating && userRating >= starValue);

          return (
            <button
              key={starValue}
              type="button"
              disabled={loading}
              onClick={() => handleRatingSubmit(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.1s ease",
                outline: "none",
              }}
              aria-label={`Rate ${starValue} stars`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={isFilled ? "#fbbf24" : "none"}
                stroke={isFilled ? "#fbbf24" : "#cbd5e1"}
                strokeWidth="2"
                style={{ transition: "color 0.15s, fill 0.15s" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Response Messages */}
      {message.text && (
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            marginTop: "8px",
            color: message.type === "success" ? "#10b981" : "#f43f5e",
          }}
        >
          {message.text}
        </div>
      )}

      {userRating > 0 && !message.text && (
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "8px 0 0 0" }}>
          Your rating:{" "}
          <span style={{ fontWeight: 600, color: "#475569" }}>
            {userRating} Stars
          </span>
        </p>
      )}
    </div>
  );
}
