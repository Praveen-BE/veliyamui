import React from "react";
import BlogImage from "../../public/blogsimagewithBalloons.jpg";
import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CTAButton from "@/ui/CTAButton";

interface MyBlogsData {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  title: string;
  excerpt: string;
  topic: {
    id: number;
    slug: string;
    name: string;
  };
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

const BlogCard = ({
  id,
  slug,
  published,
  language_code,
  title,
  excerpt,
  topic,
  meta_description,
  meta_keywords,
  cover_image,
  cover_image_alt_tag,
  created_at,
  updated_at,
  author,
  categories,
}: MyBlogsData) => {
  return (
    <div
      key={`${id}`}
      className="flex flex-col p-2 rounded-b-4xl shadow-sm/30 xl:max-w-5xl"
    >
      <h1 className="font-semibold text-2xl pb-3 pt-4 sm:text-3xl line-clamp-2">
        {title}
      </h1>
      <div className="flex gap-2">
        {" "}
        <Image
          src={BlogImage}
          alt="BlogsImage"
          className="w-28 sm:w-36 md:w-44 object-cover rounded-2xl"
        />
        {/* <Image
          src={cover_image}
          alt={cover_image_alt_tag}
          className="w-28 sm:w-36 md:w-44 object-cover rounded-2xl"
        /> */}
        <div className="w-fit flex flex-col gap-0 sm:gap-1">
          <ul className="font-normal text-xs sm:text-sm flex justify-between">
            <li>Jan 20, 2020</li>
            <li>5 min Read</li>
            <li className="flex items-center">
              <p>Rating-5</p>
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-amber-300" />
            </li>
          </ul>
          <p className="text-[16px] sm:text-lg line-clamp-4">{excerpt}</p>
          <ul className="flex gap-6 sm:gap-9 sm:text-lg list-disc marker:text-ctaPrimary pl-4 ">
            {categories.map((item) => (
              <li key={item}>Tech</li>
            ))}
          </ul>
          <p>
            by{" "}
            <span className="text-ctaPrimary sm:text-lg">
              {author.display_name}
            </span>
          </p>
          <Link
            href={`/${language_code}/blogs/${topic.slug}/${slug}/${id}`}
            className="flex items-center h-6 pt-2 gap-1"
          >
            <p className="text-secondary text-sm sm:text-lg font-bold">
              click here{" "}
            </p>{" "}
            <ChevronRightIcon className="w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

export const MyBlogCard = ({
  id,
  slug,
  published,
  language_code,
  title,
  excerpt,
  topic,
  meta_description,
  meta_keywords,
  cover_image,
  cover_image_alt_tag,
  created_at,
  updated_at,
  author,
  categories,
}: MyBlogsData) => {
  console.log("Single Post");
  console.log(id);
  return (
    <div className="relative w-fit h-fit">
      <BlogCard
        id={id}
        slug={slug}
        published={published}
        language_code={language_code}
        title={title}
        excerpt={excerpt}
        topic={topic}
        meta_description={meta_description}
        meta_keywords={meta_keywords}
        cover_image={cover_image}
        cover_image_alt_tag={cover_image_alt_tag}
        created_at={created_at}
        updated_at={updated_at}
        author={author}
        categories={categories}
      />
      <ul className="absolute bg-textPrimary right-2 sm:right-4 top-[50%] -translate-y-[50%] py-4 px-2 rounded-3xl flex flex-col gap-6">
        <CTAButton
          ctaName="Edit"
          ctaLinkName={language_code + "/myblogs/edit/" + id}
        />
        <button className="py-1 px-2 bg-primary rounded-tl-2xl rounded-br-2xl text-textPrimary font-semibold">
          Publish
        </button>
        <button className="py-1 px-2 bg-red-600 rounded-tl-2xl rounded-br-2xl text-background font-semibold">
          Delete
        </button>
      </ul>
    </div>
  );
};
