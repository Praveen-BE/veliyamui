import CTAButton, { CTAdarkRoastButton } from "@/ui/CTAButton";
import { getTranslations } from "next-intl/server";

import HomeCardCarousel from "@/components/HomeCardCarousel";
import FAQSection from "@/components/FAQSection";
import TestimonialSection from "@/components/TestimonialSection";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div className="flex w-full justify-center">
      <div className="text-textPrimary lg:w-10/12 xl:w-8/12">
        {/* Hero Section */}
        <HeroSection />
        {/* post card previws carousal */}
        <HomeCardCarousel />
        {/* FAQ section */}
        <FAQSection />
        {/* Testimonials */}
        <p className="text-xl text-center sm:text-2xl text-textPrimary font-bold mt-6 pl-6">
          {t("outexpertrating")}
        </p>
        <TestimonialSection />
        {/* bottom CTA content */}
        <div className="px-4 mb-4">
          <p className="text-xl sm:text-2xl sm:mt-4 mb-4 text-justify">
            {" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t("bottomCTAcontent")}
          </p>
          <div className="text-center mb-8">
            <CTAdarkRoastButton
              ctaName={t("heroCTAButtonName")}
              ctaLinkName="blogs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
