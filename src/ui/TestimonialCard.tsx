import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import imageforProfile from "../../public/dont inteterst to set profile1.svg";

interface TestimonialProps {
  name: string;
  company: string;
  rating: number;
  content: string;
  profileURL: string;
  profileAlt: string;
}

const TestimonialCard = ({
  name,
  company,
  rating,
  content,
  profileURL,
  profileAlt,
}: TestimonialProps) => {
  return (
    <div className="bg-primary rounded-tl-4xl rounded-br-4xl p-4">
      <div>
        <div className="flex gap-3 items-center">
          <Image
            className="w-14 h-14 rounded-full border border-textPrimary"
            src={imageforProfile}
            alt={profileAlt}
          />
          <div>
            <ul className="flex">
              <StarIcon
                className={"w-6 h-6 " + (1 < rating ? "fill-amber-300" : "")}
              />
              <StarIcon
                className={"w-6 h-6 " + (2 < rating ? "fill-amber-300" : "")}
              />
              <StarIcon
                className={"w-6 h-6 " + (3 < rating ? "fill-amber-300" : "")}
              />
              <StarIcon
                className={"w-6 h-6 " + (4 < rating ? "fill-amber-300" : "")}
              />
              <StarIcon
                className={"w-6 h-6 " + (5 < rating ? "fill-amber-300" : "")}
              />
            </ul>
            <p className="text-xl font-">{name}</p>
            <p className="text-xl font-semibold">at {company}</p>
          </div>
        </div>
        <p className="text-xl font-normal text-justify">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{content}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
