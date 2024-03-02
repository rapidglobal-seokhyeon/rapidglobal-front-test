import Image from "next/image";
import { useState } from "react";

import styles from "./Image.module.css";

import { clsx } from "clsx";

interface ImgProps {
  src: string;
  className?: string;
  sizes: string;
}

export const Img = ({ src, sizes, className }: ImgProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      {isLoading && <div className={clsx(styles.skeleton, className)} />}
      <Image
        className={className}
        src={src}
        alt="image"
        fill
        loading={"lazy"}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};
