import { Text as TextWrapper } from "@gravity-ui/uikit";

import s from "../ProductInfo.module.scss";
import { SelectProductDto } from "@/lib/types/openapi";

interface IViewProductForm {
  product: SelectProductDto | null;
}

export const ViewProductForm = ({ product }: IViewProductForm) => {
  return (
    <>
      <hr className={s.divider} />
      <div className={s.main}>
        <div className={s.title}>
          <div className={s.titleText}>
            <div className={s.titleText_main}>
              <TextWrapper variant="header-1">{product?.fullName}</TextWrapper>
            </div>
            <div className={s.titleText_caption}>
              <TextWrapper variant="subheader-2" className={s.keyText}>
                Краткое имя:
              </TextWrapper>
              <TextWrapper variant="body-2">{product?.shortName}</TextWrapper>
            </div>
            <div className={s.titleText_caption}>
              <TextWrapper variant="subheader-2" className={s.keyText}>
                Объем:
              </TextWrapper>
              <TextWrapper variant="body-2">{product?.volume} л.</TextWrapper>
            </div>
            <div className={s.titleText_caption}>
              <TextWrapper variant="subheader-2" className={s.keyText}>
                GTIN:
              </TextWrapper>
              <TextWrapper variant="body-2">{product?.gtin}</TextWrapper>
            </div>
            <div className={s.titleText_caption}>
              <TextWrapper variant="subheader-2" className={s.keyText}>
                Код ФСРАР:
              </TextWrapper>
              <TextWrapper variant="body-2">{product?.alcoholCode}</TextWrapper>
            </div>
            <div className={s.titleText_caption}>
              <TextWrapper variant="subheader-2" className={s.keyText}>
                Срок годности, д.:
              </TextWrapper>
              <TextWrapper variant="body-2">
                {product?.expirationInDays}
              </TextWrapper>
            </div>
          </div>

          {product?.pictureUrl && (
            <img
              className={s.mainPicture}
              src={product.pictureUrl}
              alt={`${product.fullName} - Изображение продукции`}
              height={250}
            />
          )}
        </div>
      </div>
      <hr className={s.divider} />
    </>
  );
};
