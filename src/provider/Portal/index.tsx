import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

export const Portal = ({ children, selector }: PortalProps) => {
  const el = typeof window !== "undefined" && document.querySelector(selector);

  return el && children ? createPortal(children, el) : null;
};
