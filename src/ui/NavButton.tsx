import Link from "next/link";
import React from "react";

interface navButtonProps {
  navName: string;
  navLinkName: string;
}

const NavButton = ({ navName, navLinkName }: navButtonProps) => {
  return (
    <Link
      href={"/" + navLinkName}
      className="text-xl bg-textSecondary px-4 py-1 rounded-tl-3xl rounded-br-2xl"
    >
      {navName}
    </Link>
  );
};

export default NavButton;
