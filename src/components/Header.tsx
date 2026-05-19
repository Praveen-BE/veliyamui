import CTAButton, { CTAOutlineButton } from "@/ui/CTAButton";
import Language from "@/ui/Language";
import NavButton from "@/ui/NavButton";
import Image from "next/image";
import VeliyamEnglish from "../../public/Veliyam-English-Logo.svg";
import VeliyamTamilLogo from "../../public/Veliyam-Tamil-Logo.svg";

import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "./ThemeToggle";

import NavProfileOrNavAuth from "@/ui/NavProfileOrNavAuth";
import "dotenv/config";
import getProfile from "@/lib/profile/getProfile";
import SideMenuToggle from "./SideMenuToggle";

const Header = async ({ lang }: { lang: string }) => {
  const user = await getProfile({ lang: lang });
  const t = await getTranslations("Header");
  return (
    <div className="w-full h-16 px-2 bg-primary flex justify-between items-center">
      {lang == "ta" ? (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamTamilLogo}
          alt="Veliyam Tamil Logo"
        />
      ) : (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamEnglish}
          alt="Veliyam English Logo"
        />
      )}
      <div className="hidden md:flex gap-4">
        <NavButton navName={t("home")} navLinkName="" />
        <NavButton navName={t("blogs")} navLinkName="blogs" />
        <NavButton navName={t("myBlogs")} navLinkName="myblogs" />
      </div>
      <Language />
      {/* <ThemeToggle /> */}
      <div className="flex items-center gap-3">
        <CTAButton ctaName={t("create")} ctaLinkName="myblogs/create" />
        <NavProfileOrNavAuth initialUser={user} />
        <SideMenuToggle />
      </div>
    </div>
  );
};

export default Header;
