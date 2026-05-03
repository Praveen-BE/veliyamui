import "dotenv/config";

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Logs the user out and clears local storage
 */
export async function authLogoutAPI(): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to logout");

    // Remove token from browser storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
