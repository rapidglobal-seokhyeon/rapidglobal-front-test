import { ProductOutputDto } from "@dto/product.model.dto";
import { useQuery } from "@tanstack/react-query";
import { usePageQuery } from "./usePageQuery";

import { PRODUCT } from "@/constants/queryKey";
import { useRouter } from "next/router";

const fetchGetProduct = async (
  queryParams: string
): Promise<ProductOutputDto> => {
  try {
    const url = "http://localhost:3000/api" + queryParams;

    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw Error("api error");
  }
};

const useProductFetcher = () => {
  const { pageQueryParams } = usePageQuery();
  const router = useRouter();

  return {
    queryKey: [PRODUCT, pageQueryParams],
    queryFn: () => fetchGetProduct(router.asPath.toString()),
  };
};

const useGetProductHooks = () => {
  return useQuery<ProductOutputDto>(useProductFetcher());
};

export { fetchGetProduct, useGetProductHooks };
