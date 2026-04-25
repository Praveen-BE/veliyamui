import Image from "next/image";
import React from "react";
import HomeCarousalImage from "../../public/blogsimagewithBalloons.jpg";

interface HomeCarousalCardProps {
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
}

const HomeCarousalCard = ({
  title,
  excerpt,
  author,
  imageUrl,
  imageAlt,
}: HomeCarousalCardProps) => {
  return (
    <div className="w-12/12 max-h-50 sm:max-h-fit flex overflow-hidden rounded-tl-4xl rounded-br-3xl bg-background">
      <Image
        className="w-4/12 sm:w-4/12 object-cover"
        src={HomeCarousalImage}
        alt={imageAlt}
      />
      <div className="w-8/12 sm:w-8/12 pl-2 flex flex-col justify-center sm:gap-6">
        <h1 className="font-semibold text-xl sm:text-2xl line-clamp-2 sm:line-clamp-4">
          {title}
        </h1>
        <p className="font-normal text-lg sm:text-2xl line-clamp-3 sm:line-clamp-6">
          {excerpt}
        </p>
        <p className="text-lg sm:text-2xl text-ctaPrimary font-bold">
          <span className="font-medium text-textPrimary">by</span> {author}
        </p>
      </div>
    </div>
  );
};

export default HomeCarousalCard;
