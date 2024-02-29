import { Portal } from "@/provider/Portal";
import { usePopUpStore } from "@/stores/popup";

import styles from "./PopUp.module.css";
import { ReactNode } from "react";

interface PopUpLayoutProps {
  children: ReactNode;
}

export const PopUpLayout = ({ children }: PopUpLayoutProps) => {
  const { open, handleToggle } = usePopUpStore();

  if (!open) return null;

  return (
    <Portal selector="#popup">
      <div className={styles.overlay}>
        <div className={styles.body}>
          <div className={styles.popup_top}>
            <button
              className={styles.popup_top_close_btn}
              onClick={handleToggle}
            >
              x
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
