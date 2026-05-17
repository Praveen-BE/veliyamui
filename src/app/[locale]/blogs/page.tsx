import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { getPostsAPI } from "@/lib/post/getPostsAPI";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchInput from "@/components/SearchInput"; // We'll create this below
import FilterDropdown from "@/components/FilterDropdown";
import { stringify } from "querystring";

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  const fetchedparams = await searchParams;

  // 1. Extract values. If they come as arrays from Next.js, join them to a string
  const query = (fetchedparams?.q as string) || "";
  const sort = (fetchedparams?.sortOrder as string) === "DESC" ? "DESC" : "ASC";
  const categoryQuery = Array.isArray(fetchedparams?.category)
    ? fetchedparams.category.join(",")
    : (fetchedparams?.category as string) || "";

  const topicQuery = Array.isArray(fetchedparams?.topic)
    ? fetchedparams.topic.join(",")
    : (fetchedparams?.topic as string) || "";

  // 2. Pagination Logic
  const itemsPerPage = 5;
  const currentPage = Number(fetchedparams?.page) || 1;
  const offset = (currentPage - 1) * itemsPerPage;

  // 3. Fetch Data from API
  const blogPostData = await getPostsAPI({
    lang: "en",
    limit: itemsPerPage,
    offset: offset,
    author_id: 0,
    search: query,
    topic: topicQuery, // Now passes "topic1,topic2"
    category: categoryQuery, // Now passes "cat1,cat2"
    sortOrder: sort,
  });
  // console.log(blogPostData);
  // This should ideally come from your API response (count total rows)
  const totalItems = 50;

  return (
    <div className="m-2 lg:max-w-5xl">
      <div className="flex w-full items-center justify-between">
        {/* Search Bar Component (Client Component) */}
        <SearchInput initialValue={query} />
        {/* 
        <div className="flex ml-4 items-center cursor-pointer hover:text-blue-600 transition">
          <p className="mr-1">Filter</p>
          <FunnelIcon className="w-6 h-6" />
        </div> */}
        <FilterDropdown />
      </div>

      <h1 className="mt-6 text-2xl font-bold">Latest Posts</h1>

      <ul className="mt-4 space-y-4">
        {blogPostData.length > 0 ? (
          blogPostData.map((blog: any) => (
            <li key={blog.id}>
              <BlogCard {...blog} />
            </li>
          ))
        ) : (
          <p className="py-10 text-center text-gray-500">
            No posts found matching your criteria.
          </p>
        )}
      </ul>

      <div className="mt-10">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
