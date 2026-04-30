"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

// Define the shape of your API response for better type safety
interface BlogResponse {
  id: string;
  title: string;
}

const CreatePage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const createNewBlog = async () => {
    const titleValue = titleRef?.current?.value;
    if (!titleValue) {
      alert("Please enter a title");
      return;
    }

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: titleValue }),
      });

      if (response.ok) {
        // Cast the JSON response to our interface
        const data: BlogResponse = await response.json();

        // Redirect to the dynamic edit route
        router.push(`/edit/${data.id}`);
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
  return (
    <div className="flex flex-col py-2 px-4">
      <label>Title :</label>
      <input
        ref={titleRef}
        type="text"
        placeholder="Enter Your Title here"
        className="appearance-none border-none outline-none border border-textPrimary bg-primary text-2xl"
      />
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
