// components/Pagination.tsx
import Link from "next/link";

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

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {currentPage > 1 && (
        <Link
          href={`/blogs/?page=${currentPage - 1}`}
          className="px-2 py-1 rounded bg-blue-500 text-sm text-white"
        >
          Previous
        </Link>
      )}
      <div className="w-fit h-12 sm:h-14 flex items-center overflow-x-scroll">
        {" "}
        {pages.map((page) => (
          <Link
            key={page}
            href={`/blogs/?page=${page}`}
            className={`px-4 mx-1 py-1 rounded text-sm sm:text-lg lg:text-xl  ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`/blogs/?page=${currentPage + 1}`}
          className="px-2 py-1 rounded bg-blue-500 text-sm text-white"
        >
          Next
        </Link>
      )}
    </div>
  );
}
