import { useProductStore } from "@/entities/Product/useProductStore";
import {
  Button,
  TextArea,
  TextInput,
  Text as TextWrapper,
  useToaster,
} from "@gravity-ui/uikit";
import { getChangeProductSchema } from "./lib/getScheme";
import { useForm } from "@tanstack/react-form";
import { UpdateProductDto } from "@/lib/types/openapi";
import { sleep } from "@/entities/User/utils";

import s from "./ChangeProductForm.module.scss";
import { useShallow } from "zustand/shallow";

interface IChangeProductForm {
  productId: string;
  changeState: (value: "view" | "edit") => void;
}

export const ChangeProductForm = ({
  productId,
  changeState,
}: IChangeProductForm) => {
  const { add } = useToaster();

  const [changeProduct, product] = useProductStore(
    useShallow((store) => [store.changeProduct, store.oneProduct]),
  );

  const scheme = getChangeProductSchema();
  const form = useForm({
    defaultValues: {
      fullName: product?.fullName ?? "",
      shortName: product?.shortName ?? "",
      volume: Number(product?.volume ?? 0),
      gtin: product?.gtin ?? "",
      alcoholCode: product?.alcoholCode ?? "",
      expirationInDays: Number(product?.expirationInDays ?? 0),
      pictureUrl: product?.pictureUrl ?? "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async (formProps) => {
      const { value } = formProps;
      try {
        await changeProduct(productId, value as UpdateProductDto);
        await sleep(1);
        changeState("view");
      } catch (error) {
        add({
          name: "changeProductModal",
          title: "Что-то пошло не так ...",
          content: `При изменении новой продукции произошла ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`,
          isClosable: true,
          theme: "danger",
        });
      }
    },
  });
  return (
    <div className={s.body}>
      <div className={s.title}>
        <TextWrapper variant="header-1">Изменить продукцию</TextWrapper>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().then();
        }}
      >
        <form.Field
          name="fullName"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    Полное наименование продукции:
                  </TextWrapper>
                </label>
                <TextArea
                  size={"l"}
                  minRows={1}
                  maxRows={5}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите полное наименование продукта"
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="shortName"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    Краткое наименование продукции:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите сокращенное наименование продукта"
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="volume"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    Объем продукции, л:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={String(field.state.value)}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите объем единицы продукции"
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="gtin"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    GTIN
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  placeholder="Введите GTIN продукции (0 + EAN-13 со штрих-кода)"
                  hasClear={true}
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="alcoholCode"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    Код продукции
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  placeholder="Введите код продукции (полученный в РАР)"
                  hasClear={true}
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="expirationInDays"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    Срок годности, дней:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={String(field.state.value)}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите срок годности продукции"
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Field
          name="pictureUrl"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`product.change.${field.name}.label`}
                  >
                    URL картинки:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  placeholder="Введите URL картинки продукта"
                  hasClear={true}
                  qa={`product.change.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className={s.buttons}>
              <Button
                type="reset"
                onClick={() => form.reset()}
                size="l"
                view="outlined"
                qa={`product.change.button.reset`}
              >
                Сбросить данные формы
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                view={"action"}
                loading={isSubmitting}
                size="l"
                qa={`product.change.button.submit`}
              >
                Обновить
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
