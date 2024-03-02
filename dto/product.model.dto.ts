export type ProductOmitType<T extends keyof Product> = Omit<Product, T>;

export type SortType = "asc" | "desc";

export type SortListType = Record<
  keyof ProductOmitType<"id" | "thumbnailUrls">,
  SortType
>;

export interface Product {
  id: number;
  title: string;
  uploadedAt: Date;
  price: number;
  viewCount: number;
  thumbnailUrls: string[];
}

export interface GetProductOutputDto {
  product: Product[];
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}
