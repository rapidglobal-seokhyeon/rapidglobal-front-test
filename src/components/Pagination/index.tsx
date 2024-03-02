import { usePageQuery } from "@/hooks/usePageQuery";
import { PaginationType } from "@/types";

import { makeQueryString } from "@/utils/querystring";

import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent } from "react";

import { clsx } from "clsx";

import styles from "./Pagination.module.css";

type PaginationChangeType = (
  type: "next" | "prev" | "pageSize" | "page"
) => (
  e: ChangeEvent<HTMLSelectElement> &
    MouseEvent<HTMLLIElement & HTMLButtonElement>
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

  const pageListFilter = makePageList.filter((value) => {
    const currentPage = +pageQueryParams.skip;
    const distance = Math.abs(currentPage - value);
    return distance <= 5;
  });

  return (
    <div className={styles.container}>
      <p>총: {total}개</p>

      <div className={styles.pageInfo}>
        <p>
          {makePageList.length} 중 {pageQueryParams.skip}페이지
        </p>

        <select
          defaultValue={pageQueryParams.take}
          onChange={handlePaginationChange("pageSize")}
        >
          {selectOptions.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>

        <nav className={styles.page_box}>
          <button
            className={styles.page}
            disabled={!hasPrev}
            onClick={handlePaginationChange("prev")}
          >
            이전
          </button>
          <ul className={styles.page_box}>
            {pageListFilter.map((page) => (
              <li
                key={page}
                className={clsx(styles.page, {
                  [styles.select]: page === +pageQueryParams.skip,
                })}
                id={page.toString()}
                onClick={handlePaginationChange("page")}
              >
                {page}
              </li>
            ))}
          </ul>
          <button
            className={styles.page}
            disabled={!hasNext}
            onClick={handlePaginationChange("next")}
          >
            다음
          </button>
        </nav>
      </div>
    </div>
  );
};
