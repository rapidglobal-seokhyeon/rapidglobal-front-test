import { ProductOutputDto } from "@dto/product.model.dto";
import { useQuery } from "@tanstack/react-query";
import { usePageQuery } from "./usePageQuery";

import { PRODUCT } from "@/constants/queryKey";
import { useRouter } from "next/router";
import { fetchUtils } from "@/utils/fetch";

const useGetProductHooks = () => {
  const { pageQueryParams } = usePageQuery();
  const router = useRouter();

  return useQuery<ProductOutputDto>({
    queryKey: [PRODUCT, pageQueryParams],
    queryFn: async () =>
      await fetchUtils<ProductOutputDto>({
        path: router.asPath.toString(),
      }),
  });
};

export { useGetProductHooks };
