"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchInput({
  initialValue,
}: {
  initialValue: string;
}) {
  const [text, setText] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (text) params.set("q", text);
    else params.delete("q");

    params.set("page", "1"); // Reset to page 1 on new search
    router.push(`/blogs?${params.toString()}`); // Adjust path as needed
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex pl-4 pr-2 py-1.5 border border-gray-300 focus-within:border-blue-500 overflow-hidden rounded-2xl transition-all"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="appearance-none border-none outline-none bg-transparent w-36 sm:w-64 xl:w-96"
        placeholder="Search here..."
      />
      <button type="submit">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
      </button>
    </form>
  );
}
