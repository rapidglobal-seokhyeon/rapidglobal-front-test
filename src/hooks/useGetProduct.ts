import { GetProductOutputDto } from "@dto/product.model.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePageQuery } from "./usePageQuery";

import { PRODUCT } from "@/constants/queryKey";
import { useRouter } from "next/router";
import { fetchUtils } from "@/utils/fetch";
import { useEffect } from "react";
import { makeQueryString } from "@/utils/querystring";

const useGetProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { pageQueryParams } = usePageQuery();

  const query = useQuery<GetProductOutputDto, Error>({
    queryKey: [PRODUCT, pageQueryParams],
    queryFn: async () =>
      await fetchUtils<GetProductOutputDto>({
        path: router.asPath.toString(),
      }),
  });

  useEffect(() => {
    // 다음 페이지 프리패칭
    if (!query.isPlaceholderData && query.data && query.data.hasNext) {
      const nextPageQuery = {
        ...pageQueryParams,
        skip: (+pageQueryParams.skip + 1).toString(),
      };

      const url = makeQueryString(nextPageQuery);

      queryClient.prefetchQuery({
        queryKey: [PRODUCT, nextPageQuery],
        queryFn: async () => {
          return await fetchUtils({
            path: `/product/list${url}`,
          });
        },
      });
    }
  }, [pageQueryParams]);

  return query;
};

export { useGetProduct };
