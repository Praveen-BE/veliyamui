"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to update only the "page" param
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/blogs?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => router.push(createPageUrl(currentPage - 1))}
          className="px-2 py-1 rounded bg-blue-500 text-sm text-white"
        >
          Previous
        </button>
      )}

      <div className="w-fit h-12 sm:h-14 flex items-center overflow-x-scroll">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => router.push(createPageUrl(page))}
            className={`px-4 mx-1 py-1 rounded text-sm sm:text-lg lg:text-xl ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {currentPage < totalPages && (
        <button
          onClick={() => router.push(createPageUrl(currentPage + 1))}
          className="px-2 py-1 rounded bg-blue-500 text-sm text-white"
        >
          Next
        </button>
      )}
    </div>
  );
}
