import { usePopUpStore } from "@/stores/popup";
import styles from "./PopUp.module.css";
import { Children, MouseEvent, ReactElement, cloneElement } from "react";

interface PopUpButtonGroupProps {
  children: ReactElement | ReactElement[];
  loading?: boolean;
}

export const PopUpButtonGroup = ({
  children,
  loading,
}: PopUpButtonGroupProps) => {
  const { handleToggle } = usePopUpStore();

  const BtnEl = Children.map(children, (child: ReactElement, i) => {
    return cloneElement(child, {
      ...child.props,
      loading,
      onToggle: handleToggle,
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        if (child.props.show) {
          handleToggle();
          return;
        }

        if (child.props.onClick) {
          child.props.onClick(event);
        }
      },
    });
  });

  return <div className={styles.popup_btn_group}>{BtnEl}</div>;
};
