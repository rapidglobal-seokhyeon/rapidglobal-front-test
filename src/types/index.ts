import { Product, ProductOmitType, SortType } from "@dto/product.model.dto";

export const productTableHeader = [
  "순서",
  "상품 이름",
  "업로드일자",
  "상품 가격",
  "조회수",
] as const;

export type TableDataKeyValue = {
  key: keyof ProductOmitType<"thumbnailUrls">;
  label: (typeof productTableHeader)[number];
  width: string;
};

export type TableSortTypeKeyValue = {
  key: keyof ProductOmitType<"thumbnailUrls">;
  sortType: SortType;
};

export interface ProductTableDataType extends TableDataKeyValue {
  id: Product["id"];
  data: ProductOmitType<"thumbnailUrls">[keyof ProductOmitType<"thumbnailUrls">][];
}

export interface TableSortKeyValue {
  key: keyof ProductOmitType<"id" | "thumbnailUrls">;
  label: (typeof productTableHeader)[number];
}

export interface PaginationType {
  skip: number;
  take: number;
  sortList: string;

  [key: string]: string | number;
}

export type FilterListType = {
  key: string;
  label: string;
};

export type FilterKeyValue = {
  sortType: SortType;
} & FilterListType;
