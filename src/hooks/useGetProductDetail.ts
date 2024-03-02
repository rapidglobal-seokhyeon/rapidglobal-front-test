import { DETAIL } from "@/constants/queryKey";
import { GetProductOutputDto } from "@/pages/api/product/[id]";
import { fetchUtils } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetail = (productId: number) => {
  return useQuery<GetProductOutputDto, Error>({
    queryKey: [DETAIL, productId],
    queryFn: async () =>
      await fetchUtils<GetProductOutputDto>({
        path: `/product/${productId.toString()}`,
      }),
    enabled: productId !== -1,
  });
};
