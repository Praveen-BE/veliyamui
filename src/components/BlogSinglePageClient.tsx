"use client";
import LazyLoad from "@/components/LazyLoad";
import dynamic from "next/dynamic";
import React from "react";
const RatingSection = dynamic(() => import("@/components/RatingComponent"), {
  ssr: false,
  loading: () => <p>Loading ratings...</p>,
});

const CommentSection = dynamic(() => import("@/components/CommentSection"), {
  ssr: false,
  loading: () => <p>Loading comments...</p>,
});

const BlogSinglePageClient = ({
  id,
  avg_rating,
  total_ratings,
}: {
  id: number | string;
  avg_rating: number;
  total_ratings: number;
}) => {
  return (
    <div>
      {/* Volatile client components only load & fetch data when scrolled into view */}
      <LazyLoad fallback={<div className="h-20 animate-pulse bg-gray-100" />}>
        <RatingSection
          postId={id}
          avg_rating={avg_rating}
          total_ratings={total_ratings}
        />
      </LazyLoad>

      <LazyLoad fallback={<div className="h-40 animate-pulse bg-gray-100" />}>
        <CommentSection postId={id} />
      </LazyLoad>
    </div>
  );
};

export default BlogSinglePageClient;
