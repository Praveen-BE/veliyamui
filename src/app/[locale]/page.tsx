import CTAButton, { CTAdarkRoastButton } from "@/ui/CTAButton";
import { getTranslations } from "next-intl/server";
import heroSectionImage from "../../../public/blogsherosectionimage.jpg";
import Image from "next/image";
import HomeCardCarousel from "@/components/HomeCardCarousel";
import FAQSection from "@/components/FAQSection";
import TestimonialSection from "@/components/TestimonialSection";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div className="text-textPrimary">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
        <h1 className="font-bold text-2xl text-center">"{t("heroSlogan")}"</h1>
        <p className="font-normal text-lg text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp; {t("heroDescription")}
        </p>
        <div className="flex justify-center">
          <CTAdarkRoastButton
            ctaName={t("heroCTAButtonName")}
            ctaLinkName="blogs"
          />
        </div>
        <div className="flex justify-center">
          <Image
            className="w-56 h-56 rounded-tl-[64px] rounded-br-4xl"
            src={heroSectionImage}
            alt="hero section image"
          />
        </div>
      </div>
      {/* post card previws carousal */}
      <HomeCardCarousel />
      {/* FAQ section */}
      <FAQSection />
      {/* experts reviews */}
      <p className="text-xl text-textPrimary font-medium mt-4 pl-6">
        Our Experts Ratings
      </p>
      <TestimonialSection />
      {/* bottom CTA content */}
      <div className="px-4 mb-4">
        <p className="text-xl mb-4 text-justify">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t("bottomCTAcontent")}
        </p>
        <div className="text-center">
          <CTAdarkRoastButton ctaName="Explore" ctaLinkName="blogs" />
        </div>
      </div>
    </div>
  );
}
