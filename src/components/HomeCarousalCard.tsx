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
    <div className="w-80 h-44 flex overflow-hidden rounded-tl-4xl rounded-br-3xl bg-background">
      <Image className="w-28 h-44" src={HomeCarousalImage} alt={imageAlt} />
      <div className="pl-2">
        <h1 className="font-semibold text-xl line-clamp-2">{title}</h1>
        <p className="font-normal text-lg line-clamp-3">{excerpt}</p>
        <p className="text-lg text-ctaPrimary font-bold">
          <span className="font-medium text-textPrimary">by</span> {author}
        </p>
      </div>
    </div>
  );
};

export default HomeCarousalCard;
