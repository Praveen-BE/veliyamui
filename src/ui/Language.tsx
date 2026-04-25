"use client";

import { usePathname, useRouter } from "@/navigation"; // ← your navigation.ts, NOT next/navigation
import { useParams } from "next/navigation";

export default function Language() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* <label className="text-sm" htmlFor="language">
        Lang:
      </label> */}

      <select
        className="text-sm text-textPrimary border border-textSecondary px-4 py-1 rounded-tl-3xl rounded-br-2xl"
        id="language"
        name="language"
        defaultValue={currentLocale}
        aria-placeholder="Language"
        onChange={(e) => switchLocale(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
      </select>
    </>
  );
}
