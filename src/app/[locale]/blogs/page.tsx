import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { getPostsAPI } from "@/lib/post/getPostsAPI";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  const fetchedparams = await searchParams;
  const currentPage = Number(fetchedparams?.page);
  const blogPostData = await getPostsAPI({
    lang: "en",
    limit: 5,
    offset: 0,
    author_id: 0,
  });
  console.log(blogPostData);
  const itemsPerPage = 5;
  const totalItems = 50;

  // Example: fetch data for current page
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = Array.from(
    { length: totalItems },
    (_, i) => `Item ${i + 1}`,
  ).slice(start, end);
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
        <div className="flex ml-4 items-center">
          <p>Filter</p>
          <FunnelIcon className="w-6 h-6" />
        </div>
      </div>
      <h1 className="mt-2">Latest Post</h1>
      <div></div>
      <ul>
        {blogPostData.map((blog: any) => (
          <li key={blog.id}>
            <BlogCard
              id={blog.id}
              slug={blog.slug}
              published={blog.published}
              language_code={blog.language_code}
              title={blog.title}
              excerpt={blog.excerpt}
              topic={blog.topic}
              meta_description={blog.meta_description}
              meta_keywords={blog.meta_keywords}
              cover_image={blog.cover_image}
              cover_image_alt_tag={blog.cover_image_alt_tag}
              created_at={blog.created_at}
              updated_at={blog.updated_at}
              author={blog.author}
              categories={blog.categories}
            />
          </li>
        ))}
      </ul>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default BlogsPage;
