import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Footer = async () => {
  const t = await getTranslations("Footer");
  return (
    <div className="flex flex-col w-full bg-primary h-20 gap-4 p-2 justify-center items-center">
      <div className="flex px-4 w-screen gap-1 justify-around items-center lg:max-w-5xl text-sm font-medium sm:text-lg md:text-xl">
        <Link className="text-center underline" href="/">
          {t("home")}
        </Link>
        <Link className="text-center underline" href="/blogs">
          {t("blogs")}
        </Link>
        <Link className="text-center underline" href="/myblogs">
          {t("myBlogs")}
        </Link>
        <Link className="text-center underline" href="/about">
          {t("aboutUs")}
        </Link>
        <Link className="text-center underline" href="/contact">
          {t("contact")}
        </Link>
      </div>
      <div className="flex items-center text-xs sm:text-sm md:text-lg lg:max-w-5xl font-medium justify-around">
        <Link href="/privacy">{t("privacy")}</Link>
        {/* <p>{t("copyright")}</p> */}
      </div>
    </div>
  );
};

export default Footer;
