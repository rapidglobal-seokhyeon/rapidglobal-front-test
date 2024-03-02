import { DETAIL, PRODUCT } from "@/constants/queryKey";
import {
  PostProductDetailInputDto,
  PostProductDetailOutputDto,
} from "@/pages/api/product";
import { fetchUtils } from "@/utils/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostProductDetail = () => {
  const queryClient = useQueryClient();
  return useMutation<
    PostProductDetailOutputDto,
    Error,
    PostProductDetailInputDto
  >({
    mutationFn: async ({ id, title }) =>
      await fetchUtils<PostProductDetailOutputDto>({
        path: `/product`,
        option: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            id,
          }),
        },
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [DETAIL] });
      queryClient.invalidateQueries({ queryKey: [PRODUCT] });
    },
  });
};
