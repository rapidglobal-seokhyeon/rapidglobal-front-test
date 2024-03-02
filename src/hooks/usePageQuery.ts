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
    try {
      if (Object.hasOwn(pageQueryParams, key)) {
        if (!value || +value === 0) {
          throw new Error("not found pageQuery");
        }

        pageQueryParams[key] = value;
      }
    } catch (error) {
      console.error("pageQuery Error");
    }
  }

  return {
    pageQueryParams,
  };
};
