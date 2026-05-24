import Image from "next/image";
import React from "react";
import sampleCoverImage from "../../public/blogsimagewithBalloons.jpg";
import { StarIcon } from "@heroicons/react/24/solid";

// ── Types ────────────────────────────────────────────────────────────────────

interface LexicalNode {
  type: string;
  text?: string;
  /** Bitmask: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, etc. */
  format?: number;
  children?: LexicalNode[];
  src?: string;
  altText?: string;
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
  avg_rating: number;
  total_ratings: number;
}

// ── LexicalParser ────────────────────────────────────────────────────────────

// const LexicalParser = ({ rawJson }: { rawJson: string }) => {
//   let paragraphs: LexicalNode[] = [];

//   try {
//     // If it's already an object, don't parse it; otherwise parse the string
//     const data: LexicalRoot =
//       typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
//     paragraphs = data?.root?.children ?? [];
//   } catch (err) {
//     console.error("Failed to parse lexical_json:", err);
//     return <p style={{ color: "red" }}>Error: could not parse content.</p>;
//   }

//   const renderInlineNode = (piece: LexicalNode, j: number): React.ReactNode => {
//     const text = piece.text ?? "";
//     const fmt = piece.format ?? 0;

//     // Lexical uses bitmasks — check bits, not strict equality
//     const isBold = (fmt & 1) !== 0;
//     const isItalic = (fmt & 2) !== 0;
//     const isStrikethrough = (fmt & 4) !== 0;
//     const isUnderline = (fmt & 8) !== 0;

//     let node: React.ReactNode = text;

//     if (isStrikethrough) node = <s key={`s-${j}`}>{node}</s>;
//     if (isUnderline) node = <u key={`u-${j}`}>{node}</u>;
//     if (isItalic) node = <em key={`em-${j}`}>{node}</em>;
//     if (isBold) node = <strong key={`strong-${j}`}>{node}</strong>;

//     return <span key={j}>{node}</span>;
//   };

//   const renderBlock = (para: LexicalNode, i: number): React.ReactNode => {
//     const children = para.children ?? [];

//     switch (para.type) {
//       // ── 👈 Added Case to Match Image Node Type ─────────────────────────────
//       case "image": {
//         if (!para.src) return null;
//         return (
//           <div
//             key={i}
//             className="my-6 flex w-full justify-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               margin: "24px 0",
//             }}
//           >
//             <img
//               src={para.src}
//               alt={para.altText || "Blog image"}
//               className="max-h-[500px] max-w-full rounded-lg object-contain shadow-sm"
//               style={{
//                 maxHeight: "500px",
//                 maxWidth: "100%",
//                 borderRadius: "8px",
//               }}
//             />
//           </div>
//         );
//       }

//       case "heading": {
//         // Lexical heading nodes carry a `tag` field like "h1", "h2", etc.
//         const tag = (para as LexicalNode & { tag?: string }).tag ?? "h2";
//         return React.createElement(
//           tag,
//           { key: i, style: { marginBottom: "16px" } },
//           children.map(renderInlineNode),
//         );
//       }

//       case "quote":
//         return (
//           <blockquote
//             key={i}
//             style={{
//               borderLeft: "4px solid #ccc",
//               paddingLeft: "16px",
//               margin: "20px 0",
//               color: "#555",
//               fontStyle: "italic",
//             }}
//           >
//             {children.map(renderInlineNode)}
//           </blockquote>
//         );

//       case "paragraph":
//       default:
//         return (
//           <p
//             key={i}
//             style={{ marginBottom: "20px", fontSize: "18px", lineHeight: 1.7 }}
//           >
//             {children.map(renderInlineNode)}
//           </p>
//         );
//     }
//   };

//   return <div className="blog-text-wrapper">{paragraphs.map(renderBlock)}</div>;
// };

const LexicalParser = ({ rawJson }: { rawJson: string }) => {
  let paragraphs: LexicalNode[] = [];

  try {
    const data: LexicalRoot =
      typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
    paragraphs = data?.root?.children ?? [];
  } catch (err) {
    console.error("Failed to parse lexical_json:", err);
    return <p style={{ color: "red" }}>Error: could not parse content.</p>;
  }

  const renderInlineNode = (piece: LexicalNode, j: number): React.ReactNode => {
    // ── 👈 1. Catch Nesting: If an image node slipped inside inline processing
    if (piece.type === "image" && piece.src) {
      return (
        <span
          key={j}
          className="my-6 flex w-full justify-center"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "24px 0",
          }}
        >
          <img
            src={piece.src}
            alt={piece.altText || "Blog image"}
            className="max-h-80 max-w-full rounded-lg object-contain shadow-sm"
          />
        </span>
      );
    }

    const text = piece.text ?? "";
    const fmt = piece.format ?? 0;

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

    // ── 👈 2. Catch Top-Level Paragraph wrappers holding images
    const hasImageChild = children.some((child) => child.type === "image");
    if (hasImageChild) {
      return (
        <div key={i} className="image-block-container">
          {children.map(renderInlineNode)}
        </div>
      );
    }

    switch (para.type) {
      case "image": {
        if (!para.src) return null;
        return (
          <div
            key={i}
            className="my-6 flex w-full justify-center"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "24px 0",
            }}
          >
            <img
              src={para.src}
              alt={para.altText || "Blog image"}
              className="max-h-125.5 max-w-full rounded-lg object-contain shadow-sm"
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
        );
      }

      case "heading": {
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
    <main className="mx-0 my-auto p-5">
      <div className="relative">
        {/* Title & Author */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold capitalize">
          {postData.title}
        </h1>
        <p className="text-xl sm:text-2xl">
          By:{" "}
          <span className="text-green-600">
            {postData.author?.name ?? "Unknown Author"}
          </span>
        </p>
        <ul className="flex flex-col md:flex-row md:justify-between text-lg sm:text-xl md:text-2xl">
          <p>Topic: {postData.topic.name}</p>
          <ul className="flex items-center">
            <p>Rating: {`${postData.avg_rating}`}</p>
            <StarIcon fill="orange" className="w-4 h-4" />{" "}
            <p> {`(${postData.total_ratings})`}</p>
          </ul>
        </ul>
        {/* Cover image — only render if a URL is present */}
        {/* {postData.cover_image && (
        <Image
          width="100"
          height="100"
          src={postData.cover_image}
          alt={postData.cover_image_alt_tag ?? postData.title}
          className="w-full rounded-xl block"
        />
      )} */}

        <Image
          width="100"
          height="100"
          src={sampleCoverImage}
          alt={"Sample Cover Image"}
          className="w-full max-h-100 rounded-xl object-cover"
        />
      </div>

      <hr style={{ margin: "24px 0" }} />

      {/* Body content */}
      <LexicalParser rawJson={postData.lexical_json} />
    </main>
  );
};

export default BlogSinglePost;
