"use client";
import SideBarNavButton from "@/ui/SideBarNavButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useState } from "react";

const SideMenuToggle = () => {
  const t = useTranslations("Footer");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="w-8 h-8 md:w-12 md:h-12" />
        ) : (
          <Bars3Icon className="w-8 h-8 md:w-12 md:h-12" />
        )}
      </button>
      {isOpen && (
        <div className="absolute flex flex-col bg-ctaSecondary p-4 gap-1 w-64 right-0 top-16 z-10">
          <SideBarNavButton navName={t("home")} navLinkName="" />
          <SideBarNavButton navName={t("blogs")} navLinkName="blogs" />
          <SideBarNavButton navName={t("myBlogs")} navLinkName="myblogs" />
          <SideBarNavButton navName={t("profile")} navLinkName="profile" />
          <SideBarNavButton navName={t("contact")} navLinkName="contact" />
          <SideBarNavButton navName={t("aboutUs")} navLinkName="about" />
        </div>
      )}
    </>
  );
};

export default SideMenuToggle;
