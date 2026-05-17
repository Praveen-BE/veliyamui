"use client";
import SideBarNavButton from "@/ui/SideBarNavButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const SideMenuToggle = () => {
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
        <div className="absolute flex flex-col bg-ctaSecondary p-4 gap-1 w-52 right-0 top-16">
          <SideBarNavButton navName="Home" navLinkName="" />
          <SideBarNavButton navName="Blogs" navLinkName="blogs" />
          <SideBarNavButton navName="My Blogs" navLinkName="myblogs" />
          <SideBarNavButton navName="Profile" navLinkName="profile" />
          <SideBarNavButton navName="Contact" navLinkName="contact" />
          <SideBarNavButton navName="About Us" navLinkName="about" />
        </div>
      )}
    </>
  );
};

export default SideMenuToggle;
