import Link from "next/link";
import React from "react";

interface navButtonProps {
  navName: string;
  navLinkName: string;
}

const NavButton = ({ navName, navLinkName }: navButtonProps) => {
  return <Link href={"/" + navLinkName}>{navName}</Link>;
};

export default NavButton;
