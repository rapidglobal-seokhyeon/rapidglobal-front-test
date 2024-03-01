import { Button } from "@/components/Button";
import { PopUp } from "@/components/PopUp";

import styles from "./Detail.module.css";

import { clsx } from "clsx";
import { useGetProductDetail } from "@/hooks/useGetProductDetailHooks";
import { Img } from "@/components/Image";

interface ProductListDetailPopUpProps {
  productId: number;
}

export const ProductListDetailPopUp = ({
  productId,
}: ProductListDetailPopUpProps) => {
  const { data, isLoading } = useGetProductDetail(productId);

  if (!data || !data.product) return <div>loading...</div>;

  const { price, thumbnailUrls, title, uploadedAt, viewCount } = data.product;

  return (
    <PopUp>
      <PopUp.Header>상품 정보</PopUp.Header>
      <PopUp.Body>
        <div className={styles.content_box}>
          <p>{title}</p>
          <div className={styles.content_info}>
            <p>{new Date(uploadedAt).toLocaleString()}</p>
            <p>조회수: {viewCount}</p>
          </div>
          <div className={styles.content_info}>
            <p>가격: {price.toLocaleString()}원</p>
          </div>
        </div>
        <div className={styles.image_box}>
          {thumbnailUrls.map((image, idx) => {
            // 확대 이미지 위치 계산
            const left = idx <= Math.floor(thumbnailUrls.length / 2);
            const right = idx > Math.floor(thumbnailUrls.length / 2);

            return (
              <div className={styles.image_layout} key={idx}>
                <Img
                  src={image}
                  className={styles.thumbnail}
                  sizes="(min-width: 380px) 100vw"
                />

                <div
                  className={clsx(styles.thumbnail_overlay, {
                    [styles.left]: left,
                    [styles.right]: right,
                  })}
                >
                  <div className={styles.image_layout}>
                    <Img
                      src={image}
                      className={styles.thumbnail}
                      sizes="(min-width: 380px) 100vw"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PopUp.Body>
      <PopUp.ButtonGroup loading={isLoading}>
        <Button variant="success" close>
          확인
        </Button>
        <Button variant="danger" close>
          취소
        </Button>
      </PopUp.ButtonGroup>
    </PopUp>
  );
};
