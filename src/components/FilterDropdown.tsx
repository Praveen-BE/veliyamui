"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CatagoriesListData } from "@/utils/constant";

export default function FilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // --- 1. Local State to hold changes before applying ---
  const [tempFilters, setTempFilters] = useState({
    sortOrder: searchParams.get("sortOrder") || "DESC",
    topic: searchParams.get("topic")?.split(",") || [],
    category: searchParams.get("category")?.split(",") || [],
    sortBy: searchParams.get("sortBy")?.split(",") || [],
  });

  // Sync local state ONLY if the URL actually differs from our local state
  useEffect(() => {
    const urlTopic = searchParams.get("topic")?.split(",") || [];
    const urlCategory = searchParams.get("category")?.split(",") || [];
    const urlSort = searchParams.get("sortOrder") || "DESC";
    const urlRating = searchParams.get("sortBy")?.split(",") || [];

    // Simple equality check to prevent redundant re-renders
    if (
      JSON.stringify(urlTopic) !== JSON.stringify(tempFilters.topic) ||
      JSON.stringify(urlCategory) !== JSON.stringify(tempFilters.category) ||
      urlSort !== tempFilters.sortOrder
    ) {
      setTempFilters({
        sortOrder: urlSort,
        topic: urlTopic,
        category: urlCategory,
        sortBy: urlRating,
      });
    }
  }, [searchParams]); // Keep this dependency

  // --- 2. Update local state only ---
  const handleLocalChange = (key: string, value: string) => {
    setTempFilters((prev) => {
      if (key === "sortOrder") {
        return { ...prev, sortOrder: value };
      } else {
        const currentList = prev[key as "topic" | "category"];
        const newList = currentList.includes(value)
          ? currentList.filter((v) => v !== value)
          : [...currentList, value];
        return { ...prev, [key]: newList };
      }
    });
  };

  // --- 3. The Apply Function ---
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (tempFilters.sortOrder) params.set("sortOrder", tempFilters.sortOrder);
    if (tempFilters.topic.length > 0)
      params.set("topic", tempFilters.topic.join(","));
    if (tempFilters.category.length > 0)
      params.set("category", tempFilters.category.join(","));
    if (tempFilters.sortBy.length > 0)
      params.set("sortBy", tempFilters.sortBy.join(","));

    params.set("page", "1");

    router.push(`/blogs?${params.toString()}`);
    setIsOpen(false); // Close dropdown after applying
  };
  const resetFilters = () => {
    setTempFilters({
      sortOrder: "",
      topic: [],
      category: [],
      sortBy: [],
    });
    router.push(`/blogs`);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex ml-4 items-center cursor-pointer hover:text-blue-600 transition"
      >
        <p className="mr-1">Filter</p>
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <FunnelIcon className="w-6 h-6" />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-50 p-4">
          {/* Top Rated Section */}
          <div className="mb-6">
            <p className="font-bold mb-2"> Top Rated</p>
            {["toprated"].map((slug) => (
              <label
                key={slug}
                className="flex items-center space-x-2 mb-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempFilters.sortBy.includes(slug)}
                  onChange={() => handleLocalChange("sortBy", slug)}
                />
                <span className="capitalize">{slug}</span>
              </label>
            ))}
          </div>
          {/* Sorting Section */}
          <div className="mb-4">
            <p className="font-bold mb-2">Sort Order</p>
            <select
              className="w-full border rounded p-1"
              onChange={(e) => handleLocalChange("sortOrder", e.target.value)}
              value={tempFilters.sortOrder}
            >
              <option value="DESC">Newest First</option>
              <option value="ASC">Oldest First</option>
            </select>
          </div>

          {/* Topics Section */}
          <div className="mb-4">
            <p className="font-bold mb-2">Topics</p>
            {["inspiration", "technology"].map((slug) => (
              <label
                key={slug}
                className="flex items-center space-x-2 mb-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempFilters.topic.includes(slug)}
                  onChange={() => handleLocalChange("topic", slug)}
                />
                <span className="capitalize">{slug}</span>
              </label>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <p className="font-bold mb-2">Categories</p>
            {CatagoriesListData.map((cata) => (
              <label
                key={cata.id}
                className="flex items-center space-x-2 mb-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempFilters.category.includes(cata.slug)}
                  onChange={() => handleLocalChange("category", cata.slug)}
                />
                <span className="capitalize">{cata.name}</span>
              </label>
            ))}
          </div>

          {/* --- 4. The Action Button --- */}
          <button
            onClick={applyFilters}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
