import React from "react";
import BlogImage from "../../public/blogsimagewithBalloons.jpg";
import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import CTAButton from "@/ui/CTAButton";

const BlogCard = () => {
  return (
    <div className="flex flex-col p-2 rounded-b-4xl shadow-sm/30 xl:max-w-5xl">
      <h1 className="font-semibold text-2xl pb-3 pt-4 sm:text-3xl line-clamp-2">
        Title of the Blog Post
      </h1>
      <div className="flex gap-2">
        {" "}
        <Image
          src={BlogImage}
          alt="BlogsImage"
          className="w-28 sm:w-36 md:w-44 object-cover rounded-2xl"
        />
        <div className="w-fit flex flex-col gap-0 sm:gap-1">
          <ul className="font-normal text-xs sm:text-sm flex justify-between">
            <li>Jan 20, 2020</li>
            <li>5 min Read</li>
            <li className="flex items-center">
              <p>Rating-5</p>
              <StarIcon className="w-4 h-4 md:w-5 md:h-5 fill-amber-300" />
            </li>
          </ul>
          <p className="text-[16px] sm:text-lg line-clamp-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="flex gap-6 sm:gap-9 sm:text-lg list-disc marker:text-ctaPrimary pl-4 ">
            <li>Tech</li>
            <li>Node js</li>
          </ul>
          <p>
            by{" "}
            <span className="text-ctaPrimary sm:text-lg">Kristin Watson</span>
          </p>
          <Link href={""} className="flex items-center h-6 pt-2 gap-1">
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

export const MyBlogCard = async () => {
  return (
    <div className="relative w-fit h-fit">
      <BlogCard />
      <ul className="absolute bg-textPrimary right-2 sm:right-4 top-[50%] -translate-y-[50%] py-4 px-2 rounded-3xl flex flex-col gap-6">
        <CTAButton ctaName="Edit" ctaLinkName="myblogs/edit" />
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
