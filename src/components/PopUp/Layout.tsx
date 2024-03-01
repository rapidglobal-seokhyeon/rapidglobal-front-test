import { Portal } from "@/provider/Portal";
import { usePopUpStore } from "@/stores/popup";

import styles from "./PopUp.module.css";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import Image from "next/image";

import closeIcons from "@icons/x.svg";

interface PopUpLayoutProps {
  children: ReactNode;
}

export const PopUpLayout = ({ children }: PopUpLayoutProps) => {
  const { open, handleToggle } = usePopUpStore();

  const ref = useRef<HTMLDivElement>(null);

  const onClose = (e: MouseEvent<HTMLDivElement>): void => {
    if (!ref.current) return;

    // 바깥 영역 클릭시 닫힘
    if (open && ref.current === (e.target as HTMLDivElement)) {
      handleToggle();
    }
  };

  useEffect(() => {
    // 바깥 스크롤 방지
    const offsetHeight = `-${window.scrollY}px`;
    document.body.style.overflow = open ? "hidden" : "auto";
    document.body.style.position = open ? "fixed" : "unset";
    document.body.style.top = offsetHeight;
  }, [open]);

  if (!open) return null;

  return (
    <Portal selector="#popup">
      <div className={styles.overlay} ref={ref} onClick={onClose}>
        <div className={styles.body}>
          <div className={styles.popup_top}>
            <button
              className={styles.popup_top_close_btn}
              onClick={handleToggle}
            >
              <Image
                className={styles.close_btn}
                src={closeIcons}
                alt="closeIcons"
                width={24}
                height={24}
              />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
