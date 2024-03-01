import { TableDataKeyValue } from "@/types";
import { Product } from "@dto/product.model.dto";
import { MouseEvent } from "react";

interface TableProps {
  header: Array<TableDataKeyValue>;
  body: Product[];
  onClickRow?: (e: MouseEvent<HTMLTableRowElement>, id: number) => void;
}

export const Table = ({ header, body, onClickRow }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map(({ key, label }) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(({ id, price, title, uploadedAt, viewCount }) => (
          <tr key={id} onClick={(e) => onClickRow && onClickRow(e, id)}>
            <td>{title}</td>
            <td>{new Date(uploadedAt).toLocaleString()}</td>
            <td>{price.toLocaleString()}</td>
            <td>{viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
