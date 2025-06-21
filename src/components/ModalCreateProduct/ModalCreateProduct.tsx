import { getCreateProductSchema } from "@/components/ModalCreateProduct/lib/getScheme";
import { useForm } from "@tanstack/react-form";
import {
  Button,
  Icon,
  Modal,
  Select,
  TextArea,
  TextInput,
  Text as TextWrapper,
  useToaster,
} from "@gravity-ui/uikit";

import s from "./ModalCreateProduct.module.scss";
import { PRODUCT_STATUS_SELECT_OPTIONS } from "@/lib/types";
import { CircleXmark } from "@gravity-ui/icons";
import { sleep } from "@/entities/User/utils";
import { useProductStore } from "@/entities/Product/useProductStore";
import { CreateProductDto } from "@/lib/types/openapi";

export interface IModalCreateProductProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalCreateProduct = (props: IModalCreateProductProps) => {
  const { visible, onClose } = props;

  const { add } = useToaster();

  const createProduct = useProductStore((store) => store.createProduct);

  const scheme = getCreateProductSchema();
  const form = useForm({
    defaultValues: {
      fullName: "",
      shortName: "",
      volume: 0,
      gtin: "",
      alcoholCode: "",
      expirationInDays: 0,
      pictureUrl: "",
      status: "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async (formProps) => {
      const { value } = formProps;
      try {
        await createProduct(value as CreateProductDto);
        await sleep(1);

        formProps.formApi.reset();
        onClose();
      } catch (error) {
        add({
          name: "createProductModal",
          title: "Что-то пошло не так ...",
          content: `При создании новой продукции произошла ошибка: ${JSON.stringify(error)}`,
          isClosable: true,
          theme: "danger",
        });
      }
    },
  });

  return (
    <Modal open={visible} onOpenChange={onClose} qa="product.modal">
      <div className={s.root}>
        <div className={s.header}>
          <TextWrapper variant="header-2">Создание нового продукта</TextWrapper>
          <Button onClick={onClose} view="flat" size="l">
            <Icon data={CircleXmark} size={20} className={s.closeButton} />
          </Button>
        </div>
        <hr className={s.hr} />
        <div className={s.body}>
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
                        qa={`product.modal.${field.name}.label`}
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
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      className={s.field}
                      hasClear={true}
                      placeholder="Введите объем единицы продукции"
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      className={s.field}
                      hasClear={true}
                      placeholder="Введите срок годности продукции"
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
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
                        qa={`product.modal.${field.name}.label`}
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
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
                          ? "invalid"
                          : undefined
                      }
                    />
                  </div>
                );
              }}
            />

            <form.Field
              name="status"
              children={(field) => {
                return (
                  <div className={s.fieldWrapper}>
                    <div>
                      <label htmlFor={field.name}>
                        <TextWrapper
                          variant="body-1"
                          qa={`product.modal.${field.name}.label`}
                        >
                          Статус продукта:
                        </TextWrapper>
                      </label>
                    </div>
                    <Select
                      size={"l"}
                      id={field.name}
                      name={field.name}
                      options={PRODUCT_STATUS_SELECT_OPTIONS}
                      multiple={false}
                      onUpdate={(e) => field.handleChange(e[0] ?? "")}
                      onBlur={field.handleBlur}
                      className={s.field}
                      placeholder="Выберите статус продукта"
                      hasClear={true}
                      width={"max"}
                      qa={`product.modal.${field.name}.field`}
                      errorMessage={field.state.meta.errors
                        .map((err) => err?.message)
                        .join(", ")}
                      validationState={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length
                          ? "invalid"
                          : undefined
                      }
                    />
                  </div>
                );
              }}
            />
            <hr className={s.hrBottom} />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className={s.buttons}>
                  <Button
                    type="reset"
                    onClick={() => form.reset()}
                    size="l"
                    view="outlined"
                    qa={`product.modal.button.reset`}
                  >
                    Сбросить данные формы
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    view={"action"}
                    loading={isSubmitting}
                    size="l"
                    qa={`product.modal.button.submit`}
                  >
                    Создать
                  </Button>
                </div>
              )}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};
