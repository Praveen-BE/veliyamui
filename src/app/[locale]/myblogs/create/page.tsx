"use client";
import { usePathname, useRouter } from "@/navigation";
import "dotenv/config";

import { useParams } from "next/navigation";
import { useRef } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Define the shape of your API response for better type safety
interface BlogResponse {
  id: string;
  title: string;
}

const CreatePage = () => {
  const { locale } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = locale as string;

  const createNewBlog = async () => {
    const titleValue = titleRef?.current?.value;
    if (!titleValue) {
      alert("Please enter a title");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: titleValue,
          language_code: currentLocale,
        }),
      });

      if (response.ok) {
        // Cast the JSON response to our interface
        const data: BlogResponse = await response.json();
        console.log(data);
        // Redirect to the dynamic edit route
        router.push(`/myblogs/edit/${data.id}`);
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to create blog:",
          errorData.message || "Unknown error",
        );
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex flex-col py-2 px-4">
      <label>Title :</label>
      <input
        ref={titleRef}
        type="text"
        placeholder="Enter Your Title here"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
      />

      <label>Post for Which Language :</label>
      <div>
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
      <button
        onClick={createNewBlog}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Create and Edit
      </button>
    </div>
  );
};

export default CreatePage;
