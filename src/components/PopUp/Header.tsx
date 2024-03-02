import { ReactNode } from "react";

import styles from "./PopUp.module.css";

interface PopUpHeaderProps {
  children: ReactNode;
}

export const PopUpHeader = ({ children }: PopUpHeaderProps) => {
  return (
    <div className={styles.popup_header}>
      <p>{children}</p>
    </div>
  );
};
