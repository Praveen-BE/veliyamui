import TestimonialCard from "@/ui/TestimonialCard";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "SEO Strategy 2026",
    src: "/slide1.jpg",
    alt: "Man looking at SEO charts",
  },
  {
    id: 2,
    title: "Next.js Performance",
    src: "/slide2.jpg",
    alt: "Speedometer showing fast load times",
  },
];

const testmoniyals = [
  {
    id: 1,
    name: "Ananya",
    company: "Creative Minds Studio",
    rating: 3,
    content:
      "Veliyam ’s content is fresh, insightful, and bridges tradition with innovation. It’s my go-to for inspiration.",
  },
  {
    id: 2,
    name: "Rajesh",
    company: "TechVerse Solutions",
    rating: 4,
    content:
      "The blogs are not just informative but deeply engaging. Veliyam makes complex ideas accessible.",
  },
];

export default function TestimonialSection() {
  return (
    <section aria-label="Featured Stories" className="carousel-container">
      {/* We use a flex container that allows horizontal scrolling */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {testmoniyals.map((testi, index) => (
          <article key={testi.id} className="min-w-full snap-center p-4">
            <div className="relative h-fit w-full flex justify-center">
              <TestimonialCard
                name={testi.name}
                company={testi.company}
                rating={testi.rating}
                content={testi.content}
                profileURL={""}
                profileAlt="nothing"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
