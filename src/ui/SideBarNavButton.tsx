import Link from "next/link";
import React from "react";

interface navButtonProps {
  navName: string;
  navLinkName: string;
}

const SideBarNavButton = ({ navName, navLinkName }: navButtonProps) => {
  return (
    <Link href={"/" + navLinkName} className="text-2xl bg-ctaPrimary px-4 py-1">
      {navName}
    </Link>
  );
};

export default SideBarNavButton;
