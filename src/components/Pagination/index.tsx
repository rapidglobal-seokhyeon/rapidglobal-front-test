import { usePageQuery } from "@/hooks/usePageQuery";
import { PaginationType } from "@/types";

import { makeQueryString } from "@/utils/querystring";

import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent } from "react";

type PaginationChangeType = (
  type: "next" | "prev" | "pageSize" | "page"
) => (
  e: ChangeEvent<HTMLSelectElement> & MouseEvent<HTMLButtonElement>
) => void;

interface PaginationProps {
  customSelectOptions?: number[];

  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 *
 * @param customSelectOptions default selectOptions = [10, 20, 50, 100]
 * @returns
 */

export const Pagination = ({
  customSelectOptions,
  hasNext,
  hasPrev,
  total,
}: PaginationProps) => {
  const router = useRouter();
  const { pageQueryParams } = usePageQuery();

  const selectOptions = customSelectOptions || [10, 20, 50, 100];
  const makePageList = Array.from(
    { length: Math.ceil(total / pageQueryParams.take) || 0 },
    (v, i) => i + 1
  );

  const handlePaginationChange: PaginationChangeType = (type) => (e) => {
    let payload: PaginationType = { ...pageQueryParams };

    if (type === "next") {
      payload = { ...payload, skip: +pageQueryParams.skip + 1 };
    } else if (type === "prev") {
      payload = { ...payload, skip: +pageQueryParams.skip - 1 };
    } else if (type === "pageSize") {
      payload = { ...payload, take: +e.target.value };
    } else if (type === "page") {
      payload = { ...payload, skip: +e.target.id };
    }

    router.push(makeQueryString(payload, true), undefined, { shallow: true });
  };

  return (
    <div>
      <span>총: {total}</span>
      <span>page:{pageQueryParams.skip}</span>

      <select
        defaultValue={pageQueryParams.take}
        onChange={handlePaginationChange("pageSize")}
      >
        {selectOptions.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>

      <div>
        {makePageList.map((page) => (
          <span
            key={page}
            id={page.toString()}
            onClick={handlePaginationChange("page")}
          >
            {page}
          </span>
        ))}
      </div>

      <button disabled={!hasPrev} onClick={handlePaginationChange("prev")}>
        이전
      </button>
      <button disabled={!hasNext} onClick={handlePaginationChange("next")}>
        다음
      </button>
    </div>
  );
};
