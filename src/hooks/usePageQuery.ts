import { PaginationType } from "@/types";
import { useSearchParams } from "next/navigation";

export const usePageQuery = () => {
  const searchParams = useSearchParams();

  const pageQueryParams: PaginationType = {
    skip: 0,
    take: 0,
    sortList: "[]",
  };

  for (const [key, value] of Array.from(searchParams.entries())) {
    if (Object.hasOwn(pageQueryParams, key)) {
      pageQueryParams[key] = value;
    }
  }

  return {
    pageQueryParams,
  };
};
