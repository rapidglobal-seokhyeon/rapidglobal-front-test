import { TableDataKeyValue } from "@/types";
import { Product } from "@dto/product.model.dto";
import { MouseEvent } from "react";

import styles from "./Table.module.css";

interface TableProps {
  header: Array<TableDataKeyValue>;
  body: Product[];
  onClickRow?: (e: MouseEvent<HTMLTableRowElement>, id: number) => void;
}

export const Table = ({ header, body, onClickRow }: TableProps) => {
  return (
    <table className={styles.container}>
      <thead className={styles.thead}>
        <tr>
          {header.map(({ key, label, width }) => (
            <th key={key} style={{ width }}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
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
