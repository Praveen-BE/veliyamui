"use client";

import React, { useEffect, useState, use } from "react";
import { MyBlogCard } from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { getMyBlogsData } from "@/lib/myblogs/getMyBlogsAPI";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface MyBlogsData {
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
    display_name: string;
    email: string;
  };
  categories: number[] | any[];
}

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Remove 'async' from the component definition
const MyBlogsPage = ({ searchParams }: BlogsPageProps) => {
  const [posts, setPosts] = useState<MyBlogsData[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Unwrap searchParams using React.use()
  const fetchedparams = use(searchParams);
  const currentPage = Number(fetchedparams?.page) || 1;

  const itemsPerPage = 5;
  const totalItems = 50; // Ideally, this should come from your API

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await getMyBlogsData({ lang: "en" });
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="m-2 lg:max-w-5xl">
      <div className="flex w-full">
        <div className="flex pl-4 pr-2 py-0.5 border overflow-hidden rounded-2xl">
          <input
            type="text"
            className="appearance-none border-none outline-none bg-transparent w-36 sm:w-sm xl:w-lg"
            placeholder="Search here"
          />
          <MagnifyingGlassIcon className="w-6 h-6" />
        </div>
        <div className="flex ml-4 items-center cursor-pointer">
          <p>Filter</p>
          <FunnelIcon className="w-6 h-6 ml-1" />
        </div>
      </div>

      <h1 className="mt-4 text-2xl font-bold">My Blogs</h1>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p>Loading blogs...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            // Pass the post data to your Card component
            <div key={post.id}>
              <MyBlogCard
                key={post.id}
                id={post.id}
                slug={post.slug}
                published={post.published}
                language_code={post.language_code}
                title={post.title}
                excerpt={post.excerpt}
                meta_description={post.meta_description}
                meta_keywords={post.meta_keywords}
                cover_image={post.cover_image}
                cover_image_alt_tag={post.cover_image_alt_tag}
                created_at={post.created_at}
                updated_at={post.updated_at}
                author={post.author}
                categories={post.categories}
              />
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default MyBlogsPage;
