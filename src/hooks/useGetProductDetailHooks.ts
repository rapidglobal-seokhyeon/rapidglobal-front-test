import { ResponseData } from "@/pages/api/product/[id]";
import { fetchUtils } from "@/utils/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetail = (productId: number) => {
  return useQuery<ResponseData>({
    queryKey: ["detail", productId],
    queryFn: async () =>
      await fetchUtils<ResponseData>({
        path: `/product/${productId.toString()}`,
      }),
    enabled: productId !== -1,
  });
};
