"use client";
import "dotenv/config";
import React, { useEffect, useState } from "react";
import ImageUpload from "../../../../../components/CoverImageUpload";
import { CatagoriesListData } from "@/utils/constant";
import LexicalEditor from "@/components/LexicalEditor";
import { useParams } from "next/navigation";
import { getPostForEdit } from "@/lib/editor/getPostForEdit";
import { usePathname, useRouter } from "@/navigation";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { saveBlogPostLexicalJsonAndContent } from "@/lib/editor/saveLexicalJson&Content";
import { saveSeoContentAndCategories } from "@/lib/editor/saveSeoAndCategories";
import { updatePublishAPI } from "@/lib/editor/updatePublishAPI";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface GalleryImage {
  id: string | number;
  url: string;
  alt_text?: string;
  // Add other properties specific to your gallery images table
}

interface TopicData {
  id: number;
  slug: string;
  name: string;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  available_languages: string[];
  title: string;
  cover_image: string | null;
  cover_image_alt_tag: string;
  lexical_json: Record<string, any> | string; // Use string if it's raw JSON, or Record for parsed
  excerpt: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  categories: number[] | any[]; // Adjust based on your category object structure
  gallery: GalleryImage[];
  topic: TopicData | any | null;
}

interface Category {
  id: number; // Changed from string to number
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

const EditPage = () => {
  const { locale, id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [postCategories, setPostCategories] = useState<number[]>([]);
  const [topicId, setTopicId] = useState<number>(1);
  const [imgAlt, setImgAlt] = useState<string>("");
  const [editorText, setEditorText] = useState("");
  const [editorState, setEditorState] = useState<
    SerializedEditorState<SerializedLexicalNode> | undefined
  >();
  const [postData, setPostData] = useState<BlogPost>({
    id: "",
    slug: "",
    published: false,
    language_code: "",
    available_languages: [],
    title: "",
    cover_image: "",
    cover_image_alt_tag: imgAlt,
    lexical_json: "", // Use string if it's raw JSON, or Record for parsed
    excerpt: "",
    meta_description: "",
    meta_keywords: "",
    categories: postCategories, // Adjust based on your category object structure
    gallery: [],
    topic: {
      id: 1,
      slug: "",
      name: "",
    },
  });
  // Inside your component

  useEffect(() => {
    const initailizeEditPageDate = async () => {
      try {
        const data = await getPostForEdit({
          id: id as string,
          lang: locale as string,
        });
        if (data) {
          setPostData({
            id: data.id,
            slug: data.slug,
            published: data.published,
            language_code: data.language_code,
            available_languages: data.available_languages,
            title: data.title,
            cover_image: data.cover_image,
            cover_image_alt_tag: data?.cover_image_alt_tag
              ? data.cover_image_alt_tag
              : "",
            lexical_json: data.lexical_json, // Use string if it's raw JSON, or Record for parsed
            excerpt: data.excerpt,
            meta_description: data.meta_description,
            meta_keywords: data.meta_keywords,
            categories: data.categories, // Adjust based on your category object structure
            gallery: data.gallery,
            topic: data.topic,
          });
          const parsedState =
            typeof data.lexical_json === "string"
              ? JSON.parse(data.lexical_json)
              : data.lexical_json;

          setEditorState(parsedState);
          setPostCategories(data.categories);
          setTopicId(Number(data.topic.id));
          setImgAlt(
            postData?.cover_image_alt_tag ? postData.cover_image_alt_tag : "",
          );
        }
      } catch (err) {
        console.error("Failed to fetch initial Post data", err);
      }
    };
    initailizeEditPageDate();
  }, []);

  const toggleOption = (option: Category): void => {
    setPostCategories((prev) =>
      prev.includes(option.id)
        ? prev.filter((id) => id !== option.id)
        : [...prev, option.id],
    );
  };

  const currentLocale = locale as string;

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const saveLexicalJsonAndContent = async () => {
    const res = await saveBlogPostLexicalJsonAndContent({
      id: postData.id,
      title: postData.title,
      slug_word: postData.slug,
      lexicalJson: JSON.stringify(editorState),
      content: editorText,
      language_code: currentLocale,
      topic_id: topicId,
      cover_image_alt_tag: postData?.cover_image_alt_tag,
    });
  };

  const saveSeoAndCategories = async () => {
    const res = await saveSeoContentAndCategories({
      id: postData.id,
      excerpt: postData.excerpt,
      meta_description: postData.meta_description,
      meta_keywords: postData.meta_keywords,
      categories: postCategories,
      language_code: currentLocale,
    });
  };

  const updateToggle = async () => {
    const res = await updatePublishAPI({
      id: postData.id,
      publish: !postData.published,
      lang: postData.language_code,
    });
    console.log(res);
  };
  console.log(postData);

  return (
    <div className="flex flex-col py-2 px-4">
      <div>
        <label>Post for Which Language :</label>
        <select
          className="text-sm text-textPrimary border border-textSecondary px-4 py-1 rounded-tl-3xl rounded-br-2xl"
          id="language"
          name="language"
          defaultValue={currentLocale}
          aria-placeholder="Your Language for Profile"
          onChange={(e) => {
            switchLocale(e.target.value);
          }}
        >
          <option value="en" className="">
            English
          </option>
          <option value="ta" className="">
            தமிழ்
          </option>
        </select>
      </div>
      <label>Title :</label>
      <input
        type="text"
        value={postData.title}
        placeholder="Enter Your Title here"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <label>Slug :</label>
      <input
        type="text"
        value={postData.slug}
        placeholder="Enter Your Post Url Slug here"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
        onChange={(e) => setPostData({ ...postData, slug: e.target.value })}
      />
      <div>
        <label>Topic Category :</label>

        <select
          className="text-sm text-textPrimary border border-textSecondary px-4 py-1 rounded-tl-3xl rounded-br-2xl"
          id="Topic-Category"
          name="Topic-Category"
          value={topicId}
          aria-placeholder="Post Topic Category"
          onChange={(e) => {
            setTopicId(Number(e.target.value));
          }}
        >
          <option value="1" className="">
            Technology
          </option>
          <option value="2" className="">
            Inspiration
          </option>
        </select>
      </div>
      <label>Cover Image Text :</label>
      <input
        type="text"
        value={imgAlt}
        placeholder="Short Image Description for SEO"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
        onChange={(e) => setImgAlt(e.target.value)}
      />
      <label>Cover Image :</label>
      <ImageUpload
        post_id={postData.id}
        imgUrl={postData?.cover_image ? postData.cover_image : ""}
        imgAlt={imgAlt}
        languageCode={postData.language_code}
      />
      <label>Blog Content :</label>
      <LexicalEditor
        lexical_content={editorState}
        onChange={(newState, plainText) => {
          setEditorState(newState);
          setEditorText(plainText);
        }}
      />
      <button
        onClick={saveLexicalJsonAndContent}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Save Content
      </button>

      <label>Category :</label>
      <div>
        {/* postCategories Chips */}
        <div className="flex flex-wrap gap-2 mb-2">
          {postCategories.map((id: number) => {
            // 1. Find the category object in your constant list
            const category = CatagoriesListData.find(
              (c: Category) => c.id === id,
            );

            // 2. If for some reason the ID doesn't exist in our list, don't render anything
            if (!category) return null;

            return (
              <span
                key={id}
                className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                {category.name}
                <button
                  type="button" // Prevents accidental form submission
                  className="ml-1 text-blue-500 hover:text-blue-700 font-bold"
                  onClick={() => toggleOption(category)}
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
        {/* Dropdown */}
        <ul className="mt-1 w-full overflow-y-auto rounded-md border bg-white shadow-lg max-h-40">
          {CatagoriesListData.map((option: Category) => (
            <button
              key={option.id}
              className="flex cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
              // Using a callback to pass the option object
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                // Ensure postCatogories is typed as string[] or number[]
                checked={postCategories.includes(option.id)}
                readOnly // Keeps the input controlled by the <li> click
                className="mr-2 cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option.name}</span>
            </button>
          ))}
        </ul>
      </div>
      <label>Excerpt :</label>
      <textarea
        value={postData.excerpt ?? ""}
        placeholder="Excerpt"
        className="bg-primary"
        onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
      />
      <label>Meta Description :</label>
      <textarea
        value={postData.meta_description ?? ""}
        placeholder="Meta Description"
        className="bg-primary"
        onChange={(e) =>
          setPostData({ ...postData, meta_description: e.target.value })
        }
      />
      <label>Meta Keyword :</label>
      <textarea
        value={postData.meta_keywords ?? ""}
        placeholder="Meta Keyword"
        className="bg-primary"
        onChange={(e) =>
          setPostData({ ...postData, meta_keywords: e.target.value })
        }
      />
      <button
        onClick={saveSeoAndCategories}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Save Seo Content
      </button>
      <h1 className="mt-5">Save Contend and Save Seo Content Before Publish</h1>
      <button
        onClick={updateToggle}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        {postData.published ? "Private" : "Publish"}
      </button>
    </div>
  );
};

export default EditPage;

// when modify all languages
// (SELECT json_agg(language_code) FROM post_translations WHERE post_id = p.id) AS available_languages
