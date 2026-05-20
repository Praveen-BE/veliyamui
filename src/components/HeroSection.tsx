import React from "react";
import heroSectionImage from "../../public/blogsherosectionimage.jpg";
import Image from "next/image";
import { CTAdarkRoastButton } from "@/ui/CTAButton";
import { getTranslations } from "next-intl/server";

const HeroSection = async () => {
  const t = await getTranslations("HomePage");
  return (
    <section className="flex flex-col md:flex-row gap-4 px-4 pt-4 pb-4">
      <div className="flex flex-col gap-4 md:w-6/12">
        <h1 className="font-bold text-2xl text-center">"{t("heroSlogan")}"</h1>
        <p className="font-normal text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp; {t("heroDescription")}
        </p>
        <div className="flex justify-center">
          <CTAdarkRoastButton
            ctaName={t("heroCTAButtonName")}
            ctaLinkName="blogs"
          />
        </div>
      </div>
      <div className="flex justify-center md:w-6/12">
        <Image
          className="w-56 h-56 rounded-tl-[64px] rounded-br-4xl"
          src={heroSectionImage}
          alt="hero section image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
