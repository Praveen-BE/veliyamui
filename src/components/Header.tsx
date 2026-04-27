import CTAButton from "@/ui/CTAButton";
import Language from "@/ui/Language";
import NavButton from "@/ui/NavButton";
import Image from "next/image";
import VeliyamEnglish from "../../public/Veliyam-English-Logo.svg";
import VeliyamTamilLogo from "../../public/Veliyam-Tamil-Logo.svg";
import NotInterestSetProfile from "../../public/dont inteterst to set profile1.svg";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { getTranslations } from "next-intl/server";
const Header = async ({ lang }: { lang: string }) => {
  const t = await getTranslations("HomePage");
  return (
    <div className="w-full h-16 px-2 bg-primary flex justify-between items-center">
      {lang == "ta" ? (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamTamilLogo}
          alt="Veliyam English Logo"
        />
      ) : (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamEnglish}
          alt="Veliyam English Logo"
        />
      )}
      <div className="hidden md:flex gap-4">
        <NavButton navName="Home" navLinkName="" />
        <NavButton navName="Blogs" navLinkName="blogs" />
        <NavButton navName="My Blogs" navLinkName="myblogs" />
      </div>
      <Language />
      <div className="flex items-center gap-3">
        <CTAButton ctaName="Create" ctaLinkName="myblogs/create" />
        <Image
          className="w-9 h-9 md:w-12 md:h-12 rounded-full border border-textPrimary"
          src={NotInterestSetProfile}
          alt="Not Interest Set Profile"
        />
        <Bars3Icon className="w-8 h-8 md:w-12 md:h-12" />
      </div>
    </div>
  );
};

export default Header;
