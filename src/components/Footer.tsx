import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const t = await getTranslations("Footer");
  return (
    <div className="flex flex-col w-full bg-primary h-20 gap-4 justify-center items-center">
      <div className="flex justify-around w-full lg:max-w-9/12 text-sm font-medium sm:text-lg md:text-xl">
        <Link href="/home">{t("home")}</Link>
        <Link href="/blogs">{t("blogs")}</Link>
        <Link href="/myblogs">{t("myBlogs")}</Link>
        <Link href="/about">{t("aboutUs")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>
      <div className="flex gap-3 text-xs sm:text-sm md:text-lg lg:max-w-9/12 font-medium justify-around">
        <p>Privacy Policy</p>
        <p>Copyright © 2026 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
