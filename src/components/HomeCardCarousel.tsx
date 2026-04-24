import { getTranslations } from "next-intl/server";
import React from "react";
import HomeCarousalCard from "./HomeCarousalCard";
import CarouselContainer from "./CarouselContainer";

const object = {
  blog1: {
    Title: "The Future of Storytelling in AI",
    Excerpt:
      "How artificial intelligence is reshaping narratives, from cinema to blogs, and why modular storytelling is the next frontier.",
    Author: "Praveen",
  },
  blog2: {
    Title: "Tamil Wisdom in Modern Branding",
    Excerpt:
      "Discover how age-old Tamil proverbs inspire brand identity and resonate with global audiences.",
    Author: "Veliyam Editorial Team",
  },
};
const HomeCardCarousel = async () => {
  const t = await getTranslations("HomePage");
  return (
    <section className="py-8 w-full max-w-4xl mx-auto bg-primary">
      <CarouselContainer>
        <HomeCarousalCard
          title={object.blog1.Title}
          excerpt={object.blog1.Excerpt}
          author={object.blog1.Author}
          imageUrl={"imageUrl"}
          imageAlt="image1"
        />
        <HomeCarousalCard
          title={object.blog2.Title}
          excerpt={object.blog2.Excerpt}
          author={object.blog2.Author}
          imageUrl={"imageUrl"}
          imageAlt="image1"
        />
      </CarouselContainer>
    </section>
  );
};

export default HomeCardCarousel;
