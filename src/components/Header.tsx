import CTAButton, { CTAOutlineButton } from "@/ui/CTAButton";
import Language from "@/ui/Language";
import NavButton from "@/ui/NavButton";
import Image from "next/image";
import VeliyamEnglish from "../../public/Veliyam-English-Logo.svg";
import VeliyamTamilLogo from "../../public/Veliyam-Tamil-Logo.svg";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "./ThemeToggle";

import NavProfileOrNavAuth from "@/ui/NavProfileOrNavAuth";
import { cookies } from "next/headers";
import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  display_name: string;
  bio: string;
  language_code: string;
  created_at: string;
}

async function getProfile(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  // If no cookie exists, don't even try to call the API
  if (!token) return null;

  try {
    // Call your backend API from the server
    const response = await fetch(`${API_URL}/profile/me`, {
      headers: {
        Cookie: `token=${token.value}`, // Pass the cookie manually to your backend
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

const Header = async ({ lang }: { lang: string }) => {
  const user = await getProfile();
  const t = await getTranslations("HomePage");
  return (
    <div className="w-full h-16 px-2 bg-primary flex justify-between items-center">
      {lang == "ta" ? (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamTamilLogo}
          alt="Veliyam English Logo"
        />
      ) : (
        <Image
          className="w-20 h-12 md:w-28 md:h-20"
          src={VeliyamEnglish}
          alt="Veliyam English Logo"
        />
      )}
      <div className="hidden md:flex gap-4">
        <NavButton navName="Home" navLinkName="" />
        <NavButton navName="Blogs" navLinkName="blogs" />
        <NavButton navName="My Blogs" navLinkName="myblogs" />
      </div>
      <Language />
      {/* <ThemeToggle /> */}
      <div className="flex items-center gap-3">
        <CTAButton ctaName="Create" ctaLinkName="myblogs/create" />
        <NavProfileOrNavAuth initialUser={user} />
        <Bars3Icon className="w-8 h-8 md:w-12 md:h-12" />
      </div>
    </div>
  );
};

export default Header;
