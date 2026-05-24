import SideBarNavButton from "@/ui/SideBarNavButton";
import { getTranslations } from "next-intl/server";

export default async function CategoryPage() {
  const t = await getTranslations("Footer");

  return (
    <div className="flex justify-center items-center flex-1 p-8">
      <SideBarNavButton navName={t("blogs")} navLinkName="blogs" />
    </div>
  );
}
