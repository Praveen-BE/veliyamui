"use client";
import "dotenv/config";

import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "@/context/UserContext"; // Adjust path as needed
import { getUserProfileByToken } from "@/lib/profile/getProfile";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
interface FormData {
  id: string;
  email: string;
  role: string;
  display_name: string;
  bio: string;
  language_code: string;
  created_at: string;
}

interface UserProfile {
  user: {
    id: string;
    email: string;
    role: string;
    display_name: string;
    bio: string;
    language_code: string;
    created_at: string;
  };
}

export default function ProfilePage() {
  const { locale } = useParams();
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = locale as string;
  const [formData, setFormData] = useState<FormData>({
    id: "",
    email: "",
    role: "",
    display_name: "",
    bio: "",
    language_code: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(false);

  const lang = `${locale}`;

  // 1. Initial Fetch/Sync Logic
  useEffect(() => {
    const initializeProfile = async () => {
      // Scenario A: User data exists in context, sync it to form
      if (user) {
        setFormData({
          id: user.id || "",
          email: user.email || "",
          role: user.role || "",
          display_name: user.display_name || "",
          bio: user.bio || "",
          language_code: user.language_code || "",
          created_at: user.created_at || "",
        });
      }
      // Scenario B: User data is null (e.g., hard refresh), fetch from API
      else {
        try {
          const res = await getUserProfileByToken({ lang }); // Your endpoint to get current user
          console.log(res);
          const data = res?.user;
          if (data) {
            setUser(data); // Update context
            setFormData({
              id: data.id || "",
              email: data.email || "",
              role: data.role || "",
              display_name: data.display_name || "",
              bio: data.bio || "",
              language_code: data.language_code || "",
              created_at: data.created_at || "",
            });
          }
          // console.log("empty data :- " + data);
        } catch (err) {
          console.error("Failed to fetch initial user data", err);
        }
      }
    };

    initializeProfile();
  }, [user, setUser]); // Runs on mount and if user context updates

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleUpdate = async (): Promise<void> => {
    setLoading(true);

    try {
      const response: Response = await fetch(`${API_URL}/profile/me`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData as FormData),
      });

      if (response.ok) {
        const userData: UserProfile = await response.json();
        // Update global context
        const data = userData?.user;
        setUser(data);
        setFormData({
          id: data.id || "",
          email: data.email || "",
          role: data.role || "",
          display_name: data.display_name || "",
          bio: data.bio || "",
          language_code: data.language_code || "",
          created_at: data.created_at || "",
        });
        setIsEditing(false);
      } else {
        console.error("Failed to update profile: ", response.statusText);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              contentEditable="false"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile for which language
            </label>
            <select
              className="text-sm text-textPrimary border border-textSecondary px-4 py-1 rounded-tl-3xl rounded-br-2xl"
              id="language"
              name="language"
              defaultValue={currentLocale}
              aria-placeholder="Your Language for Profile"
              onChange={(e) => {
                setFormData({ ...formData, language_code: e.target.value });
                switchLocale(e.target.value);
              }}
            >
              <option value="en" className="">
                English
              </option>
              <option value="ta" className="">
                தமிழ்
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.display_name}
              onChange={(e) =>
                setFormData({ ...formData, display_name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              disabled={!isEditing}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
              rows={4}
            />
          </div>

          <div className="flex gap-4 mt-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
