import { useEffect } from "react";
import { useSearchParams } from "@umijs/max";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    setSearchParams({ page: String(currentPage) });
  }, [currentPage]);

  const handlePageChanges = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  return { currentPage, handlePageChanges };
}
