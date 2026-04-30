"use client";
import React, { useState } from "react";
import ImageUpload from "../../../../components/CoverImageUpload";
import { CatagoriesListData } from "@/utils/constant";
import LexicalEditor from "@/components/LexicalEditor";
interface Category {
  id: number; // Changed from string to number
  name: string;
  slug: string;
  description: string;
  created_at: string;
}
const EditPage = () => {
  // Inside your component
  const [postCategories, setPostCategories] = useState<number[]>([]);

  const toggleOption = (option: Category): void => {
    setPostCategories((prev) =>
      prev.includes(option.id)
        ? prev.filter((id) => id !== option.id)
        : [...prev, option.id],
    );
  };
  return (
    <div className="flex flex-col py-2 px-4">
      <label>Title :</label>
      <input
        type="text"
        placeholder="Enter Your Title here"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
      />
      <label>Cover Image :</label>
      <ImageUpload />
      <label>Blog Content :</label>
      <LexicalEditor />
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
            <li
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
            </li>
          ))}
        </ul>
      </div>
      <label>Excerpt :</label>
      <textarea placeholder="Excerpt" className="bg-primary" />
      <label>Meta Description :</label>
      <textarea placeholder="Meta Description" className="bg-primary" />
      <label>Meta Keyword :</label>
      <textarea placeholder="Meta Keyword" className="bg-primary" />
    </div>
  );
};

export default EditPage;
