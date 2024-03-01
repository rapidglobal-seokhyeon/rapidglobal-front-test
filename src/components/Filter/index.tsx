import { usePageQuery } from "@/hooks/usePageQuery";
import { FilterKeyValue, FilterListType } from "@/types";
import { encodeString, makeQueryString } from "@/utils/querystring";
import { SortType } from "@dto/product.model.dto";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface FilterProps {
  filter: FilterListType[];
  loading: boolean;
}

export const Filter = ({ filter, loading }: FilterProps) => {
  const { pageQueryParams } = usePageQuery();
  const router = useRouter();

  const searchParams = useSearchParams().get("sortList") || "";
  const parseJSON = (searchParams && JSON.parse(searchParams)) || "";

  const initFilter = (): FilterKeyValue[] => {
    // 쿼리스트링에 담긴 필터 값이 없을 때
    if (!parseJSON.length) {
      return filter.map((item) => ({ ...item, sortType: "asc" }));
    }

    // 쿼리스트링에 담긴 필터이 있다면 그 값으로 세팅
    return filter.map((item) => {
      const find: { [key in string]: SortType } = parseJSON.find(
        (parsedItem: { [key in string]: SortType }) =>
          Object.keys(parsedItem)[0] === item.key
      );

      const sortType: SortType = find ? Object.values(find)[0] : "asc";

      return {
        ...item,
        sortType,
      };
    });
  };

  const initFilterMemo = useMemo(initFilter, [filter, parseJSON]);

  const onClick = (key: string, type: SortType) => () => {
    const updatedFilter: FilterKeyValue[] = initFilterMemo.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          sortType: type === "desc" ? "asc" : "desc",
        };
      }
      return item;
    });

    const formatFilters = updatedFilter
      .filter((item) => item.sortType === "desc")
      .map((item) => ({
        [encodeString(item.key)]: encodeString(item.sortType),
      }));

    router.push(
      makeQueryString({ ...pageQueryParams, sortList: formatFilters }),
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      {initFilterMemo.map(({ key, label, sortType }) => {
        return (
          <div key={key}>
            <p>{label}</p>
            <button disabled={loading} onClick={onClick(key, sortType)}>
              {sortType === "asc" && <span id={sortType}>오름차순</span>}
              {sortType === "desc" && <span id={sortType}>내림차순</span>}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => {
          const payload = {
            ...pageQueryParams,
            sortList: "[]",
          };
          router.push(makeQueryString(payload), undefined, { shallow: true });
        }}
      >
        초기화
      </button>
    </div>
  );
};
