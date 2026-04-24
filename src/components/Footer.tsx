import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const t = await getTranslations("Footer");
  return (
    <div className="flex flex-col bg-primary h-20 gap-4 justify-center">
      <div className="flex justify-around text-sm font-medium">
        <Link href="/home">{t("home")}</Link>
        <Link href="/blogs">{t("blogs")}</Link>
        <Link href="/myblogs">{t("myBlogs")}</Link>
        <Link href="/about">{t("aboutUs")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>
      <div className="flex gap-3 text-xs font-medium justify-around">
        <p>Privacy Policy</p>
        <p>Copyright © 2026 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
