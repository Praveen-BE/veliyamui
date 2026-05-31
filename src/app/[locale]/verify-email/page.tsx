// app/verify-email/page.tsx  ← no [locale] so the email link works without locale
"use client";

import { authVerifyEmailAPI } from "@/lib/auth/authVerifyEmailAPI";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

const errorMessages: Record<string, string> = {
  invalid_token: "This link is invalid.",
  token_used: "This link has already been used.",
  token_expired: "This link has expired. Please sign up again.",
  verification_failed: "Something went wrong. Please try again.",
};

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [errorKey, setErrorKey] = useState<string>("");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setErrorKey("invalid_token");
      setStatus("error");
      return;
    }

    authVerifyEmailAPI(token).then((res) => {
      if (res.success) {
        setStatus("success");
      } else {
        setErrorKey(res.error ?? "verification_failed");
        setStatus("error");
      }
    });
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">Verifying your email...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <p className="text-green-600 text-lg font-bold">Email verified!</p>
        <button
          onClick={() => router.push("/auth")}
          className="text-blue-600 underline"
        >
          Sign in now
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <p className="text-red-600">
        {errorMessages[errorKey] ?? "Something went wrong."}
      </p>
      <button
        onClick={() => router.push("/auth")}
        className="text-blue-600 underline"
      >
        Back to sign up
      </button>
    </div>
  );
}
