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
      <label htmlFor="language">Choose Language:</label>
      <select
        id="language"
        name="language"
        defaultValue={currentLocale}
        onChange={(e) => switchLocale(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
        <option value="fr">Français</option>
      </select>
    </>
  );
}
