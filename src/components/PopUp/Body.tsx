import { ReactNode } from "react";
import styles from "./PopUp.module.css";

interface PopUpBodyProps {
  children: ReactNode;
}

export const PopUpBody = ({ children }: PopUpBodyProps) => {
  return <div className={styles.popup_body}>{children}</div>;
};
