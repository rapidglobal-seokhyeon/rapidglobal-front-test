import { Product } from "@dto/product.model.dto";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export type ResponseData = {
  product: Product | null;
  success: boolean;
};

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query as { id: string };

  const dataStr = readFileSync("data.json", "utf-8");
  const dataList: Product[] = JSON.parse(dataStr);

  const product = dataList.find((product) => product.id === +id);

  if (!product) {
    res.status(404).json({
      success: false,
      product: null,
    });
    return;
  }

  res.status(200).json({
    success: true,
    product,
  });
}
