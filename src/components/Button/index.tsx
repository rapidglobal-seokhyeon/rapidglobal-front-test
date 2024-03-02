import { ReactNode } from "react";
import styles from "./Button.module.css";

import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  close?: boolean;
  loading?: boolean;
  onToggle?: () => void;

  variant?: "primary" | "success" | "danger" | "dark" | "light";
}

export const Button = ({
  children,
  close,
  onToggle,
  onClick,
  loading,
  disabled,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        if (close) {
          onToggle && onToggle();
        }

        onClick && onClick(e);
      }}
      disabled={disabled || loading}
      className={clsx(styles.button, styles[variant])}
    >
      {children}
    </button>
  );
};
