import Image from "next/image";
import React from "react";
import sampleCoverImage from "../../public/blogsimagewithBalloons.jpg";

// ── Types ────────────────────────────────────────────────────────────────────

interface LexicalNode {
  type: string;
  text?: string;
  /** Bitmask: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, etc. */
  format?: number;
  children?: LexicalNode[];
}

interface LexicalRoot {
  root: {
    children: LexicalNode[];
  };
}

interface Author {
  display_name: string;
}

interface PostData {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  title: string;
  excerpt: string;
  meta_description: string;
  meta_keywords: string;
  cover_image: string;
  cover_image_alt_tag: string;
  created_at: string;
  updated_at: string;
  author: {
    id: string | number;
    name: string;
    email: string;
  };
  categories: any[];
  lexical_json: any;
  topic: {
    id: number;
    slug: string;
    name: string;
  };
}

// ── LexicalParser ────────────────────────────────────────────────────────────

const LexicalParser = ({ rawJson }: { rawJson: string }) => {
  let paragraphs: LexicalNode[] = [];

  try {
    const data: LexicalRoot = JSON.parse(rawJson);
    paragraphs = data?.root?.children ?? [];
  } catch (err) {
    console.error("Failed to parse lexical_json:", err);
    return <p style={{ color: "red" }}>Error: could not parse content.</p>;
  }

  const renderInlineNode = (piece: LexicalNode, j: number): React.ReactNode => {
    const text = piece.text ?? "";
    const fmt = piece.format ?? 0;

    // Lexical uses bitmasks — check bits, not strict equality
    const isBold = (fmt & 1) !== 0;
    const isItalic = (fmt & 2) !== 0;
    const isStrikethrough = (fmt & 4) !== 0;
    const isUnderline = (fmt & 8) !== 0;

    let node: React.ReactNode = text;

    if (isStrikethrough) node = <s key={`s-${j}`}>{node}</s>;
    if (isUnderline) node = <u key={`u-${j}`}>{node}</u>;
    if (isItalic) node = <em key={`em-${j}`}>{node}</em>;
    if (isBold) node = <strong key={`strong-${j}`}>{node}</strong>;

    return <span key={j}>{node}</span>;
  };

  const renderBlock = (para: LexicalNode, i: number): React.ReactNode => {
    const children = para.children ?? [];

    switch (para.type) {
      case "heading": {
        // Lexical heading nodes carry a `tag` field like "h1", "h2", etc.
        const tag = (para as LexicalNode & { tag?: string }).tag ?? "h2";
        return React.createElement(
          tag,
          { key: i, style: { marginBottom: "16px" } },
          children.map(renderInlineNode),
        );
      }

      case "quote":
        return (
          <blockquote
            key={i}
            style={{
              borderLeft: "4px solid #ccc",
              paddingLeft: "16px",
              margin: "20px 0",
              color: "#555",
              fontStyle: "italic",
            }}
          >
            {children.map(renderInlineNode)}
          </blockquote>
        );

      case "paragraph":
      default:
        return (
          <p
            key={i}
            style={{ marginBottom: "20px", fontSize: "18px", lineHeight: 1.7 }}
          >
            {children.map(renderInlineNode)}
          </p>
        );
    }
  };

  return <div className="blog-text-wrapper">{paragraphs.map(renderBlock)}</div>;
};

// ── BlogSinglePost ────────────────────────────────────────────────────────────

interface BlogSinglePostProps {
  postData: PostData;
}

export const BlogSinglePost = ({ postData }: BlogSinglePostProps) => {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Title & Author */}
      <h1>{postData.title}</h1>
      <p>By: {postData.author?.name ?? "Unknown Author"}</p>
      <p>Topic: {postData.topic.name}</p>

      {/* Cover image — only render if a URL is present */}
      {/* {postData.cover_image && (
        <Image
          width="100"
          height="100"
          src={postData.cover_image}
          alt={postData.cover_image_alt_tag ?? postData.title}
          style={{ width: "100%", borderRadius: "10px", display: "block" }}
        />
      )} */}
      <Image
        width="100"
        height="100"
        src={sampleCoverImage}
        alt={"Sample Cover Image"}
        style={{ width: "100%", borderRadius: "10px", display: "block" }}
      />

      <hr style={{ margin: "24px 0" }} />

      {/* Body content */}
      <LexicalParser rawJson={postData.lexical_json} />
    </main>
  );
};

export default BlogSinglePost;
