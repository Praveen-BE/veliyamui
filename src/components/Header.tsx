import CTAButton from "@/ui/CTAButton";
import Language from "@/ui/Language";
import NavButton from "@/ui/NavButton";
import Image from "next/image";
import VeliyamEnglish from "../../public/Veliyam-English-Logo.svg";
import NotInterestSetProfile from "../../public/dont inteterst to set profile1.svg";
import { Bars3Icon } from "@heroicons/react/24/solid";
const Header = () => {
  return (
    <div className="w-full h-16 px-2 bg-primary flex justify-between items-center">
      <Image
        className="w-20 h-12"
        src={VeliyamEnglish}
        alt="Veliyam English Logo"
      />
      <div className="hidden md:block">
        <NavButton navName="Home" navLinkName="home" />
        <NavButton navName="Blogs" navLinkName="blogs" />
        <NavButton navName="My Blogs" navLinkName="myblogs" />
      </div>
      {/* <Language /> */}
      <div className="flex items-center gap-3">
        <CTAButton ctaName="Create" ctaLinkName="create" />
        <Image
          className="w-9 h-9"
          src={NotInterestSetProfile}
          alt="Not Interest Set Profile"
        />
        <Bars3Icon className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Header;
