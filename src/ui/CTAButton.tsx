import Link from "next/link";
import React from "react";

interface ctaButtonProps {
  ctaName: string;
  ctaLinkName: string;
}

const CTAButton = ({ ctaName, ctaLinkName }: ctaButtonProps) => {
  return (
    <Link
      href={"/" + ctaLinkName}
      className="px-4 py-0.5 bg-ctaPrimary text-md rounded-tl-3xl rounded-br-2xl"
    >
      {ctaName}
    </Link>
  );
};

export const CTAdarkRoastButton = ({
  ctaName,
  ctaLinkName,
}: ctaButtonProps) => {
  return (
    <Link
      href={"/" + ctaLinkName}
      className="px-6 py-1 text-2xl bg-ctaSecondary text-textSecondary text-md rounded-tl-3xl rounded-br-2xl"
    >
      {ctaName}
    </Link>
  );
};

export const CTAOutlineButton = ({ ctaName, ctaLinkName }: ctaButtonProps) => {
  return (
    <Link
      href={"/" + ctaLinkName}
      className="px-6 py-1 border-2 border-ctaSecondary text-textPrimary text-xl rounded-tl-3xl rounded-br-2xl"
    >
      {ctaName}
    </Link>
  );
};

export default CTAButton;
