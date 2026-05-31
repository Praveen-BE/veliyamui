// app/[locale]/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/UserContext";

export default function AuthCallback() {
  const { user, setUser } = useAuth();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      googleAuthAPI();
    }
  }, [code, router]);

  const googleAuthAPI = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, lang: `${locale}` }),
      });
      const data = await res.json();
      console.log(data);
      setUser(data.user);
      router.push("/");
    } catch (err) {
      console.error("Error Auth Call Back User :", err);
      return null;
    }
  };

  return <div>Authenticating, please wait...</div>;
}
