import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterState } from "@/interfaces/filter";

interface PaginationType {
   filter: FilterState;
   totalPage: number;
   onPageChange?: (page: number) => void;
}

const Pagination = ({ filter, totalPage, onPageChange }: PaginationType) => {
   const currentPage = filter.page || 1;
   const totalPages = totalPage;

   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
   const maxVisiblePages = isMobile ? 3 : 5;
   const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

   // Calculate start and end page dynamically
   let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
   let endPage = Math.min(totalPages, currentPage + halfMaxVisiblePages);

   if (currentPage <= halfMaxVisiblePages) {
      endPage = Math.min(maxVisiblePages, totalPages);
   }
   if (currentPage > totalPages - halfMaxVisiblePages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
   }

   const pages = [];
   for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
   }

   const handlePreviousClick = () => {
      if (onPageChange && currentPage > 1) {
         onPageChange(currentPage - 1);
      }
   };

   const handleNextClick = () => {
      if (onPageChange && currentPage < totalPages) {
         onPageChange(currentPage + 1);
      }
   };

   return (
      <>
         {totalPages > 1 && (
            <nav className="mt-4 flex items-center justify-center">
               <ul className="flex space-x-2">
                  <li>
                     <button
                        className={`px-2 gap-2 text-xs flex items-center justify-center border rounded p-1 mt-0.5${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                           }`}
                        onClick={handlePreviousClick}
                        disabled={currentPage === 1}
                     >
                        <ChevronLeft size={18} className="text-gray-500" />
                        <span>Previous</span>
                     </button>
                  </li>

                  {/* First Page */}
                  {startPage > 1 && (
                     <>
                        <li>
                           <button
                              className="border border-red-500 rounded text-md py-0 px-2 text-primary hover:bg-primary hover:text-black"
                              onClick={() => onPageChange && onPageChange(1)}
                           >
                              1
                           </button>
                        </li>
                        {startPage > 2 && <li className="px-2 text-gray-500">...</li>}
                     </>
                  )}

                  {/* Page Numbers */}
                  {pages.map((page) => (
                     <li key={page}>
                        <button
                           className={`mt-0.5 rounded text-md px-3 ${currentPage === page
                              ? "bg-primary text-black"
                              : "bg-primary border text-black"
                              }`}
                           onClick={() => onPageChange && onPageChange(page)}
                        >
                           {page}
                        </button>
                     </li>
                  ))}

                  {/* Last Page */}
                  {endPage < totalPages && (
                     <>
                        {endPage < totalPages - 1 && (
                           <li className="px-2 text-gray-500">...</li>
                        )}
                        <li>
                           <button
                              className="text-md border rounded py-0 px-2 text-primary hover:bg-primary hover:text-black"
                              onClick={() => onPageChange && onPageChange(totalPages)}
                           >
                              {totalPages}
                           </button>
                        </li>
                     </>
                  )}

                  {/* Next Button */}
                  <li>
                     <button
                        className={`px-2 gap-2 flex items-center justify-center text-xs border rounded p-1 mt-0.5${currentPage === totalPages
                           ? "cursor-not-allowed opacity-50"
                           : ""
                           }`}
                        onClick={handleNextClick}
                        disabled={currentPage === totalPages}
                     >
                        <span>Next</span>
                        <ChevronRight size={18} className="text-gray-500" />
                     </button>
                  </li>
               </ul>
            </nav>
         )}
      </>
   );
};

export default Pagination;
