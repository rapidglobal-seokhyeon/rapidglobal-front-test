import { Button } from "@/components/Button";
import { PopUp } from "@/components/PopUp";

import styles from "./Detail.module.css";

import { clsx } from "clsx";
import { useGetProductDetail } from "@/hooks/useGetProductDetail";
import { Img } from "@/components/Image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { usePostProductDetail } from "@/hooks/usePostProductDetail";
import { usePopUpStore } from "@/stores/popup";

interface ProductListDetailPopUpProps {
  productId: number;
}

export const ProductListDetailPopUp = ({
  productId,
}: ProductListDetailPopUpProps) => {
  const { open } = usePopUpStore();
  const { data, isLoading } = useGetProductDetail(productId);
  const { mutate, isSuccess } = usePostProductDetail();

  const [editTitle, setEditTitle] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 수정 성공시 or 모달이 닫혔다면 상태 초기화
    if (isSuccess || !open) {
      setEditTitle(false);
    }
  }, [isSuccess, open]);

  if (!data || !data.product) return <div>loading...</div>;

  const { price, thumbnailUrls, title, uploadedAt, viewCount } = data.product;

  const renderEditTitle = (): JSX.Element => {
    const handleEditTitleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (titleRef.current) {
        mutate({
          id: productId,
          title: titleRef.current.value,
        });
      }
    };

    const handleEditTitleToggle = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setEditTitle(!editTitle);
    };

    if (editTitle) {
      return (
        <form onSubmit={handleEditTitleSubmit}>
          <input ref={titleRef} type="text" defaultValue={title} />
          <Button type="submit">수정하기</Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleEditTitleToggle}
          >
            취소하기
          </Button>
        </form>
      );
    }

    return (
      <div>
        <p>{title}</p>
        <Button onClick={handleEditTitleToggle}>수정하기</Button>
      </div>
    );
  };

  return (
    <PopUp>
      <PopUp.Header>상품 정보</PopUp.Header>
      <PopUp.Body>
        {renderEditTitle()}
        <div className={styles.content_info}>
          <p>{new Date(uploadedAt).toLocaleString()}</p>
          <p>조회수: {viewCount}</p>
        </div>
        <div className={styles.content_info}>
          <p>가격: {price.toLocaleString()}원</p>
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
