import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ta"],
  defaultLocale: "en",
  // 'always'  → /en/page  /ta/page (even for default locale)
  // 'as-needed' → /page (default), /ta/page (others)
  localePrefix: "always",
});
