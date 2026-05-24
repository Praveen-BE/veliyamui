import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { getPostsAPI } from "@/lib/post/getPostsAPI";
import SearchInput from "@/components/SearchInput";
import FilterDropdown from "@/components/FilterDropdown";
import { getTranslations } from "next-intl/server";
import heroSectionImage from "../../../../public/blogsherosectionimage.jpg";

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}
// ✅ generateMetadata
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("BlogPage");
  // const blog = res[0];
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [heroSectionImage],
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        ta: "/ta/blog",
        "x-default": "/blog", // fallback/default
      },
    },
  };
}

const BlogsPage = async ({ searchParams, params }: BlogsPageProps) => {
  const { locale } = await params;
  const fetchedparams = await searchParams;

  // 1. Extract values.
  const query = (fetchedparams?.q as string) || "";
  const sort = (fetchedparams?.sortOrder as string) === "DESC" ? "DESC" : "ASC";

  // FIX: Force TS to recognize this string only as 'date' or 'rating'
  const rawSortBy = fetchedparams?.sortBy as string;
  const sortBy =
    rawSortBy === "toprated" || rawSortBy === "lowrated" || rawSortBy === "date"
      ? rawSortBy
      : "date";

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

  // 3. Fetch Data from API (Passing sortBy)
  const blogPostData = await getPostsAPI({
    lang: locale,
    limit: itemsPerPage,
    offset: offset,
    author_id: 0,
    search: query,
    topic: topicQuery,
    category: categoryQuery,
    sortOrder: sortBy === "toprated" ? "DESC" : sort, // Force DESC for rating unless specified
    sortBy: sortBy,
  });

  const totalItems = blogPostData?.total || 0;

  // 4. Generate Dynamic Heading Title including Top Rated status
  const getHeadingText = () => {
    const parts: string[] = [];

    // Prefix with Top Rated context if selected
    if (sortBy === "toprated") {
      parts.push("Top Rated");
    }
    if (sortBy === "lowrated") {
      parts.push("Low Rated");
    } else {
      parts.push("Latest");
    }

    if (query) {
      parts.push(`results for "${query}"`);
    } else {
      parts.push("Posts");
    }

    if (categoryQuery) {
      parts.push(`in ${categoryQuery.replace(/,/g, ", ")}`);
    }
    if (topicQuery) {
      parts.push(`under ${topicQuery.replace(/,/g, ", ")}`);
    }

    return `${parts.join(" ")} (${totalItems})`;
  };

  return (
    <div className="m-2 flex-1 lg:max-w-5xl">
      <div className="flex w-full items-center justify-between">
        <SearchInput initialValue={query} />
        <FilterDropdown />
      </div>

      <h1 className="mt-6 text-2xl font-bold capitalize">{getHeadingText()}</h1>

      <ul className="mt-4 space-y-4">
        {blogPostData?.posts?.length > 0 ? (
          blogPostData?.posts.map((blog: any) => (
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
