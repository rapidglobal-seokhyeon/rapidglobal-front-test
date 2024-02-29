import { Button } from "@/components/Button";
import { PopUp } from "@/components/PopUp";
import { Product } from "@dto/product.model.dto";

import styles from "./detail.module.css";

interface ProductListDetailPopUpProps {
  data: Product[];
}

export const ProductListDetailPopUp = ({
  data,
}: ProductListDetailPopUpProps) => {
  return (
    <PopUp>
      <PopUp.Header>상품 정보</PopUp.Header>
      <PopUp.Body>
        {data?.map(
          ({ id, price, thumbnailUrls, title, uploadedAt, viewCount }) => {
            return (
              <div key={id}>
                <div className={styles.content_box}>
                  <p>{title}</p>
                  <div className={styles.content_info}>
                    <p>{new Date(uploadedAt).toLocaleString()}</p>
                    <p>조회수: {viewCount}</p>
                  </div>
                  <div className={styles.content_info}>
                    <p>가격: {price}원</p>
                  </div>
                </div>
                {/* <div className={styles.image_box}>
                    {thumbnailUrls.map((image, idx) => (
                      <Image
                        key={idx}
                        src={image}
                        alt="image"
                        // width={48}
                        // height={48}
                        fill
                      />
                    ))}
                  </div> */}
              </div>
            );
          }
        )}
      </PopUp.Body>
      <PopUp.ButtonGroup loading={true}>
        <Button variant="success" onClick={(e) => console.log(e)}>
          확인
        </Button>
        <Button variant="danger" close>
          취소
        </Button>
      </PopUp.ButtonGroup>
    </PopUp>
  );
};
